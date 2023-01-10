import { LAPTOP } from "../../categories";
import { addMetadata, regexBasedMatcher } from "../../matchers";

const hp = addMetadata({
  matcher: regexBasedMatcher({
    regex: /^HP .*$/i,
    getDeviceFn(id) {
      return {
        name: id,
      };
    },
  }),
  post: {
    brand: "HP",
    category: LAPTOP,
  },
});

export default hp;
