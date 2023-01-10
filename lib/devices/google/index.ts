import { MOBILE } from "../../categories";
import {
  addMetadata,
  combineMatchers,
  regexBasedMatcher,
} from "../../matchers";

const google = addMetadata({
  post: {
    brand: "Google",
    category: MOBILE,
  },
  matcher: combineMatchers([
    regexBasedMatcher({
      regex: /^Pixel [0-9]+.*$/,
    }),
  ]),
});

export default google;
