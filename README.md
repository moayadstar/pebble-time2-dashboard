# Time2 Dashboard

Color Pebble watchface designed for `Pebble Time 2 / emery`.

## Layout

- Top bar: day and date
- Top left: local time
- Top right: UTC time
- Bottom left: weather
- Bottom right: steps and heart rate
- Settings page: search and choose the second clock city plus weather location

## Notes

- Weather is fetched on the phone side with `Open-Meteo`, so it does not need an API key.
- Weather refreshes on launch and every 30 minutes.
- Weather can use `Phone GPS` or a fixed city/country selected from a large built-in capitals list plus live city search suggestions.
- Heart rate only appears on watches and firmware that expose `HealthMetricHeartRateBPM`.
- The second clock can be changed from the watchface settings screen in the phone app.
- Version updates are guarded by `tools/version-guard.js`; every local commit bumps the patch version and checks Pebble Time 2 compatibility.
- Pebble compatibility is kept through `sdkVersion: 3` and the `emery` target platform for Pebble Time 2.

## Files

- Watch code: [src/c/main.c](/C:/Users/PC/Documents/pebble%20watch/pebble-time2-dashboard/src/c/main.c)
- Phone JS: [src/pkjs/index.js](/C:/Users/PC/Documents/pebble%20watch/pebble-time2-dashboard/src/pkjs/index.js)
- App manifest: [package.json](/C:/Users/PC/Documents/pebble%20watch/pebble-time2-dashboard/package.json)

## Build

Build with Pebble CLI from WSL:

```sh
pebble build
```
