/**
 * Copyright (c) Barracuda Networks, Inc.
 * All rights reserved.
 */

const list = require("./devices.json");

function getDeviceDataFromIdentifier(id) {
  const device = list[id];
  if (!device) {
    throw new Error("Unknown device identifier.");
  }
  return device;
}

module.exports.getDeviceDataFromIdentifier = getDeviceDataFromIdentifier;
