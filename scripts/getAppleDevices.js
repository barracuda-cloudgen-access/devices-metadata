/**
 * Copyright (c) Fyde, Inc. and contributors. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

import fetch from "node-fetch";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

function computeCommonName(names) {
  if (typeof names === "string") {
    return names;
  }
  if (!Array.isArray(names)) {
    return "";
  }
  if (names.length === 1) {
    return names[0];
  }

  // Splits string by spaces, taking into account quoted/with parenthesis words
  const explodedNames = names
    .map((name) => name.match(/\(([^)]+)\)|"([^"]*)"|[^\s-]+/g))
    .filter((rep) => rep !== null);
  const maxExplodedNameLength = Math.max(
    ...explodedNames.map((name) => name.length)
  );

  const out = [];
  for (let j = 0; j < maxExplodedNameLength; j += 1) {
    const reps = {};
    // Find variant repetitions
    explodedNames.forEach((name) => {
      reps[name[j]] = true;
    });
    const repsArr = Object.keys(reps).filter(
      (rep) => !["undefined"].includes(rep)
    );

    const first = repsArr[0];

    if (repsArr.length === 1) {
      // If only one entry, use it
      out.push(first);
    } else if (repsArr.every((rep) => rep.match(/^["(](.*?)[")]$/))) {
      // If word is wrapped between quotes/parenthesis
      const startChar = first[0];
      const endChar = first[first.length - 1];

      const unwrappedReps = repsArr.map((rep) =>
        rep.substring(1, rep.length - 1)
      );
      const computed = computeCommonName(unwrappedReps);
      if (computed.length) {
        out.push(`${startChar}${computed}${endChar}`);
      }
    } else {
      out.push(repsArr.join("/"));
    }
  }
  // Filter out big words and return joined computed model
  return out.filter((s) => s.length < 50).join(" ");
}

/**
 * Builds list of devices with target format.
 * When several models are found for the same device ID, store them all.
 */
async function buildDevices(elems) {
  const devices = {};

  for (const { id, name } of elems) {
    if (["Pending", "N/A"].includes(id)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    devices[id] = devices[id] ?? {
      names: [],
    };

    devices[id].names.push(name);
  }

  for (const elem of Object.values(devices)) {
    elem.name = computeCommonName(elem.names);
    delete elem.names;
  }

  return devices;
}

async function getiOSDevices() {
  const res = await fetch("https://api.ipsw.me/v4/devices");
  const content = await res.json();

  return buildDevices(
    content.map((elem) => ({
      id: elem.identifier,
      name: elem.name,
    }))
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
    Array(nameAll.length)
      .fill(0)
      .map((_, id) => ({
        id: deviceIdAll[id].textContent.replace("*", ""),
        name: nameAll[id].textContent.replace("*", ""),
      }))
  );
}

/**
 * Main
 */
(async () => {
  console.log(
    JSON.stringify(
      {
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
