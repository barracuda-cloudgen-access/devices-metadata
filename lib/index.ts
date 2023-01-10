import apple from "./devices/apple";
import dell from "./devices/dell";
import google from "./devices/google";
import hp from "./devices/hp";
import lenovo from "./devices/lenovo";
import microsoft from "./devices/microsoft";
import samsung from "./devices/samsung";
import { combineMatchers, regexBasedMatcher } from "./matchers";

export const getDeviceDataFromIdentifier = combineMatchers([
  apple,
  dell,
  hp,
  lenovo,
  microsoft,
  samsung,
  google,
]);
