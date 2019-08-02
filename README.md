# Devices Metadata

A collection of devices indexed by their identifiers.

## Usage

Import the `getDeviceDataFromIdentifier` from `@fyde/devices-metadata` and use it like so:

```js
const { getDeviceDataFromIdentifier } = require('@fyde/devices-metadata');

const res = getDeviceDataFromIdentifier('iPad11,2');
console.log(res);
```

Running the above returns:

```shell
$ node script.js
{ name: 'iPad mini (5th gen)',
  category: 'tablet',
  brand: 'apple' }
```

## Sources

* https://www.theiphonewiki.com/wiki/Models
* https://en.wikipedia.org/wiki/List_of_iOS_devices
* https://developer.apple.com/documentation/uikit/uidevice

## License

This lib is [MIT licensed](./LICENSE).
