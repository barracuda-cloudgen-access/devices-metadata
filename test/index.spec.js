/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

const { getDeviceDataFromIdentifier } = require('../index');

describe('#getDeviceDataFromIdentifier', () => {
  describe('when identifier exists', () => {
    it('returns the device data', () => {
      expect(getDeviceDataFromIdentifier('iPhone10,3')).toEqual({
        name: 'iPhone X (Global)',
        category: 'mobile',
        brand: 'apple',
      });
    });
  });

  describe('when identifier does not exist', () => {
    it('throws an exception', () => {
      expect(() => getDeviceDataFromIdentifier('unicorn')).toThrow(
        'Unknown device identifier.',
      );
    });
  });
});
