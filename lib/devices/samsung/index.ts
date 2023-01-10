import { MOBILE } from "../../categories";
import {
  addMetadata,
  combineMatchers,
  regexBasedMatcher,
} from "../../matchers";

const samsung = addMetadata({
  post: {
    brand: "Samsung",
    category: MOBILE,
  },
  matcher: combineMatchers([
    regexBasedMatcher({
      regex: /^SM-[A-Z][0-9]{3}.*$/,
    }),
  ]),
});

export default samsung;
