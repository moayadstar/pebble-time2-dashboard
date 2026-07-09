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

var SECOND_ZONE_OPTIONS = [
  { label: "UTC", offset: 0 },
  { label: "Riyadh", offset: 180 },
  { label: "Dubai", offset: 240 },
  { label: "Cairo", offset: 120 },
  { label: "Istanbul", offset: 180 },
  { label: "London", offset: 0 },
  { label: "Paris", offset: 60 },
  { label: "Moscow", offset: 180 },
  { label: "Delhi", offset: 330 },
  { label: "Bangkok", offset: 420 },
  { label: "Beijing", offset: 480 },
  { label: "Tokyo", offset: 540 },
  { label: "Sydney", offset: 600 },
  { label: "New York", offset: -300 },
  { label: "Chicago", offset: -360 },
  { label: "Denver", offset: -420 },
  { label: "Los Angeles", offset: -480 }
];

var WEATHER_LOCATION_OPTIONS = [
  { label: "Phone GPS", mode: "gps" },
  { label: "Riyadh, Saudi Arabia", mode: "fixed", latitude: 24.7136, longitude: 46.6753 },
  { label: "Jeddah, Saudi Arabia", mode: "fixed", latitude: 21.5433, longitude: 39.1728 },
  { label: "Makkah, Saudi Arabia", mode: "fixed", latitude: 21.3891, longitude: 39.8579 },
  { label: "Madinah, Saudi Arabia", mode: "fixed", latitude: 24.5247, longitude: 39.5692 },
  { label: "Dammam, Saudi Arabia", mode: "fixed", latitude: 26.4207, longitude: 50.0888 },
  { label: "Khobar, Saudi Arabia", mode: "fixed", latitude: 26.2794, longitude: 50.2083 },
  { label: "Dhahran, Saudi Arabia", mode: "fixed", latitude: 26.2361, longitude: 50.0393 },
  { label: "Taif, Saudi Arabia", mode: "fixed", latitude: 21.2703, longitude: 40.4158 },
  { label: "Tabuk, Saudi Arabia", mode: "fixed", latitude: 28.3838, longitude: 36.555 },
  { label: "Abha, Saudi Arabia", mode: "fixed", latitude: 18.2164, longitude: 42.5053 },
  { label: "Khamis Mushait, Saudi Arabia", mode: "fixed", latitude: 18.3, longitude: 42.7333 },
  { label: "Jazan, Saudi Arabia", mode: "fixed", latitude: 16.8892, longitude: 42.5511 },
  { label: "Najran, Saudi Arabia", mode: "fixed", latitude: 17.565, longitude: 44.2289 },
  { label: "Hail, Saudi Arabia", mode: "fixed", latitude: 27.5114, longitude: 41.7208 },
  { label: "Buraidah, Saudi Arabia", mode: "fixed", latitude: 26.3592, longitude: 43.9818 },
  { label: "Al Ahsa, Saudi Arabia", mode: "fixed", latitude: 25.3833, longitude: 49.5833 },
  { label: "Yanbu, Saudi Arabia", mode: "fixed", latitude: 24.0895, longitude: 38.0618 },
  { label: "Al Jubail, Saudi Arabia", mode: "fixed", latitude: 27.0174, longitude: 49.6225 },
  { label: "Dubai, UAE", mode: "fixed", latitude: 25.2048, longitude: 55.2708 },
  { label: "Abu Dhabi, UAE", mode: "fixed", latitude: 24.4539, longitude: 54.3773 },
  { label: "Sharjah, UAE", mode: "fixed", latitude: 25.3463, longitude: 55.4209 },
  { label: "Ajman, UAE", mode: "fixed", latitude: 25.4052, longitude: 55.5136 },
  { label: "Al Ain, UAE", mode: "fixed", latitude: 24.1302, longitude: 55.8023 },
  { label: "Doha, Qatar", mode: "fixed", latitude: 25.2854, longitude: 51.531 },
  { label: "Lusail, Qatar", mode: "fixed", latitude: 25.4209, longitude: 51.531 },
  { label: "Kuwait City, Kuwait", mode: "fixed", latitude: 29.3759, longitude: 47.9774 },
  { label: "Manama, Bahrain", mode: "fixed", latitude: 26.2235, longitude: 50.5876 },
  { label: "Muscat, Oman", mode: "fixed", latitude: 23.588, longitude: 58.3829 },
  { label: "Salalah, Oman", mode: "fixed", latitude: 17.0194, longitude: 54.0897 },
  { label: "Cairo, Egypt", mode: "fixed", latitude: 30.0444, longitude: 31.2357 },
  { label: "Alexandria, Egypt", mode: "fixed", latitude: 31.2001, longitude: 29.9187 },
  { label: "Giza, Egypt", mode: "fixed", latitude: 30.0131, longitude: 31.2089 },
  { label: "Istanbul, Turkiye", mode: "fixed", latitude: 41.0082, longitude: 28.9784 },
  { label: "Ankara, Turkiye", mode: "fixed", latitude: 39.9334, longitude: 32.8597 },
  { label: "Izmir, Turkiye", mode: "fixed", latitude: 38.4237, longitude: 27.1428 },
  { label: "Antalya, Turkiye", mode: "fixed", latitude: 36.8969, longitude: 30.7133 },
  { label: "Amman, Jordan", mode: "fixed", latitude: 31.9539, longitude: 35.9106 },
  { label: "Aqaba, Jordan", mode: "fixed", latitude: 29.5321, longitude: 35.0063 },
  { label: "Beirut, Lebanon", mode: "fixed", latitude: 33.8938, longitude: 35.5018 },
  { label: "Baghdad, Iraq", mode: "fixed", latitude: 33.3152, longitude: 44.3661 },
  { label: "Basra, Iraq", mode: "fixed", latitude: 30.5085, longitude: 47.7804 },
  { label: "Erbil, Iraq", mode: "fixed", latitude: 36.1911, longitude: 44.0092 },
  { label: "Casablanca, Morocco", mode: "fixed", latitude: 33.5731, longitude: -7.5898 },
  { label: "Rabat, Morocco", mode: "fixed", latitude: 34.0209, longitude: -6.8416 },
  { label: "Marrakesh, Morocco", mode: "fixed", latitude: 31.6295, longitude: -7.9811 },
  { label: "Tunis, Tunisia", mode: "fixed", latitude: 36.8065, longitude: 10.1815 },
  { label: "Algiers, Algeria", mode: "fixed", latitude: 36.7538, longitude: 3.0588 },
  { label: "Tripoli, Libya", mode: "fixed", latitude: 32.8872, longitude: 13.1913 },
  { label: "Khartoum, Sudan", mode: "fixed", latitude: 15.5007, longitude: 32.5599 },
  { label: "London, United Kingdom", mode: "fixed", latitude: 51.5072, longitude: -0.1276 },
  { label: "Manchester, United Kingdom", mode: "fixed", latitude: 53.4808, longitude: -2.2426 },
  { label: "Birmingham, United Kingdom", mode: "fixed", latitude: 52.4862, longitude: -1.8904 },
  { label: "Edinburgh, United Kingdom", mode: "fixed", latitude: 55.9533, longitude: -3.1883 },
  { label: "Paris, France", mode: "fixed", latitude: 48.8566, longitude: 2.3522 },
  { label: "Marseille, France", mode: "fixed", latitude: 43.2965, longitude: 5.3698 },
  { label: "Lyon, France", mode: "fixed", latitude: 45.764, longitude: 4.8357 },
  { label: "Berlin, Germany", mode: "fixed", latitude: 52.52, longitude: 13.405 },
  { label: "Munich, Germany", mode: "fixed", latitude: 48.1351, longitude: 11.582 },
  { label: "Hamburg, Germany", mode: "fixed", latitude: 53.5511, longitude: 9.9937 },
  { label: "Frankfurt, Germany", mode: "fixed", latitude: 50.1109, longitude: 8.6821 },
  { label: "Rome, Italy", mode: "fixed", latitude: 41.9028, longitude: 12.4964 },
  { label: "Milan, Italy", mode: "fixed", latitude: 45.4642, longitude: 9.19 },
  { label: "Naples, Italy", mode: "fixed", latitude: 40.8518, longitude: 14.2681 },
  { label: "Madrid, Spain", mode: "fixed", latitude: 40.4168, longitude: -3.7038 },
  { label: "Barcelona, Spain", mode: "fixed", latitude: 41.3851, longitude: 2.1734 },
  { label: "Lisbon, Portugal", mode: "fixed", latitude: 38.7223, longitude: -9.1393 },
  { label: "Amsterdam, Netherlands", mode: "fixed", latitude: 52.3676, longitude: 4.9041 },
  { label: "Brussels, Belgium", mode: "fixed", latitude: 50.8503, longitude: 4.3517 },
  { label: "Zurich, Switzerland", mode: "fixed", latitude: 47.3769, longitude: 8.5417 },
  { label: "Vienna, Austria", mode: "fixed", latitude: 48.2082, longitude: 16.3738 },
  { label: "Prague, Czechia", mode: "fixed", latitude: 50.0755, longitude: 14.4378 },
  { label: "Warsaw, Poland", mode: "fixed", latitude: 52.2297, longitude: 21.0122 },
  { label: "Athens, Greece", mode: "fixed", latitude: 37.9838, longitude: 23.7275 },
  { label: "Stockholm, Sweden", mode: "fixed", latitude: 59.3293, longitude: 18.0686 },
  { label: "Oslo, Norway", mode: "fixed", latitude: 59.9139, longitude: 10.7522 },
  { label: "Copenhagen, Denmark", mode: "fixed", latitude: 55.6761, longitude: 12.5683 },
  { label: "Helsinki, Finland", mode: "fixed", latitude: 60.1699, longitude: 24.9384 },
  { label: "Dublin, Ireland", mode: "fixed", latitude: 53.3498, longitude: -6.2603 },
  { label: "Moscow, Russia", mode: "fixed", latitude: 55.7558, longitude: 37.6173 },
  { label: "Saint Petersburg, Russia", mode: "fixed", latitude: 59.9311, longitude: 30.3609 },
  { label: "Kyiv, Ukraine", mode: "fixed", latitude: 50.4501, longitude: 30.5234 },
  { label: "Delhi, India", mode: "fixed", latitude: 28.6139, longitude: 77.209 },
  { label: "Mumbai, India", mode: "fixed", latitude: 19.076, longitude: 72.8777 },
  { label: "Bengaluru, India", mode: "fixed", latitude: 12.9716, longitude: 77.5946 },
  { label: "Hyderabad, India", mode: "fixed", latitude: 17.385, longitude: 78.4867 },
  { label: "Chennai, India", mode: "fixed", latitude: 13.0827, longitude: 80.2707 },
  { label: "Kolkata, India", mode: "fixed", latitude: 22.5726, longitude: 88.3639 },
  { label: "Karachi, Pakistan", mode: "fixed", latitude: 24.8607, longitude: 67.0011 },
  { label: "Lahore, Pakistan", mode: "fixed", latitude: 31.5204, longitude: 74.3587 },
  { label: "Islamabad, Pakistan", mode: "fixed", latitude: 33.6844, longitude: 73.0479 },
  { label: "Dhaka, Bangladesh", mode: "fixed", latitude: 23.8103, longitude: 90.4125 },
  { label: "Kathmandu, Nepal", mode: "fixed", latitude: 27.7172, longitude: 85.324 },
  { label: "Colombo, Sri Lanka", mode: "fixed", latitude: 6.9271, longitude: 79.8612 },
  { label: "Bangkok, Thailand", mode: "fixed", latitude: 13.7563, longitude: 100.5018 },
  { label: "Singapore, Singapore", mode: "fixed", latitude: 1.3521, longitude: 103.8198 },
  { label: "Kuala Lumpur, Malaysia", mode: "fixed", latitude: 3.139, longitude: 101.6869 },
  { label: "Jakarta, Indonesia", mode: "fixed", latitude: -6.2088, longitude: 106.8456 },
  { label: "Bali, Indonesia", mode: "fixed", latitude: -8.4095, longitude: 115.1889 },
  { label: "Manila, Philippines", mode: "fixed", latitude: 14.5995, longitude: 120.9842 },
  { label: "Ho Chi Minh City, Vietnam", mode: "fixed", latitude: 10.8231, longitude: 106.6297 },
  { label: "Hanoi, Vietnam", mode: "fixed", latitude: 21.0278, longitude: 105.8342 },
  { label: "Beijing, China", mode: "fixed", latitude: 39.9042, longitude: 116.4074 },
  { label: "Shanghai, China", mode: "fixed", latitude: 31.2304, longitude: 121.4737 },
  { label: "Guangzhou, China", mode: "fixed", latitude: 23.1291, longitude: 113.2644 },
  { label: "Shenzhen, China", mode: "fixed", latitude: 22.5431, longitude: 114.0579 },
  { label: "Hong Kong, China", mode: "fixed", latitude: 22.3193, longitude: 114.1694 },
  { label: "Seoul, South Korea", mode: "fixed", latitude: 37.5665, longitude: 126.978 },
  { label: "Tokyo, Japan", mode: "fixed", latitude: 35.6762, longitude: 139.6503 },
  { label: "Osaka, Japan", mode: "fixed", latitude: 34.6937, longitude: 135.5023 },
  { label: "Kyoto, Japan", mode: "fixed", latitude: 35.0116, longitude: 135.7681 },
  { label: "Sydney, Australia", mode: "fixed", latitude: -33.8688, longitude: 151.2093 },
  { label: "Melbourne, Australia", mode: "fixed", latitude: -37.8136, longitude: 144.9631 },
  { label: "Brisbane, Australia", mode: "fixed", latitude: -27.4698, longitude: 153.0251 },
  { label: "Perth, Australia", mode: "fixed", latitude: -31.9505, longitude: 115.8605 },
  { label: "Auckland, New Zealand", mode: "fixed", latitude: -36.8509, longitude: 174.7645 },
  { label: "New York, USA", mode: "fixed", latitude: 40.7128, longitude: -74.006 },
  { label: "Chicago, USA", mode: "fixed", latitude: 41.8781, longitude: -87.6298 },
  { label: "Denver, USA", mode: "fixed", latitude: 39.7392, longitude: -104.9903 },
  { label: "Los Angeles, USA", mode: "fixed", latitude: 34.0522, longitude: -118.2437 },
  { label: "Washington, DC, USA", mode: "fixed", latitude: 38.9072, longitude: -77.0369 },
  { label: "Boston, USA", mode: "fixed", latitude: 42.3601, longitude: -71.0589 },
  { label: "Miami, USA", mode: "fixed", latitude: 25.7617, longitude: -80.1918 },
  { label: "Atlanta, USA", mode: "fixed", latitude: 33.749, longitude: -84.388 },
  { label: "Dallas, USA", mode: "fixed", latitude: 32.7767, longitude: -96.797 },
  { label: "Houston, USA", mode: "fixed", latitude: 29.7604, longitude: -95.3698 },
  { label: "Seattle, USA", mode: "fixed", latitude: 47.6062, longitude: -122.3321 },
  { label: "San Francisco, USA", mode: "fixed", latitude: 37.7749, longitude: -122.4194 },
  { label: "Las Vegas, USA", mode: "fixed", latitude: 36.1699, longitude: -115.1398 },
  { label: "Phoenix, USA", mode: "fixed", latitude: 33.4484, longitude: -112.074 },
  { label: "Toronto, Canada", mode: "fixed", latitude: 43.6532, longitude: -79.3832 },
  { label: "Montreal, Canada", mode: "fixed", latitude: 45.5017, longitude: -73.5673 },
  { label: "Vancouver, Canada", mode: "fixed", latitude: 49.2827, longitude: -123.1207 },
  { label: "Calgary, Canada", mode: "fixed", latitude: 51.0447, longitude: -114.0719 },
  { label: "Sao Paulo, Brazil", mode: "fixed", latitude: -23.5505, longitude: -46.6333 },
  { label: "Mexico City, Mexico", mode: "fixed", latitude: 19.4326, longitude: -99.1332 },
  { label: "Rio de Janeiro, Brazil", mode: "fixed", latitude: -22.9068, longitude: -43.1729 },
  { label: "Buenos Aires, Argentina", mode: "fixed", latitude: -34.6037, longitude: -58.3816 },
  { label: "Santiago, Chile", mode: "fixed", latitude: -33.4489, longitude: -70.6693 },
  { label: "Lima, Peru", mode: "fixed", latitude: -12.0464, longitude: -77.0428 },
  { label: "Bogota, Colombia", mode: "fixed", latitude: 4.711, longitude: -74.0721 },
  { label: "Johannesburg, South Africa", mode: "fixed", latitude: -26.2041, longitude: 28.0473 },
  { label: "Cape Town, South Africa", mode: "fixed", latitude: -33.9249, longitude: 18.4241 },
  { label: "Nairobi, Kenya", mode: "fixed", latitude: -1.2921, longitude: 36.8219 },
  { label: "Lagos, Nigeria", mode: "fixed", latitude: 6.5244, longitude: 3.3792 },
  { label: "Addis Ababa, Ethiopia", mode: "fixed", latitude: 8.9806, longitude: 38.7578 }
];

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

function getSavedSecondZone() {
  try {
    var raw = localStorage.getItem("second_zone");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}

  return SECOND_ZONE_OPTIONS[0];
}

function getSavedWeatherLocation() {
  try {
    var raw = localStorage.getItem("weather_location");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}

  return WEATHER_LOCATION_OPTIONS[0];
}

function sendWeather(payload) {
  Pebble.sendAppMessage(payload, function () {}, function () {});
}

function sendSecondZone(zone) {
  Pebble.sendAppMessage({
    SECOND_ZONE_OFFSET: zone.offset,
    SECOND_ZONE_LABEL: zone.label
  }, function () {}, function () {});
}

function sendError(message) {
  sendWeather({
    WEATHER_ERROR: message,
    WEATHER_TEMP: "--",
    WEATHER_COND: message,
    WEATHER_CITY: "Phone"
  });
}

function fetchWeatherForCoordinates(latitude, longitude, cityLabel) {
  var url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude +
    "&longitude=" + longitude +
    "&current=temperature_2m,weather_code&timezone=auto";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var current = data.current || {};
      var temp = current.temperature_2m;
      var weatherCode = current.weather_code;
      var city = cityLabel || data.timezone_abbreviation || "Local";

      sendWeather({
        WEATHER_TEMP: typeof temp === "number" ? Math.round(temp) + "C" : "--",
        WEATHER_COND: codeToLabel(weatherCode),
        WEATHER_CITY: city,
        WEATHER_ERROR: ""
      });
    })
    .catch(function () {
      sendError("Net error");
    });
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
    fetchWeatherForCoordinates(position.coords.latitude, position.coords.longitude, "Phone GPS");
  }, function () {
    sendError("GPS denied");
  }, {
    timeout: 15000,
    maximumAge: 30 * 60 * 1000
  });
}

Pebble.addEventListener("ready", function () {
  sendSecondZone(getSavedSecondZone());
  fetchWeather();
});

Pebble.addEventListener("appmessage", function () {
  fetchWeather();
});

Pebble.addEventListener("showConfiguration", function () {
  var selected = getSavedSecondZone();
  var selectedWeather = getSavedWeatherLocation();
  var optionsHtml = SECOND_ZONE_OPTIONS.map(function (zone) {
    var isSelected = zone.label === selected.label ? " selected" : "";
    return '<option value="' + zone.label + '|' + zone.offset + '"' + isSelected + '>' +
      zone.label + " (" + formatOffset(zone.offset) + ")" +
      "</option>";
  }).join("");
  var weatherOptionsJson = JSON.stringify(WEATHER_LOCATION_OPTIONS).replace(/</g, "\\u003c");
  var selectedWeatherLabel = String(selectedWeather.label || "Phone GPS").replace(/"/g, "&quot;");

  var html =
    '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>body{font-family:Arial,sans-serif;background:#0b1020;color:#fff;padding:20px}h1{font-size:22px;margin:0 0 8px}h2{font-size:18px;margin:24px 0 8px}label{display:block;margin:16px 0 8px}input,select,button{width:100%;padding:14px;border-radius:10px;border:none;font-size:16px;box-sizing:border-box}select,input{background:#fff;color:#111}button{margin-top:22px;background:#2f7cf6;color:#fff;font-weight:bold}p{color:#b6c2e1;line-height:1.5;margin:0 0 12px}.hint{font-size:13px;color:#8fa1cf;margin-top:8px}</style>' +
    '</head><body><h1>Watchface Settings</h1><p>Choose the second time zone and a weather location. You can search countries and cities for weather.</p>' +
    '<h2>Second Clock</h2><label for="zone">Time zone</label><select id="zone">' + optionsHtml + '</select>' +
    '<h2>Weather</h2><label for="weather-search">Search country or city</label><input id="weather-search" type="text" placeholder="Search weather location" value="' + selectedWeatherLabel + '">' +
    '<label for="weather-location">Weather location</label><select id="weather-location"></select><div class="hint">Tip: choose Phone GPS to always use your current location.</div>' +
    '<button id="save">Save</button>' +
    '<script>var WEATHER_OPTIONS=' + weatherOptionsJson + ';var selectedWeatherLabel=' + JSON.stringify(selectedWeather.label || "Phone GPS") + ';var searchInput=document.getElementById("weather-search");var weatherSelect=document.getElementById("weather-location");var debounceTimer=null;function optionValue(item){return item.mode==="fixed"?item.label+"|fixed|"+item.latitude+"|"+item.longitude:item.label+"|gps||";}function renderSelect(items){if(!items.length){items=[{label:"No results",mode:"none"}];}weatherSelect.innerHTML=items.map(function(item){var selected=item.label===selectedWeatherLabel?" selected":"";var disabled=item.mode==="none"?" disabled":"";var value=item.mode==="none"?"No results|none||":optionValue(item);return "<option value=\\""+value+"\\""+selected+disabled+">"+item.label+"</option>";}).join("");}function localSearch(q){return WEATHER_OPTIONS.filter(function(item){return item.label.toLowerCase().indexOf(q)!==-1;}).slice(0,60);}function mergeResults(localItems, remoteItems){var seen={};var merged=[];localItems.concat(remoteItems).forEach(function(item){var key=item.label+"|"+item.mode+"|"+(item.latitude||"")+"|"+(item.longitude||"");if(!seen[key]){seen[key]=true;merged.push(item);}});return merged.slice(0,80);}function fetchRemoteSearch(q){var url="https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(q)+"&count=20&language=en&format=json";return fetch(url).then(function(r){return r.json();}).then(function(data){var results=(data&&data.results)||[];return results.map(function(item){var parts=[item.name];if(item.admin1&&item.admin1!==item.name)parts.push(item.admin1);if(item.country)parts.push(item.country);return {label:parts.join(", "),mode:"fixed",latitude:item.latitude,longitude:item.longitude};});}).catch(function(){return [];});}function runSearch(){var q=searchInput.value.trim().toLowerCase();if(!q){renderSelect(WEATHER_OPTIONS.slice(0,80));return;}var localItems=localSearch(q);renderSelect(localItems);if(q.length<3){return;}fetchRemoteSearch(q).then(function(remoteItems){renderSelect(mergeResults(localItems, remoteItems));});}searchInput.addEventListener("input",function(){clearTimeout(debounceTimer);debounceTimer=setTimeout(runSearch,250);});runSearch();document.getElementById("save").addEventListener("click",function(){var z=document.getElementById("zone").value.split("|");var w=weatherSelect.value.split("|");if(!w[1]||w[1]==="none"){return;}var data={SECOND_ZONE_LABEL:z[0],SECOND_ZONE_OFFSET:parseInt(z[1],10),WEATHER_LOCATION_LABEL:w[0],WEATHER_LOCATION_MODE:w[1],WEATHER_LOCATION_LAT:w[2]?parseFloat(w[2]):0,WEATHER_LOCATION_LON:w[3]?parseFloat(w[3]):0};document.location="pebblejs://close#" + encodeURIComponent(JSON.stringify(data));});</script>' +
    '</body></html>';

  Pebble.openURL("data:text/html," + encodeURIComponent(html));
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

  if (!config || typeof config.SECOND_ZONE_OFFSET !== "number" || !config.SECOND_ZONE_LABEL) {
    return;
  }

  localStorage.setItem("second_zone", JSON.stringify({
    label: config.SECOND_ZONE_LABEL,
    offset: config.SECOND_ZONE_OFFSET
  }));

  if (config.WEATHER_LOCATION_LABEL && config.WEATHER_LOCATION_MODE) {
    localStorage.setItem("weather_location", JSON.stringify({
      label: config.WEATHER_LOCATION_LABEL,
      mode: config.WEATHER_LOCATION_MODE,
      latitude: config.WEATHER_LOCATION_LAT,
      longitude: config.WEATHER_LOCATION_LON
    }));
  }

  sendSecondZone({
    label: config.SECOND_ZONE_LABEL,
    offset: config.SECOND_ZONE_OFFSET
  });

  fetchWeather();
});
