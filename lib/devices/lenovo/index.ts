import { LAPTOP } from "../../categories";
import { addMetadata, regexBasedMatcher } from "../../matchers";

const lenovo = addMetadata({
  matcher: regexBasedMatcher({
    regex: /^[0-9]{2}[0-9a-z]{8}$/i,
    getDeviceFn(id) {
      return {
        name: id,
      };
    },
  }),
  post: {
    brand: "Lenovo",
    category: LAPTOP,
  },
});

export default lenovo;
