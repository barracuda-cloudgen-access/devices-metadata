import { LAPTOP, TABLET } from "../../categories";
import {
  addMetadata,
  combineMatchers,
  regexBasedMatcher,
} from "../../matchers";

const tablets = addMetadata({
  post: {
    category: TABLET,
  },
  matcher: combineMatchers([
    regexBasedMatcher({
      regex: /^Surface Pro( .*)?$/i,
    }),

    regexBasedMatcher({
      regex: /^Surface Book( .*)?$/i,
    }),
  ]),
});

const laptops = addMetadata({
  post: {
    category: LAPTOP,
  },
  matcher: combineMatchers([
    regexBasedMatcher({
      regex: /^Surface Laptop( .*)?$/i,
    }),
  ]),
});

const microsoft = addMetadata({
  post: {
    brand: "Microsoft",
  },
  matcher: combineMatchers([laptops, tablets]),
});

export default microsoft;
