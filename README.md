# Devices Metadata

A collection of devices indexed by their identifiers.
Currently, we only have Apple hardware in this list.

## Usage

Import the `getDeviceDataFromIdentifier` from `@fyde/devices-metadata` and use it like so:

```js
const { getDeviceDataFromIdentifier } = require("@fyde/devices-metadata");

const res = getDeviceDataFromIdentifier("iPad11,2");
console.log(res);
```

Running the above returns:

```shell
$ node script.js
{ name: 'iPad mini (5th gen)',
  category: 'tablet',
  brand: 'apple' }
```

## Build

First, build the docker container locally:

```
$ docker build -t device-metadata .
```

Next, run the generation script (needs [docker](https://docker.com/)):

```
$ docker run -v "$PWD":/home/user/app device-metadata node scripts/crawl.js

{
  "i386": {
    "name": "32-bit Simulator",
    "category": "simulator",
    "brand": "apple"
  },
  "x86_64": {
    "name": "64-bit Simulator",
    "category": "simulator",
  ...
```

The script prints the generated JSON directly to **stdout**.
All logs go to **stderr**.

## Sources

List of sources we use to gather information about hardware models.

### Apple hardware

- https://www.theiphonewiki.com/wiki/Models
- https://en.wikipedia.org/wiki/List_of_iOS_devices
- https://developer.apple.com/documentation/uikit/uidevice

## License

This lib is [MIT licensed](./LICENSE).
