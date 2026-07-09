#include <pebble.h>

#ifdef PBL_PLATFORM_EMERY
#define IF_EMERY_ELSE(emery_value, other_value) (emery_value)
#else
#define IF_EMERY_ELSE(emery_value, other_value) (other_value)
#endif

enum {
  KEY_SECOND_ZONE_OFFSET = 0,
  KEY_SECOND_ZONE_LABEL = 1,
  KEY_WEATHER_REQUEST = 2,
  KEY_WEATHER_TEMP = 3,
  KEY_WEATHER_COND = 4,
  KEY_WEATHER_CITY = 5,
  KEY_WEATHER_ERROR = 6,
  KEY_LOCAL_ZONE_OFFSET = 7,
  KEY_LOCAL_ZONE_LABEL = 8
};

enum {
  PERSIST_KEY_SECOND_ZONE_OFFSET = 100,
  PERSIST_KEY_SECOND_ZONE_LABEL = 101,
  PERSIST_KEY_LOCAL_ZONE_OFFSET = 102,
  PERSIST_KEY_LOCAL_ZONE_LABEL = 103
};

static Window *s_main_window;
static Layer *s_canvas_layer;

static char s_date_buffer[32];
static char s_local_time_12h_buffer[16];
static char s_local_time_24h_buffer[16];
static char s_local_period_buffer[4];
static char s_local_zone_label_buffer[24] = "LOCAL";
static char s_second_time_12h_buffer[16];
static char s_second_time_24h_buffer[16];
static char s_second_period_buffer[4];
static char s_second_zone_label_buffer[24] = "UTC";
static char s_second_zone_meta_buffer[16] = "UTC+00";
static char s_weather_temp_buffer[16] = "--";
static char s_weather_cond_buffer[24] = "Loading";
static char s_weather_city_buffer[24] = "Phone";
static char s_steps_buffer[16] = "--";
static char s_hr_buffer[16] = "--";
static int s_local_zone_offset_minutes = 0;
static int s_second_zone_offset_minutes = 0;

static bool s_health_available;
static bool s_hr_available;
static bool s_health_events_subscribed;
static bool s_hr_sample_requested;

static void update_second_zone_meta(void) {
  const int total_minutes = s_second_zone_offset_minutes;
  const char sign = total_minutes >= 0 ? '+' : '-';
  const int abs_minutes = total_minutes >= 0 ? total_minutes : -total_minutes;
  const int hours = abs_minutes / 60;
  const int minutes = abs_minutes % 60;

  if (minutes == 0) {
    snprintf(s_second_zone_meta_buffer, sizeof(s_second_zone_meta_buffer), "UTC%c%02d", sign, hours);
  } else {
    snprintf(s_second_zone_meta_buffer, sizeof(s_second_zone_meta_buffer), "UTC%c%02d:%02d", sign, hours, minutes);
  }
}

static void load_settings(void) {
  if (persist_exists(PERSIST_KEY_LOCAL_ZONE_OFFSET)) {
    s_local_zone_offset_minutes = persist_read_int(PERSIST_KEY_LOCAL_ZONE_OFFSET);
  }

  if (persist_exists(PERSIST_KEY_LOCAL_ZONE_LABEL)) {
    persist_read_string(PERSIST_KEY_LOCAL_ZONE_LABEL, s_local_zone_label_buffer, sizeof(s_local_zone_label_buffer));
  }

  if (persist_exists(PERSIST_KEY_SECOND_ZONE_OFFSET)) {
    s_second_zone_offset_minutes = persist_read_int(PERSIST_KEY_SECOND_ZONE_OFFSET);
  }

  if (persist_exists(PERSIST_KEY_SECOND_ZONE_LABEL)) {
    persist_read_string(PERSIST_KEY_SECOND_ZONE_LABEL, s_second_zone_label_buffer, sizeof(s_second_zone_label_buffer));
  }

  update_second_zone_meta();
}

static void save_settings(void) {
  persist_write_int(PERSIST_KEY_LOCAL_ZONE_OFFSET, s_local_zone_offset_minutes);
  persist_write_string(PERSIST_KEY_LOCAL_ZONE_LABEL, s_local_zone_label_buffer);
  persist_write_int(PERSIST_KEY_SECOND_ZONE_OFFSET, s_second_zone_offset_minutes);
  persist_write_string(PERSIST_KEY_SECOND_ZONE_LABEL, s_second_zone_label_buffer);
}

static void request_weather(void) {
  DictionaryIterator *out_iter;
  if (app_message_outbox_begin(&out_iter) != APP_MSG_OK) {
    return;
  }

  dict_write_uint8(out_iter, KEY_WEATHER_REQUEST, 1);
  dict_write_end(out_iter);
  app_message_outbox_send();
}

static void update_health(void) {
  s_health_available = health_service_metric_accessible(HealthMetricStepCount, time_start_of_today(), time(NULL)) &
                       HealthServiceAccessibilityMaskAvailable;

  if (s_health_available) {
    const HealthValue steps = health_service_sum_today(HealthMetricStepCount);
    snprintf(s_steps_buffer, sizeof(s_steps_buffer), "%ld", (long)steps);
  } else {
    snprintf(s_steps_buffer, sizeof(s_steps_buffer), "--");
  }

  s_hr_available = health_service_metric_accessible(HealthMetricHeartRateBPM, time(NULL), time(NULL)) &
                   HealthServiceAccessibilityMaskAvailable;

  if (s_hr_available) {
    HealthValue bpm = health_service_peek_current_value(HealthMetricHeartRateBPM);
    if (bpm <= 0) {
      bpm = health_service_peek_current_value(HealthMetricHeartRateRawBPM);
    }
    if (bpm > 0) {
      snprintf(s_hr_buffer, sizeof(s_hr_buffer), "%ld", (long)bpm);
    } else {
      snprintf(s_hr_buffer, sizeof(s_hr_buffer), "wait");
    }
  } else {
    snprintf(s_hr_buffer, sizeof(s_hr_buffer), "%s", s_hr_sample_requested ? "wait" : "n/a");
  }
}

static void configure_heart_rate_sensor(void) {
  s_hr_sample_requested = health_service_set_heart_rate_sample_period(60);
}

static void update_time(void) {
  time_t now = time(NULL);
  time_t local_zone_now = now + (s_local_zone_offset_minutes * 60);
  time_t second_zone_now = now + (s_second_zone_offset_minutes * 60);
  struct tm *local_time = gmtime(&local_zone_now);
  struct tm *second_zone_time = gmtime(&second_zone_now);

  strftime(s_date_buffer, sizeof(s_date_buffer), "%a  %d %b", local_time);

  strftime(s_local_time_12h_buffer, sizeof(s_local_time_12h_buffer), "%I:%M", local_time);
  if (s_local_time_12h_buffer[0] == '0') {
    memmove(s_local_time_12h_buffer, s_local_time_12h_buffer + 1, strlen(s_local_time_12h_buffer));
  }
  strftime(s_local_period_buffer, sizeof(s_local_period_buffer), "%p", local_time);
  strftime(s_local_time_24h_buffer, sizeof(s_local_time_24h_buffer), "%H:%M", local_time);

  strftime(s_second_time_12h_buffer, sizeof(s_second_time_12h_buffer), "%I:%M", second_zone_time);
  if (s_second_time_12h_buffer[0] == '0') {
    memmove(s_second_time_12h_buffer, s_second_time_12h_buffer + 1, strlen(s_second_time_12h_buffer));
  }
  strftime(s_second_period_buffer, sizeof(s_second_period_buffer), "%p", second_zone_time);
  strftime(s_second_time_24h_buffer, sizeof(s_second_time_24h_buffer), "%H:%M", second_zone_time);

  update_health();
}

static void draw_label(GContext *ctx, const char *text, GRect rect, GColor color) {
  graphics_context_set_text_color(ctx, color);
  graphics_draw_text(ctx, text, fonts_get_system_font(FONT_KEY_GOTHIC_14_BOLD), rect,
                     GTextOverflowModeTrailingEllipsis, GTextAlignmentLeft, NULL);
}

static void draw_value(GContext *ctx, const char *text, GRect rect, GColor color, const char *font_key,
                       GTextAlignment alignment) {
  graphics_context_set_text_color(ctx, color);
  graphics_draw_text(ctx, text, fonts_get_system_font(font_key), rect,
                     GTextOverflowModeTrailingEllipsis, alignment, NULL);
}

static void draw_panel(GContext *ctx, GRect rect, GColor background, GColor accent) {
  graphics_context_set_fill_color(ctx, background);
  graphics_fill_rect(ctx, rect, 12, GCornersAll);

  graphics_context_set_stroke_color(ctx, accent);
  graphics_draw_round_rect(ctx, rect, 12);
}

static void canvas_update_proc(Layer *layer, GContext *ctx) {
  GRect bounds = layer_get_bounds(layer);

  graphics_context_set_fill_color(ctx, GColorBlack);
  graphics_fill_rect(ctx, bounds, 0, GCornerNone);

  const int outer = IF_EMERY_ELSE(10, 8);
  const int gap = IF_EMERY_ELSE(8, 6);
  const int header_h = IF_EMERY_ELSE(26, 24);

  GRect header = GRect(outer, outer, bounds.size.w - (outer * 2), header_h);
  graphics_context_set_fill_color(ctx, GColorOxfordBlue);
  graphics_fill_rect(ctx, header, 12, GCornersAll);
  draw_value(ctx, s_date_buffer, header, GColorWhite, FONT_KEY_GOTHIC_18_BOLD, GTextAlignmentCenter);

  const int top_y = header.origin.y + header.size.h + gap;
  const int available_h = bounds.size.h - top_y - outer;
  const int panel_w = (bounds.size.w - (outer * 2) - gap) / 2;
  const int panel_h = (available_h - gap) / 2;

  GRect local_rect = GRect(outer, top_y, panel_w, panel_h);
  GRect utc_rect = GRect(outer + panel_w + gap, top_y, panel_w, panel_h);
  GRect weather_rect = GRect(outer, top_y + panel_h + gap, panel_w, panel_h);
  GRect health_rect = GRect(outer + panel_w + gap, top_y + panel_h + gap, panel_w, panel_h);

  draw_panel(ctx, local_rect, GColorDarkCandyAppleRed, GColorMelon);
  draw_panel(ctx, utc_rect, GColorBlueMoon, GColorCeleste);
  draw_panel(ctx, weather_rect, GColorIslamicGreen, GColorYellow);
  draw_panel(ctx, health_rect, GColorPurple, GColorPastelYellow);

  draw_label(ctx, s_local_zone_label_buffer, GRect(local_rect.origin.x + 8, local_rect.origin.y + 5, local_rect.size.w - 16, 16), GColorWhite);
  draw_value(ctx, s_local_time_12h_buffer,
             GRect(local_rect.origin.x + 8, local_rect.origin.y + 17, local_rect.size.w - 16, 30),
             GColorWhite, FONT_KEY_BITHAM_30_BLACK, GTextAlignmentLeft);
  draw_value(ctx, s_local_period_buffer,
             GRect(local_rect.origin.x + 9, local_rect.origin.y + local_rect.size.h - 38, 32, 16),
             GColorMelon, FONT_KEY_GOTHIC_14_BOLD, GTextAlignmentLeft);
  draw_value(ctx, s_local_time_24h_buffer,
             GRect(local_rect.origin.x + 8, local_rect.origin.y + local_rect.size.h - 31, local_rect.size.w - 16, 30),
             GColorMelon, FONT_KEY_BITHAM_30_BLACK, GTextAlignmentRight);

  draw_label(ctx, "TRAVEL", GRect(utc_rect.origin.x + 8, utc_rect.origin.y + 5, utc_rect.size.w - 16, 16), GColorWhite);
  draw_value(ctx, s_second_time_12h_buffer,
             GRect(utc_rect.origin.x + 8, utc_rect.origin.y + 17, utc_rect.size.w - 16, 30),
             GColorWhite, FONT_KEY_BITHAM_30_BLACK, GTextAlignmentLeft);
  draw_value(ctx, s_second_period_buffer,
             GRect(utc_rect.origin.x + 9, utc_rect.origin.y + utc_rect.size.h - 38, 32, 16),
             GColorCeleste, FONT_KEY_GOTHIC_14_BOLD, GTextAlignmentLeft);
  draw_value(ctx, s_second_time_24h_buffer,
             GRect(utc_rect.origin.x + 8, utc_rect.origin.y + utc_rect.size.h - 31, utc_rect.size.w - 16, 30),
             GColorCeleste, FONT_KEY_BITHAM_30_BLACK, GTextAlignmentRight);

  draw_label(ctx, "WEATHER", GRect(weather_rect.origin.x + 8, weather_rect.origin.y + 5, weather_rect.size.w - 16, 16), GColorWhite);
  if (strcmp(s_weather_temp_buffer, "--") == 0) {
    draw_value(ctx, s_weather_cond_buffer,
               GRect(weather_rect.origin.x + 8, weather_rect.origin.y + 25, weather_rect.size.w - 16, 20),
               GColorYellow, FONT_KEY_GOTHIC_18_BOLD, GTextAlignmentLeft);
  } else {
    draw_value(ctx, s_weather_temp_buffer,
               GRect(weather_rect.origin.x + 8, weather_rect.origin.y + 21, weather_rect.size.w - 16, 28),
               GColorWhite, FONT_KEY_BITHAM_30_BLACK, GTextAlignmentLeft);
    draw_value(ctx, s_weather_cond_buffer,
               GRect(weather_rect.origin.x + 8, weather_rect.origin.y + weather_rect.size.h - 22, weather_rect.size.w - 16, 16),
               GColorYellow, FONT_KEY_GOTHIC_14_BOLD, GTextAlignmentLeft);
  }
  draw_value(ctx, s_weather_city_buffer,
             GRect(weather_rect.origin.x + 8, weather_rect.origin.y + weather_rect.size.h - 16, weather_rect.size.w - 16, 14),
             GColorMintGreen, FONT_KEY_GOTHIC_14, GTextAlignmentLeft);

  draw_label(ctx, "HEALTH", GRect(health_rect.origin.x + 8, health_rect.origin.y + 5, health_rect.size.w - 16, 16), GColorWhite);
  draw_value(ctx, s_hr_buffer,
             GRect(health_rect.origin.x + 8, health_rect.origin.y + 23, health_rect.size.w - 16, 24),
             GColorWhite, FONT_KEY_GOTHIC_24_BOLD, GTextAlignmentLeft);
  draw_value(ctx, "bpm",
             GRect(health_rect.origin.x + 8, health_rect.origin.y + health_rect.size.h - 34, 34, 16),
             GColorPastelYellow, FONT_KEY_GOTHIC_14_BOLD, GTextAlignmentLeft);
  draw_value(ctx, s_steps_buffer,
             GRect(health_rect.origin.x + 46, health_rect.origin.y + health_rect.size.h - 20, health_rect.size.w - 54, 18),
             GColorWhite, FONT_KEY_GOTHIC_18_BOLD, GTextAlignmentRight);
  draw_value(ctx, "steps",
             GRect(health_rect.origin.x + 8, health_rect.origin.y + health_rect.size.h - 20, 42, 18),
             GColorPastelYellow, FONT_KEY_GOTHIC_18_BOLD, GTextAlignmentLeft);
}

static void tick_handler(struct tm *tick_time, TimeUnits units_changed) {
  update_time();
  if (tick_time->tm_min % 30 == 0) {
    request_weather();
  }
  layer_mark_dirty(s_canvas_layer);
}

static void inbox_received_callback(DictionaryIterator *iterator, void *context) {
  Tuple *second_zone_offset_tuple = dict_find(iterator, KEY_SECOND_ZONE_OFFSET);
  Tuple *second_zone_label_tuple = dict_find(iterator, KEY_SECOND_ZONE_LABEL);
  Tuple *local_zone_offset_tuple = dict_find(iterator, KEY_LOCAL_ZONE_OFFSET);
  Tuple *local_zone_label_tuple = dict_find(iterator, KEY_LOCAL_ZONE_LABEL);
  Tuple *temp_tuple = dict_find(iterator, KEY_WEATHER_TEMP);
  Tuple *cond_tuple = dict_find(iterator, KEY_WEATHER_COND);
  Tuple *city_tuple = dict_find(iterator, KEY_WEATHER_CITY);
  Tuple *error_tuple = dict_find(iterator, KEY_WEATHER_ERROR);

  if (local_zone_offset_tuple) {
    s_local_zone_offset_minutes = local_zone_offset_tuple->value->int32;
  }
  if (local_zone_label_tuple) {
    snprintf(s_local_zone_label_buffer, sizeof(s_local_zone_label_buffer), "%s",
             local_zone_label_tuple->value->cstring);
  }
  if (second_zone_offset_tuple) {
    s_second_zone_offset_minutes = second_zone_offset_tuple->value->int32;
    update_second_zone_meta();
  }
  if (second_zone_label_tuple) {
    snprintf(s_second_zone_label_buffer, sizeof(s_second_zone_label_buffer), "%s",
             second_zone_label_tuple->value->cstring);
  }
  if (local_zone_offset_tuple || local_zone_label_tuple || second_zone_offset_tuple || second_zone_label_tuple) {
    save_settings();
    update_time();
  }
  if (temp_tuple) {
    snprintf(s_weather_temp_buffer, sizeof(s_weather_temp_buffer), "%s", temp_tuple->value->cstring);
  }
  if (cond_tuple) {
    snprintf(s_weather_cond_buffer, sizeof(s_weather_cond_buffer), "%s", cond_tuple->value->cstring);
  }
  if (city_tuple) {
    snprintf(s_weather_city_buffer, sizeof(s_weather_city_buffer), "%s", city_tuple->value->cstring);
  }
  if (error_tuple) {
    snprintf(s_weather_cond_buffer, sizeof(s_weather_cond_buffer), "%s", error_tuple->value->cstring);
  }

  layer_mark_dirty(s_canvas_layer);
}

static void inbox_dropped_callback(AppMessageResult reason, void *context) {
  snprintf(s_weather_cond_buffer, sizeof(s_weather_cond_buffer), "Sync fail");
  layer_mark_dirty(s_canvas_layer);
}

static void outbox_failed_callback(DictionaryIterator *iterator, AppMessageResult reason, void *context) {
  snprintf(s_weather_cond_buffer, sizeof(s_weather_cond_buffer), "Phone retry");
  layer_mark_dirty(s_canvas_layer);
}

static void health_handler(HealthEventType event, void *context) {
  update_health();
  layer_mark_dirty(s_canvas_layer);
}

static void main_window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);

  s_canvas_layer = layer_create(bounds);
  layer_set_update_proc(s_canvas_layer, canvas_update_proc);
  layer_add_child(window_layer, s_canvas_layer);
}

static void main_window_unload(Window *window) {
  layer_destroy(s_canvas_layer);
}

static void init(void) {
  load_settings();

  s_main_window = window_create();
  window_set_background_color(s_main_window, GColorBlack);
  window_set_window_handlers(s_main_window, (WindowHandlers) {
    .load = main_window_load,
    .unload = main_window_unload
  });

  app_message_register_inbox_received(inbox_received_callback);
  app_message_register_inbox_dropped(inbox_dropped_callback);
  app_message_register_outbox_failed(outbox_failed_callback);
  app_message_open(256, 64);

  update_time();
  window_stack_push(s_main_window, true);

  tick_timer_service_subscribe(MINUTE_UNIT, tick_handler);
  s_health_events_subscribed = health_service_events_subscribe(health_handler, NULL);
  configure_heart_rate_sensor();
  request_weather();
}

static void deinit(void) {
  if (s_hr_sample_requested) {
    health_service_set_heart_rate_sample_period(0);
  }
  if (s_health_events_subscribed) {
    health_service_events_unsubscribe();
  }
  tick_timer_service_unsubscribe();
  app_message_deregister_callbacks();
  window_destroy(s_main_window);
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}
