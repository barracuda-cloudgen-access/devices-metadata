/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

const list = require("../apple_devices.json");

export function getDeviceNameFromIdentifier(id) {
  return list[id];
}
