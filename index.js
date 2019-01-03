/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

const list = require("./apple_devices.json");

function getDeviceNameFromIdentifier(id) {
  return list[id];
}

module.exports = {
  getDeviceNameFromIdentifier
};
