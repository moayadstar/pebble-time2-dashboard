function codeToLabel(code) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Cloudy";
  if (code <= 48) return "Fog";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Shower";
  if (code <= 99) return "Storm";
  return "Weather";
}

var CAPITAL_TIME_OPTIONS = [
  { label: "UTC", timezone: "UTC", latitude: 0, longitude: 0 },
  { label: "Riyadh, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 24.7136, longitude: 46.6753 },
  { label: "Abu Dhabi, UAE", timezone: "Asia/Dubai", latitude: 24.4539, longitude: 54.3773 },
  { label: "Doha, Qatar", timezone: "Asia/Qatar", latitude: 25.2854, longitude: 51.531 },
  { label: "Kuwait City, Kuwait", timezone: "Asia/Kuwait", latitude: 29.3759, longitude: 47.9774 },
  { label: "Manama, Bahrain", timezone: "Asia/Bahrain", latitude: 26.2235, longitude: 50.5876 },
  { label: "Muscat, Oman", timezone: "Asia/Muscat", latitude: 23.588, longitude: 58.3829 },
  { label: "Cairo, Egypt", timezone: "Africa/Cairo", latitude: 30.0444, longitude: 31.2357 },
  { label: "Amman, Jordan", timezone: "Asia/Amman", latitude: 31.9539, longitude: 35.9106 },
  { label: "Beirut, Lebanon", timezone: "Asia/Beirut", latitude: 33.8938, longitude: 35.5018 },
  { label: "Damascus, Syria", timezone: "Asia/Damascus", latitude: 33.5138, longitude: 36.2765 },
  { label: "Baghdad, Iraq", timezone: "Asia/Baghdad", latitude: 33.3152, longitude: 44.3661 },
  { label: "Sanaa, Yemen", timezone: "Asia/Aden", latitude: 15.3694, longitude: 44.191 },
  { label: "Jerusalem, Palestine", timezone: "Asia/Jerusalem", latitude: 31.7683, longitude: 35.2137 },
  { label: "Khartoum, Sudan", timezone: "Africa/Khartoum", latitude: 15.5007, longitude: 32.5599 },
  { label: "Tripoli, Libya", timezone: "Africa/Tripoli", latitude: 32.8872, longitude: 13.1913 },
  { label: "Tunis, Tunisia", timezone: "Africa/Tunis", latitude: 36.8065, longitude: 10.1815 },
  { label: "Algiers, Algeria", timezone: "Africa/Algiers", latitude: 36.7538, longitude: 3.0588 },
  { label: "Rabat, Morocco", timezone: "Africa/Casablanca", latitude: 34.0209, longitude: -6.8416 },
  { label: "Nouakchott, Mauritania", timezone: "Africa/Nouakchott", latitude: 18.0735, longitude: -15.9582 },
  { label: "Ankara, Turkiye", timezone: "Europe/Istanbul", latitude: 39.9334, longitude: 32.8597 },
  { label: "Tehran, Iran", timezone: "Asia/Tehran", latitude: 35.6892, longitude: 51.389 },
  { label: "Kabul, Afghanistan", timezone: "Asia/Kabul", latitude: 34.5553, longitude: 69.2075 },
  { label: "Islamabad, Pakistan", timezone: "Asia/Karachi", latitude: 33.6844, longitude: 73.0479 },
  { label: "New Delhi, India", timezone: "Asia/Kolkata", latitude: 28.6139, longitude: 77.209 },
  { label: "Dhaka, Bangladesh", timezone: "Asia/Dhaka", latitude: 23.8103, longitude: 90.4125 },
  { label: "Kathmandu, Nepal", timezone: "Asia/Kathmandu", latitude: 27.7172, longitude: 85.324 },
  { label: "Colombo, Sri Lanka", timezone: "Asia/Colombo", latitude: 6.9271, longitude: 79.8612 },
  { label: "Male, Maldives", timezone: "Indian/Maldives", latitude: 4.1755, longitude: 73.5093 },
  { label: "Bangkok, Thailand", timezone: "Asia/Bangkok", latitude: 13.7563, longitude: 100.5018 },
  { label: "Kuala Lumpur, Malaysia", timezone: "Asia/Kuala_Lumpur", latitude: 3.139, longitude: 101.6869 },
  { label: "Singapore, Singapore", timezone: "Asia/Singapore", latitude: 1.3521, longitude: 103.8198 },
  { label: "Jakarta, Indonesia", timezone: "Asia/Jakarta", latitude: -6.2088, longitude: 106.8456 },
  { label: "Manila, Philippines", timezone: "Asia/Manila", latitude: 14.5995, longitude: 120.9842 },
  { label: "Hanoi, Vietnam", timezone: "Asia/Ho_Chi_Minh", latitude: 21.0278, longitude: 105.8342 },
  { label: "Phnom Penh, Cambodia", timezone: "Asia/Phnom_Penh", latitude: 11.5564, longitude: 104.9282 },
  { label: "Vientiane, Laos", timezone: "Asia/Vientiane", latitude: 17.9757, longitude: 102.6331 },
  { label: "Naypyidaw, Myanmar", timezone: "Asia/Yangon", latitude: 19.7633, longitude: 96.0785 },
  { label: "Beijing, China", timezone: "Asia/Shanghai", latitude: 39.9042, longitude: 116.4074 },
  { label: "Taipei, Taiwan", timezone: "Asia/Taipei", latitude: 25.033, longitude: 121.5654 },
  { label: "Tokyo, Japan", timezone: "Asia/Tokyo", latitude: 35.6762, longitude: 139.6503 },
  { label: "Seoul, South Korea", timezone: "Asia/Seoul", latitude: 37.5665, longitude: 126.978 },
  { label: "Pyongyang, North Korea", timezone: "Asia/Pyongyang", latitude: 39.0392, longitude: 125.7625 },
  { label: "Ulaanbaatar, Mongolia", timezone: "Asia/Ulaanbaatar", latitude: 47.8864, longitude: 106.9057 },
  { label: "Canberra, Australia", timezone: "Australia/Sydney", latitude: -35.2809, longitude: 149.13 },
  { label: "Wellington, New Zealand", timezone: "Pacific/Auckland", latitude: -41.2865, longitude: 174.7762 },
  { label: "Suva, Fiji", timezone: "Pacific/Fiji", latitude: -18.1248, longitude: 178.4501 },
  { label: "London, United Kingdom", timezone: "Europe/London", latitude: 51.5072, longitude: -0.1276 },
  { label: "Dublin, Ireland", timezone: "Europe/Dublin", latitude: 53.3498, longitude: -6.2603 },
  { label: "Paris, France", timezone: "Europe/Paris", latitude: 48.8566, longitude: 2.3522 },
  { label: "Madrid, Spain", timezone: "Europe/Madrid", latitude: 40.4168, longitude: -3.7038 },
  { label: "Lisbon, Portugal", timezone: "Europe/Lisbon", latitude: 38.7223, longitude: -9.1393 },
  { label: "Rome, Italy", timezone: "Europe/Rome", latitude: 41.9028, longitude: 12.4964 },
  { label: "Berlin, Germany", timezone: "Europe/Berlin", latitude: 52.52, longitude: 13.405 },
  { label: "Amsterdam, Netherlands", timezone: "Europe/Amsterdam", latitude: 52.3676, longitude: 4.9041 },
  { label: "Brussels, Belgium", timezone: "Europe/Brussels", latitude: 50.8503, longitude: 4.3517 },
  { label: "Bern, Switzerland", timezone: "Europe/Zurich", latitude: 46.948, longitude: 7.4474 },
  { label: "Vienna, Austria", timezone: "Europe/Vienna", latitude: 48.2082, longitude: 16.3738 },
  { label: "Prague, Czechia", timezone: "Europe/Prague", latitude: 50.0755, longitude: 14.4378 },
  { label: "Warsaw, Poland", timezone: "Europe/Warsaw", latitude: 52.2297, longitude: 21.0122 },
  { label: "Budapest, Hungary", timezone: "Europe/Budapest", latitude: 47.4979, longitude: 19.0402 },
  { label: "Bratislava, Slovakia", timezone: "Europe/Bratislava", latitude: 48.1486, longitude: 17.1077 },
  { label: "Ljubljana, Slovenia", timezone: "Europe/Ljubljana", latitude: 46.0569, longitude: 14.5058 },
  { label: "Zagreb, Croatia", timezone: "Europe/Zagreb", latitude: 45.815, longitude: 15.9819 },
  { label: "Belgrade, Serbia", timezone: "Europe/Belgrade", latitude: 44.7866, longitude: 20.4489 },
  { label: "Sarajevo, Bosnia and Herzegovina", timezone: "Europe/Sarajevo", latitude: 43.8563, longitude: 18.4131 },
  { label: "Podgorica, Montenegro", timezone: "Europe/Podgorica", latitude: 42.4304, longitude: 19.2594 },
  { label: "Tirana, Albania", timezone: "Europe/Tirane", latitude: 41.3275, longitude: 19.8187 },
  { label: "Skopje, North Macedonia", timezone: "Europe/Skopje", latitude: 41.9981, longitude: 21.4254 },
  { label: "Athens, Greece", timezone: "Europe/Athens", latitude: 37.9838, longitude: 23.7275 },
  { label: "Sofia, Bulgaria", timezone: "Europe/Sofia", latitude: 42.6977, longitude: 23.3219 },
  { label: "Bucharest, Romania", timezone: "Europe/Bucharest", latitude: 44.4268, longitude: 26.1025 },
  { label: "Chisinau, Moldova", timezone: "Europe/Chisinau", latitude: 47.0105, longitude: 28.8638 },
  { label: "Kyiv, Ukraine", timezone: "Europe/Kyiv", latitude: 50.4501, longitude: 30.5234 },
  { label: "Minsk, Belarus", timezone: "Europe/Minsk", latitude: 53.9006, longitude: 27.559 },
  { label: "Vilnius, Lithuania", timezone: "Europe/Vilnius", latitude: 54.6872, longitude: 25.2797 },
  { label: "Riga, Latvia", timezone: "Europe/Riga", latitude: 56.9496, longitude: 24.1052 },
  { label: "Tallinn, Estonia", timezone: "Europe/Tallinn", latitude: 59.437, longitude: 24.7536 },
  { label: "Helsinki, Finland", timezone: "Europe/Helsinki", latitude: 60.1699, longitude: 24.9384 },
  { label: "Stockholm, Sweden", timezone: "Europe/Stockholm", latitude: 59.3293, longitude: 18.0686 },
  { label: "Oslo, Norway", timezone: "Europe/Oslo", latitude: 59.9139, longitude: 10.7522 },
  { label: "Copenhagen, Denmark", timezone: "Europe/Copenhagen", latitude: 55.6761, longitude: 12.5683 },
  { label: "Reykjavik, Iceland", timezone: "Atlantic/Reykjavik", latitude: 64.1466, longitude: -21.9426 },
  { label: "Moscow, Russia", timezone: "Europe/Moscow", latitude: 55.7558, longitude: 37.6173 },
  { label: "Ottawa, Canada", timezone: "America/Toronto", latitude: 45.4215, longitude: -75.6972 },
  { label: "Washington, DC, USA", timezone: "America/New_York", latitude: 38.9072, longitude: -77.0369 },
  { label: "Mexico City, Mexico", timezone: "America/Mexico_City", latitude: 19.4326, longitude: -99.1332 },
  { label: "Guatemala City, Guatemala", timezone: "America/Guatemala", latitude: 14.6349, longitude: -90.5069 },
  { label: "San Salvador, El Salvador", timezone: "America/El_Salvador", latitude: 13.6929, longitude: -89.2182 },
  { label: "Tegucigalpa, Honduras", timezone: "America/Tegucigalpa", latitude: 14.0723, longitude: -87.1921 },
  { label: "Managua, Nicaragua", timezone: "America/Managua", latitude: 12.114, longitude: -86.2362 },
  { label: "San Jose, Costa Rica", timezone: "America/Costa_Rica", latitude: 9.9281, longitude: -84.0907 },
  { label: "Panama City, Panama", timezone: "America/Panama", latitude: 8.9824, longitude: -79.5199 },
  { label: "Havana, Cuba", timezone: "America/Havana", latitude: 23.1136, longitude: -82.3666 },
  { label: "Kingston, Jamaica", timezone: "America/Jamaica", latitude: 18.0179, longitude: -76.8099 },
  { label: "Santo Domingo, Dominican Republic", timezone: "America/Santo_Domingo", latitude: 18.4861, longitude: -69.9312 },
  { label: "Bogota, Colombia", timezone: "America/Bogota", latitude: 4.711, longitude: -74.0721 },
  { label: "Caracas, Venezuela", timezone: "America/Caracas", latitude: 10.4806, longitude: -66.9036 },
  { label: "Quito, Ecuador", timezone: "America/Guayaquil", latitude: -0.1807, longitude: -78.4678 },
  { label: "Lima, Peru", timezone: "America/Lima", latitude: -12.0464, longitude: -77.0428 },
  { label: "La Paz, Bolivia", timezone: "America/La_Paz", latitude: -16.4897, longitude: -68.1193 },
  { label: "Santiago, Chile", timezone: "America/Santiago", latitude: -33.4489, longitude: -70.6693 },
  { label: "Buenos Aires, Argentina", timezone: "America/Argentina/Buenos_Aires", latitude: -34.6037, longitude: -58.3816 },
  { label: "Montevideo, Uruguay", timezone: "America/Montevideo", latitude: -34.9011, longitude: -56.1645 },
  { label: "Asuncion, Paraguay", timezone: "America/Asuncion", latitude: -25.2637, longitude: -57.5759 },
  { label: "Brasilia, Brazil", timezone: "America/Sao_Paulo", latitude: -15.8267, longitude: -47.9218 },
  { label: "Georgetown, Guyana", timezone: "America/Guyana", latitude: 6.8013, longitude: -58.1551 },
  { label: "Paramaribo, Suriname", timezone: "America/Paramaribo", latitude: 5.852, longitude: -55.2038 },
  { label: "Cayenne, French Guiana", timezone: "America/Cayenne", latitude: 4.9224, longitude: -52.3135 },
  { label: "Cape Town, South Africa", timezone: "Africa/Johannesburg", latitude: -33.9249, longitude: 18.4241 },
  { label: "Pretoria, South Africa", timezone: "Africa/Johannesburg", latitude: -25.7479, longitude: 28.2293 },
  { label: "Nairobi, Kenya", timezone: "Africa/Nairobi", latitude: -1.2921, longitude: 36.8219 },
  { label: "Addis Ababa, Ethiopia", timezone: "Africa/Addis_Ababa", latitude: 8.9806, longitude: 38.7578 },
  { label: "Mogadishu, Somalia", timezone: "Africa/Mogadishu", latitude: 2.0469, longitude: 45.3182 },
  { label: "Djibouti, Djibouti", timezone: "Africa/Djibouti", latitude: 11.5721, longitude: 43.1456 },
  { label: "Asmara, Eritrea", timezone: "Africa/Asmara", latitude: 15.3229, longitude: 38.9251 },
  { label: "Kampala, Uganda", timezone: "Africa/Kampala", latitude: 0.3476, longitude: 32.5825 },
  { label: "Kigali, Rwanda", timezone: "Africa/Kigali", latitude: -1.9441, longitude: 30.0619 },
  { label: "Bujumbura, Burundi", timezone: "Africa/Bujumbura", latitude: -3.3614, longitude: 29.3599 },
  { label: "Dodoma, Tanzania", timezone: "Africa/Dar_es_Salaam", latitude: -6.163, longitude: 35.7516 },
  { label: "Lusaka, Zambia", timezone: "Africa/Lusaka", latitude: -15.3875, longitude: 28.3228 },
  { label: "Harare, Zimbabwe", timezone: "Africa/Harare", latitude: -17.8252, longitude: 31.0335 },
  { label: "Maputo, Mozambique", timezone: "Africa/Maputo", latitude: -25.9692, longitude: 32.5732 },
  { label: "Gaborone, Botswana", timezone: "Africa/Gaborone", latitude: -24.6282, longitude: 25.9231 },
  { label: "Windhoek, Namibia", timezone: "Africa/Windhoek", latitude: -22.5609, longitude: 17.0658 },
  { label: "Luanda, Angola", timezone: "Africa/Luanda", latitude: -8.839, longitude: 13.2894 },
  { label: "Kinshasa, DR Congo", timezone: "Africa/Kinshasa", latitude: -4.4419, longitude: 15.2663 },
  { label: "Brazzaville, Congo", timezone: "Africa/Brazzaville", latitude: -4.2634, longitude: 15.2429 },
  { label: "Libreville, Gabon", timezone: "Africa/Libreville", latitude: 0.4162, longitude: 9.4673 },
  { label: "Yaounde, Cameroon", timezone: "Africa/Douala", latitude: 3.848, longitude: 11.5021 },
  { label: "Abuja, Nigeria", timezone: "Africa/Lagos", latitude: 9.0765, longitude: 7.3986 },
  { label: "Accra, Ghana", timezone: "Africa/Accra", latitude: 5.6037, longitude: -0.187 },
  { label: "Abidjan, Cote d'Ivoire", timezone: "Africa/Abidjan", latitude: 5.36, longitude: -4.0083 },
  { label: "Dakar, Senegal", timezone: "Africa/Dakar", latitude: 14.7167, longitude: -17.4677 },
  { label: "Bamako, Mali", timezone: "Africa/Bamako", latitude: 12.6392, longitude: -8.0029 },
  { label: "Ouagadougou, Burkina Faso", timezone: "Africa/Ouagadougou", latitude: 12.3714, longitude: -1.5197 },
  { label: "Niamey, Niger", timezone: "Africa/Niamey", latitude: 13.5116, longitude: 2.1254 },
  { label: "N'Djamena, Chad", timezone: "Africa/Ndjamena", latitude: 12.1348, longitude: 15.0557 }
];

var SAUDI_WEATHER_OPTIONS = [
  { label: "Riyadh, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 24.7136, longitude: 46.6753 },
  { label: "Jeddah, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 21.5433, longitude: 39.1728 },
  { label: "Makkah, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 21.3891, longitude: 39.8579 },
  { label: "Madinah, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 24.5247, longitude: 39.5692 },
  { label: "Dammam, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 26.4207, longitude: 50.0888 },
  { label: "Khobar, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 26.2794, longitude: 50.2083 },
  { label: "Dhahran, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 26.2361, longitude: 50.0393 },
  { label: "Tabuk, Tabuk Region, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 28.3838, longitude: 36.555 },
  { label: "Taif, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 21.2703, longitude: 40.4158 },
  { label: "Abha, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 18.2164, longitude: 42.5053 },
  { label: "Khamis Mushait, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 18.3, longitude: 42.7333 },
  { label: "Jazan, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 16.8892, longitude: 42.5511 },
  { label: "Najran, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 17.565, longitude: 44.2289 },
  { label: "Hail, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 27.5114, longitude: 41.7208 },
  { label: "Buraidah, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 26.3592, longitude: 43.9818 },
  { label: "Al Ahsa, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 25.3833, longitude: 49.5833 },
  { label: "Yanbu, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 24.0895, longitude: 38.0618 },
  { label: "Al Jubail, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 27.0174, longitude: 49.6225 },
  { label: "AlUla, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 26.6085, longitude: 37.9232 },
  { label: "Sakaka, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 29.9697, longitude: 40.2064 },
  { label: "Arar, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 30.9753, longitude: 41.0381 },
  { label: "Al Baha, Saudi Arabia", timezone: "Asia/Riyadh", latitude: 20.0129, longitude: 41.4677 }
];

var CURRENT_WEATHER_LOCATION_OPTION = {
  label: "Current location from phone",
  mode: "gps"
};

var WEATHER_LOCATION_OPTIONS = [
  CURRENT_WEATHER_LOCATION_OPTION
].concat(SAUDI_WEATHER_OPTIONS).concat(CAPITAL_TIME_OPTIONS).map(function (item) {
  return {
    label: item.label,
    mode: item.mode || "fixed",
    latitude: item.latitude,
    longitude: item.longitude,
    timezone: item.timezone
  };
});

var PHONE_LOCAL_TIME_OPTION = {
  label: "Current local time from phone",
  mode: "phone",
  timezone: "PHONE"
};

var LOCAL_TIME_OPTIONS = [PHONE_LOCAL_TIME_OPTION].concat(CAPITAL_TIME_OPTIONS);

function getPhoneLocalZone() {
  return {
    label: "LOCAL",
    mode: "phone",
    timezone: "PHONE",
    latitude: 0,
    longitude: 0,
    offset: -new Date().getTimezoneOffset()
  };
}

function getTimezoneOffsetMinutes(timezone) {
  if (!timezone || timezone === "UTC") {
    return 0;
  }

  try {
    var now = new Date();
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).formatToParts(now);
    var values = {};

    parts.forEach(function (part) {
      values[part.type] = part.value;
    });

    var hour = parseInt(values.hour, 10);
    if (hour === 24) {
      hour = 0;
    }

    var zonedAsUtc = Date.UTC(
      parseInt(values.year, 10),
      parseInt(values.month, 10) - 1,
      parseInt(values.day, 10),
      hour,
      parseInt(values.minute, 10)
    );

    return Math.round((zonedAsUtc - now.getTime()) / 60000);
  } catch (e) {
    return 0;
  }
}

function formatOffset(minutes) {
  var sign = minutes >= 0 ? "+" : "-";
  var abs = Math.abs(minutes);
  var hours = Math.floor(abs / 60);
  var mins = abs % 60;

  if (!mins) {
    return "UTC" + sign + String(hours);
  }

  return "UTC" + sign + String(hours) + ":" + String(mins < 10 ? "0" + mins : mins);
}

function normalizeTimeZone(zone) {
  if (zone && zone.mode === "phone") {
    return getPhoneLocalZone();
  }

  return {
    label: zone.label || "UTC",
    mode: zone.mode || "fixed",
    timezone: zone.timezone || "UTC",
    latitude: zone.latitude || 0,
    longitude: zone.longitude || 0,
    offset: typeof zone.offset === "number" ? zone.offset : getTimezoneOffsetMinutes(zone.timezone || "UTC")
  };
}

function getSavedSecondZone() {
  try {
    var raw = localStorage.getItem("second_zone");
    if (raw) {
      return normalizeTimeZone(JSON.parse(raw));
    }
  } catch (e) {}

  return normalizeTimeZone(CAPITAL_TIME_OPTIONS[0]);
}

function getSavedLocalZone() {
  try {
    var raw = localStorage.getItem("local_zone");
    if (raw) {
      return normalizeTimeZone(JSON.parse(raw));
    }
  } catch (e) {}

  return getPhoneLocalZone();
}

function getSavedWeatherLocation() {
  try {
    var raw = localStorage.getItem("weather_location");
    if (raw) {
      var saved = JSON.parse(raw);
      if (saved.mode === "gps") {
        return CURRENT_WEATHER_LOCATION_OPTION;
      }
      return saved;
    }
  } catch (e) {}

  return CURRENT_WEATHER_LOCATION_OPTION;
}

var appMessageQueue = [];
var appMessageSending = false;

function flushAppMessageQueue() {
  if (appMessageSending || appMessageQueue.length === 0) {
    return;
  }

  appMessageSending = true;
  var item = appMessageQueue.shift();
  var payload = item.payload;

  Pebble.sendAppMessage(payload, function () {
    appMessageSending = false;
    flushAppMessageQueue();
  }, function () {
    if (item.retries < 3) {
      item.retries += 1;
      appMessageQueue.unshift(item);
    }
    appMessageSending = false;
    setTimeout(flushAppMessageQueue, 500);
  });
}

function queueAppMessage(payload) {
  appMessageQueue.push({
    payload: payload,
    retries: 0
  });
  flushAppMessageQueue();
}

function sendWeather(payload) {
  queueAppMessage(payload);
}

function compactLabel(label, fallback) {
  var value = String(label || fallback || "Local");
  var commaIndex = value.indexOf(",");

  if (commaIndex > 0) {
    value = value.substring(0, commaIndex);
  }

  return value.substring(0, 18);
}

function sendSecondZone(zone) {
  var normalized = normalizeTimeZone(zone);

  queueAppMessage({
    SECOND_ZONE_OFFSET: normalized.offset,
    SECOND_ZONE_LABEL: normalized.label
  });
}

function sendLocalZone(zone) {
  var normalized = normalizeTimeZone(zone);

  queueAppMessage({
    LOCAL_ZONE_OFFSET: normalized.offset,
    LOCAL_ZONE_LABEL: normalized.label
  });
}

function sendError(message) {
  sendWeather({
    WEATHER_ERROR: message,
    WEATHER_TEMP: "--",
    WEATHER_COND: message,
    WEATHER_CITY: "Phone"
  });
}

function requestJson(url, onSuccess, onFailure) {
  function failOrFetch() {
    if (typeof fetch === "function") {
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(onSuccess)
        .catch(onFailure);
    } else {
      onFailure();
    }
  }

  try {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
      if ((request.status >= 200 && request.status < 300) || (request.status === 0 && request.responseText)) {
        try {
          onSuccess(JSON.parse(request.responseText));
        } catch (e) {
          failOrFetch();
        }
      } else {
        failOrFetch();
      }
    };
    request.onerror = failOrFetch;
    request.ontimeout = failOrFetch;
    request.timeout = 15000;
    request.send();
  } catch (e) {
    failOrFetch();
  }
}

function fetchWeatherForCoordinates(latitude, longitude, cityLabel) {
  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude +
    "&longitude=" + longitude +
    "&current=temperature_2m,weather_code&current_weather=true&timezone=auto";

  requestJson(url,
    function (data) {
      var current = data.current || {};
      var currentWeather = data.current_weather || {};
      var temp = typeof current.temperature_2m === "number" ? current.temperature_2m : currentWeather.temperature;
      var weatherCode = typeof current.weather_code === "number" ? current.weather_code : currentWeather.weathercode;

      sendWeather({
        WEATHER_TEMP: typeof temp === "number" ? String(Math.round(temp)) : "--",
        WEATHER_COND: codeToLabel(weatherCode),
        WEATHER_CITY: compactLabel(cityLabel, data.timezone_abbreviation || "Local"),
        WEATHER_CODE: typeof weatherCode === "number" ? weatherCode : -1,
        WEATHER_ERROR: ""
      });
    },
    function () {
      sendError("Net error");
    }
  );
}

function fetchWeather() {
  var selectedLocation = getSavedWeatherLocation();

  if (selectedLocation.mode === "fixed") {
    fetchWeatherForCoordinates(selectedLocation.latitude, selectedLocation.longitude, selectedLocation.label);
    return;
  }

  if (!navigator.geolocation) {
    sendError("No GPS");
    return;
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    fetchWeatherForCoordinates(position.coords.latitude, position.coords.longitude, "Current");
  }, function () {
    sendError("GPS denied");
  }, {
    timeout: 15000,
    maximumAge: 5 * 60 * 1000
  });
}

function buildSettingsHtml() {
  var selectedLocalTime = getSavedLocalZone();
  var selectedTime = getSavedSecondZone();
  var selectedWeather = getSavedWeatherLocation();
  var localOptionsJson = JSON.stringify(LOCAL_TIME_OPTIONS).replace(/</g, "\\u003c");
  var timeOptionsJson = JSON.stringify(CAPITAL_TIME_OPTIONS).replace(/</g, "\\u003c");
  var weatherOptionsJson = JSON.stringify(WEATHER_LOCATION_OPTIONS).replace(/</g, "\\u003c");

  return '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>body{font-family:Arial,sans-serif;background:#0b1020;color:#fff;padding:20px}h1{font-size:22px;margin:0 0 8px}h2{font-size:18px;margin:24px 0 8px}label{display:block;margin:16px 0 8px}input,select,button{width:100%;padding:14px;border-radius:10px;border:none;font-size:16px;box-sizing:border-box}select,input{background:#fff;color:#111}button{margin-top:22px;background:#2f7cf6;color:#fff;font-weight:bold}p{color:#b6c2e1;line-height:1.5;margin:0 0 12px}.hint{font-size:13px;color:#8fa1cf;margin-top:8px}.row{display:grid;grid-template-columns:1fr;gap:8px}</style>' +
    '</head><body><h1>Watchface Settings</h1><p>Search manually by city name for local time, travel time, and weather.</p>' +
    '<h2>Local Clock</h2><label for="local-search">Search local clock city</label><input id="local-search" type="text" placeholder="Search local time city" value="' + escapeHtml(selectedLocalTime.label) + '">' +
    '<label for="local-location">Local time city</label><select id="local-location"></select><div class="hint">This controls the red LOCAL panel.</div>' +
    '<h2>Travel Clock</h2><label for="time-search">Search travel city or capital</label><input id="time-search" type="text" placeholder="Search travel time city" value="' + escapeHtml(selectedTime.label) + '">' +
    '<label for="time-location">Travel time city</label><select id="time-location"></select><div class="hint">This controls the blue TRAVEL panel.</div>' +
    '<h2>Weather</h2><label for="weather-search">Search country or city</label><input id="weather-search" type="text" placeholder="Search weather location" value="' + escapeHtml(selectedWeather.label || CURRENT_WEATHER_LOCATION_OPTION.label) + '">' +
    '<label for="weather-location">Weather location</label><select id="weather-location"></select><div class="hint">Choose Current location from phone to update weather automatically as you move.</div>' +
    '<button id="save">Save</button>' +
    '<script>var LOCAL_TIME_OPTIONS=' + localOptionsJson + ';var TIME_OPTIONS=' + timeOptionsJson + ';var WEATHER_OPTIONS=' + weatherOptionsJson + ';var selectedLocalTimeLabel=' + JSON.stringify(selectedLocalTime.mode === "phone" ? PHONE_LOCAL_TIME_OPTION.label : selectedLocalTime.label) + ';var selectedTimeLabel=' + JSON.stringify(selectedTime.label) + ';var selectedWeatherLabel=' + JSON.stringify(selectedWeather.label || CURRENT_WEATHER_LOCATION_OPTION.label) + ';' +
    clientSettingsScript() +
    '</script></body></html>';
}

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function clientSettingsScript() {
  return 'function optionKey(item){return item.label+"|"+(item.timezone||"")+"|"+(item.latitude||"")+"|"+(item.longitude||"");}' +
    'function renderSelect(select,items,selectedLabel,kind){if(!items.length){items=[{label:"No results",mode:"none"}];}select.innerHTML=items.map(function(item){var disabled=item.mode==="none"?" disabled":"";var selected=item.label===selectedLabel?" selected":"";var value;if(item.mode==="none"){value="No results|none|||";}else if(kind==="weather"&&item.mode==="gps"){value=item.label+"|gps|||";}else if(kind==="local"&&item.mode==="phone"){value=item.label+"|phone|||PHONE";}else{value=item.label+"|fixed|"+(item.latitude||0)+"|"+(item.longitude||0)+"|"+(item.timezone||"UTC");}var suffix=item.timezone&&item.timezone!=="PHONE"?" ("+item.timezone+")":"";return "<option value=\\""+value.replace(/"/g,"&quot;")+"\\""+selected+disabled+">"+item.label+suffix+"</option>";}).join("");}' +
    'function localSearch(options,q){return options.filter(function(item){return item.label.toLowerCase().indexOf(q)!==-1||(item.timezone&&item.timezone.toLowerCase().indexOf(q)!==-1);}).slice(0,70);}' +
    'function mergeResults(a,b){var seen={};var out=[];a.concat(b).forEach(function(item){var key=optionKey(item);if(!seen[key]){seen[key]=true;out.push(item);}});return out.slice(0,90);}' +
    'function fetchRemoteSearch(q){var url="https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(q)+"&count=25&language=en&format=json";function map(data){return ((data&&data.results)||[]).map(function(item){var parts=[item.name];if(item.admin1&&item.admin1!==item.name)parts.push(item.admin1);if(item.country)parts.push(item.country);return {label:parts.join(", "),mode:"fixed",latitude:item.latitude,longitude:item.longitude,timezone:item.timezone||"UTC"};});}return new Promise(function(resolve){function done(data){resolve(map(data));}function fail(){resolve([]);}if(typeof XMLHttpRequest!=="undefined"){try{var xhr=new XMLHttpRequest();xhr.open("GET",url,true);xhr.onload=function(){if(xhr.status>=200&&xhr.status<300){try{done(JSON.parse(xhr.responseText));}catch(e){fail();}}else{fail();}};xhr.onerror=fail;xhr.ontimeout=fail;xhr.timeout=12000;xhr.send();return;}catch(e){}}if(typeof fetch==="function"){fetch(url).then(function(r){return r.json();}).then(done).catch(fail);}else{fail();}});}' +
    'function wireSearch(input,select,options,selectedLabel,kind){var timer=null;function run(){var q=input.value.trim().toLowerCase();if(!q){renderSelect(select,options.slice(0,80),selectedLabel,kind);return;}var local=localSearch(options,q);renderSelect(select,local,selectedLabel,kind);if(q.length<3)return;fetchRemoteSearch(q).then(function(remote){renderSelect(select,mergeResults(local,remote),selectedLabel,kind);});}input.addEventListener("input",function(){clearTimeout(timer);timer=setTimeout(run,250);});run();}' +
    'function tzOffset(tz){if(!tz||tz==="UTC")return 0;try{var now=new Date();var parts=new Intl.DateTimeFormat("en-US",{timeZone:tz,hour12:false,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).formatToParts(now);var v={};parts.forEach(function(p){v[p.type]=p.value;});var h=parseInt(v.hour,10);if(h===24)h=0;var asUtc=Date.UTC(parseInt(v.year,10),parseInt(v.month,10)-1,parseInt(v.day,10),h,parseInt(v.minute,10));return Math.round((asUtc-now.getTime())/60000);}catch(e){return 0;}}' +
    'var localInput=document.getElementById("local-search");var localSelect=document.getElementById("local-location");var timeInput=document.getElementById("time-search");var timeSelect=document.getElementById("time-location");var weatherInput=document.getElementById("weather-search");var weatherSelect=document.getElementById("weather-location");wireSearch(localInput,localSelect,LOCAL_TIME_OPTIONS,selectedLocalTimeLabel,"local");wireSearch(timeInput,timeSelect,TIME_OPTIONS,selectedTimeLabel,"time");wireSearch(weatherInput,weatherSelect,WEATHER_OPTIONS,selectedWeatherLabel,"weather");' +
    'document.getElementById("save").addEventListener("click",function(){var l=localSelect.value.split("|");var t=timeSelect.value.split("|");var w=weatherSelect.value.split("|");if(!l[1]||l[1]==="none"||!t[1]||t[1]==="none"||!w[1]||w[1]==="none")return;var isPhoneLocal=l[1]==="phone";var ltz=l[4]||"UTC";var tz=t[4]||"UTC";var data={LOCAL_ZONE_LABEL:isPhoneLocal?"LOCAL":l[0],LOCAL_ZONE_MODE:isPhoneLocal?"phone":"fixed",LOCAL_ZONE_OFFSET:isPhoneLocal?-new Date().getTimezoneOffset():tzOffset(ltz),LOCAL_ZONE_TIMEZONE:ltz,LOCAL_ZONE_LAT:l[2]?parseFloat(l[2]):0,LOCAL_ZONE_LON:l[3]?parseFloat(l[3]):0,SECOND_ZONE_LABEL:t[0],SECOND_ZONE_OFFSET:tzOffset(tz),SECOND_ZONE_TIMEZONE:tz,SECOND_ZONE_LAT:t[2]?parseFloat(t[2]):0,SECOND_ZONE_LON:t[3]?parseFloat(t[3]):0,WEATHER_LOCATION_LABEL:w[0],WEATHER_LOCATION_MODE:w[1],WEATHER_LOCATION_LAT:w[2]?parseFloat(w[2]):0,WEATHER_LOCATION_LON:w[3]?parseFloat(w[3]):0,WEATHER_LOCATION_TIMEZONE:w[4]||"UTC"};document.location="pebblejs://close#"+encodeURIComponent(JSON.stringify(data));});';
}

Pebble.addEventListener("ready", function () {
  sendLocalZone(getSavedLocalZone());
  sendSecondZone(getSavedSecondZone());
  fetchWeather();
});

Pebble.addEventListener("appmessage", function () {
  sendLocalZone(getSavedLocalZone());
  sendSecondZone(getSavedSecondZone());
  fetchWeather();
});

Pebble.addEventListener("showConfiguration", function () {
  Pebble.openURL("data:text/html," + encodeURIComponent(buildSettingsHtml()));
});

Pebble.addEventListener("webviewclosed", function (e) {
  if (!e.response) {
    return;
  }

  var config;
  try {
    config = JSON.parse(decodeURIComponent(e.response));
  } catch (err) {
    return;
  }

  if (!config || typeof config.SECOND_ZONE_OFFSET !== "number" || !config.SECOND_ZONE_LABEL ||
      typeof config.LOCAL_ZONE_OFFSET !== "number" || !config.LOCAL_ZONE_LABEL) {
    return;
  }

  var localZone = normalizeTimeZone({
    label: config.LOCAL_ZONE_LABEL,
    mode: config.LOCAL_ZONE_MODE || "fixed",
    timezone: config.LOCAL_ZONE_TIMEZONE || "UTC",
    latitude: config.LOCAL_ZONE_LAT,
    longitude: config.LOCAL_ZONE_LON,
    offset: config.LOCAL_ZONE_OFFSET
  });

  var secondZone = normalizeTimeZone({
    label: config.SECOND_ZONE_LABEL,
    timezone: config.SECOND_ZONE_TIMEZONE || "UTC",
    latitude: config.SECOND_ZONE_LAT,
    longitude: config.SECOND_ZONE_LON,
    offset: config.SECOND_ZONE_OFFSET
  });

  localStorage.setItem("local_zone", JSON.stringify(localZone));
  localStorage.setItem("second_zone", JSON.stringify(secondZone));

  if (config.WEATHER_LOCATION_LABEL && config.WEATHER_LOCATION_MODE) {
    localStorage.setItem("weather_location", JSON.stringify({
      label: config.WEATHER_LOCATION_LABEL,
      mode: config.WEATHER_LOCATION_MODE,
      latitude: config.WEATHER_LOCATION_LAT,
      longitude: config.WEATHER_LOCATION_LON,
      timezone: config.WEATHER_LOCATION_TIMEZONE || "UTC"
    }));
  }

  sendLocalZone(localZone);
  sendSecondZone(secondZone);
  fetchWeather();
});
