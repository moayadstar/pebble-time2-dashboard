#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packagePath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const args = new Set(process.argv.slice(2));

function fail(message) {
  console.error("version-guard: " + message);
  process.exit(1);
}

function assertPebbleCompatibility() {
  const pebble = pkg.pebble || {};
  const sdkVersion = Number(pebble.sdkVersion || 0);
  const targetPlatforms = Array.isArray(pebble.targetPlatforms) ? pebble.targetPlatforms : [];

  if (sdkVersion < 3) {
    fail("Pebble sdkVersion must stay at 3 or newer for Pebble Time / Pebble Time 2 compatibility.");
  }

  if (!targetPlatforms.includes("emery")) {
    fail("targetPlatforms must include emery for Pebble Time 2.");
  }

  if (!targetPlatforms.includes("basalt")) {
    fail("targetPlatforms should keep basalt so the watchface remains compatible with color Pebble OS devices.");
  }

  if (!pebble.watchapp || pebble.watchapp.watchface !== true) {
    fail("package.json must keep pebble.watchapp.watchface enabled.");
  }
}

function bumpPatchVersion() {
  const parts = String(pkg.version || "0.0.0").split(".").map((part) => Number(part));

  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part) || part < 0)) {
    fail("version must use semantic version format, for example 1.0.0.");
  }

  parts[2] += 1;
  pkg.version = parts.join(".");
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("version-guard: bumped version to " + pkg.version);
}

assertPebbleCompatibility();

if (args.has("--bump")) {
  bumpPatchVersion();
} else {
  console.log("version-guard: Pebble compatibility check passed for version " + pkg.version);
}
