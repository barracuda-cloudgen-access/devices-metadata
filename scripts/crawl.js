/**
 * Copyright (c) Barracuda Networks, Inc. and contributors. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

const fetch = require("node-fetch");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const computeCommonName = require("./computeCommonName");

// Device prefix to category mappings
const categoryMap = {
  iPhone: "mobile",
  iPad: "tablet",
  Watch: "watch",
  iPod: "music_player",
  AppleTV: "tv",
  AudioAccessory: "speaker",
  PowerMac: "desktop",
  PowerBook: "laptop",
  iMac: "desktop",
  Macmini: "desktop",
  MacPro: "desktop",
  MacBook: "laptop",
  RackMac: "rack",
  Xserve: "server",
};

/**
 * Builds list of devices with target format.
 * When several models are found for the same device ID, store them all.
 */
async function buildDevices(total, getDeviceID, getDeviceName) {
  const devices = {};
  for (let i = 0; i < total; i += 1) {
    const deviceID = getDeviceID(i);
    const deviceName = getDeviceName(i);

    if (["Pending", "N/A"].includes(deviceID)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (devices[deviceID]) {
      if (devices[deviceID].name !== deviceName) {
        if (devices[deviceID].names) {
          devices[deviceID].names.push(deviceName);
        } else {
          devices[deviceID].names = [devices[deviceID].name, deviceName];
          delete devices[deviceID].name;
        }
      }
    } else {
      const modelPrefix = Object.keys(categoryMap).find((m) =>
        deviceID.startsWith(m)
      );

      const category = modelPrefix ? categoryMap[modelPrefix] : "unknown";
      if (category === "unknown") {
        console.error(`Warning: Unknown category for deviceID ${deviceID}`);
      }

      devices[deviceID] = {
        name: deviceName,
        category,
        brand: "apple",
      };
    }
  }

  // For models that have several names, canonicalize
  Object.keys(devices).forEach((device) => {
    if (!devices[device].names) {
      return;
    }
    devices[device].name = computeCommonName(devices[device].names);
    delete devices[device].names;
  });
  return devices;
}

async function getiOSDevices() {
  const res = await fetch("https://api.ipsw.me/v4/devices");
  const content = await res.json();

  return buildDevices(
    content.length,
    (i) => content[i].identifier,
    (i) => content[i].name
  );
}

async function getMacOSDevices() {
  const res = await fetch(
    "https://everymac.com/systems/by_capability/mac-specs-by-machine-model-machine-id.html"
  );
  const content = await res.text();
  const dom = new JSDOM(content);

  const nameAll = dom.window.document.querySelectorAll(
    "#contentcenter_specs_externalnav_noflip_2 > a"
  );
  const deviceIdAll = dom.window.document.querySelectorAll(
    "#contentcenter_specs_externalnav_noflip_3 > a"
  );

  if (deviceIdAll.length !== nameAll.length) {
    throw new Error("Cannot get macos devices count");
  }

  return buildDevices(
    nameAll.length,
    (i) => deviceIdAll[i].textContent.replace("*", ""),
    (i) => nameAll[i].textContent.replace("*", "")
  );
}

/**
 * Main
 */
(async () => {
  console.log(
    JSON.stringify(
      {
        i386: {
          name: "32-bit Simulator",
          category: "simulator",
          brand: "apple",
        },
        x86_64: {
          name: "64-bit Simulator",
          category: "simulator",
          brand: "apple",
        },
        ...(await getiOSDevices()),
        ...(await getMacOSDevices()),
      },
      null,
      2
    )
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
