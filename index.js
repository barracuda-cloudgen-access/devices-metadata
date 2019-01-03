/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

import list from "./apple_devices.json";

export function getDeviceNameFromIdentifier(id) {
  return list[id];
}
