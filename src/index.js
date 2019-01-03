/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

const list = require("../devices.json");

export function getDeviceNameFromIdentifier(id) {
  return list[id];
}
