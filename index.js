/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

const list = require("./devices.json");

function getDeviceNameFromIdentifier(id) {
  const device = list[id];
  if (!device) {
    throw new Error("Unknown device identifier.");
  }
  return device.name;
}

module.exports.getDeviceNameFromIdentifier = getDeviceNameFromIdentifier;
