/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

const { getDeviceNameFromIdentifier } = require("../index");

describe("#getDeviceNameFromIdentifier", () => {
  describe("when identifier exists", () => {
    it("returns the device name", () => {
      expect(getDeviceNameFromIdentifier("iPhone10,3")).toEqual("iPhone X");
    });
  });

  describe("when identifier does not exist", () => {
    it("throws an exception", () => {
      expect(() => getDeviceNameFromIdentifier("unicorn")).toThrowError(
        "Unknown device identifier."
      );
    });
  });
});
