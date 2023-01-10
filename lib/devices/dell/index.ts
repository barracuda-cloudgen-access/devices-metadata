import { DESKTOP, LAPTOP } from "../../categories";
import {
  addMetadata,
  combineMatchers,
  regexBasedMatcher,
} from "../../matchers";

const laptops = addMetadata({
  post: {
    category: LAPTOP,
  },
  matcher: combineMatchers([
    regexBasedMatcher({
      regex: /^Inspiron ([0-9]{2} )?[0-9]{4}.*$/i,
    }),

    regexBasedMatcher({
      regex: /^Precision ([0-9]{2} )?[0-9]{4}.*$/i,
    }),

    regexBasedMatcher({
      regex: /^XPS ([0-9]{2} )?[0-9]{4}$/i,
    }),

    regexBasedMatcher({
      regex: /^Vostro ([0-9]{2} )?[0-9]{4}$/i,
    }),

    regexBasedMatcher({
      regex: /^Latitude E?[0-9]{4}.*$/i,
    }),

    regexBasedMatcher({
      regex: /^Dell .*$/i,
    }),
  ]),
});

const desktops = addMetadata({
  post: {
    category: DESKTOP,
  },
  matcher: combineMatchers([
    regexBasedMatcher({
      regex: /^OptiPlex .*$/i,
    }),
  ]),
});

const dell = addMetadata({
  matcher: combineMatchers([laptops, desktops]),
  post: {
    brand: "Dell",
  },
});

export default dell;
