/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

const list = require("../devices.json");

function getDeviceNameFromIdentifier(id) {
  return list[id];
}

module.exports.getDeviceNameFromIdentifier = getDeviceNameFromIdentifier;
