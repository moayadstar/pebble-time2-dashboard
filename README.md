# Time2 Dashboard

Color Pebble watchface designed for `Pebble Time 2 / emery`.

## Layout

- Top bar: day and date
- Top left: local time
- Top right: UTC time
- Bottom left: weather
- Bottom right: steps and heart rate
- Settings page: choose the second time zone and a searchable weather location list

## Notes

- Weather is fetched on the phone side with `Open-Meteo`, so it does not need an API key.
- Weather refreshes on launch and every 30 minutes.
- Weather can use `Phone GPS` or a fixed city/country selected from a large built-in list plus live search suggestions.
- Heart rate only appears on watches and firmware that expose `HealthMetricHeartRateBPM`.
- The second time zone can be changed from the watchface settings screen in the phone app.

## Files

- Watch code: [src/c/main.c](/C:/Users/PC/Documents/pebble%20watch/pebble-time2-dashboard/src/c/main.c)
- Phone JS: [src/pkjs/index.js](/C:/Users/PC/Documents/pebble%20watch/pebble-time2-dashboard/src/pkjs/index.js)
- App manifest: [package.json](/C:/Users/PC/Documents/pebble%20watch/pebble-time2-dashboard/package.json)

## Build

This workspace does not currently have the `pebble` CLI installed, so the project is prepared but not compiled here yet.
