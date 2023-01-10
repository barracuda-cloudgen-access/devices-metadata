import { DESKTOP, LAPTOP, MOBILE, SERVER, TABLET } from "../../categories";
import { addMetadata, combineMatchers } from "../../matchers";
import { appleMatcher } from "./util";

const servers = addMetadata({
  post: {
    category: SERVER,
  },
  matcher: combineMatchers([
    appleMatcher({
      metadata: {
        name: "Xserve",
      },
      regex: /^Xserve[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "RackMac",
      },
      regex: /^RackMac[0-9]+,[0-9]+$/,
    }),
  ]),
});

const laptops = addMetadata({
  post: {
    category: LAPTOP,
  },
  matcher: combineMatchers([
    appleMatcher({
      metadata: {
        name: "MacBook",
      },
      regex: /^MacBook[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "PowerBook",
      },
      regex: /^PowerBook[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "MacBookPro",
      },
      regex: /^MacBookPro[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "MacBookAir",
      },
      regex: /^MacBookAir[0-9]+,[0-9]+$/,
    }),
  ]),
});

const desktops = addMetadata({
  post: {
    category: DESKTOP,
  },
  matcher: combineMatchers([
    appleMatcher({
      metadata: {
        name: "iMac",
      },
      regex: /^iMac[0-9]*,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "iMac Pro",
      },
      regex: /^iMacPro[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "Mac",
      },
      regex: /^Mac[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "PowerMac",
      },
      regex: /^PowerMac[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "MacPro",
      },
      regex: /^MacPro[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        name: "Macmini",
      },
      regex: /^Macmini[0-9]+,[0-9]+$/,
    }),
  ]),
});

const apple = addMetadata({
  post: {
    brand: "Apple",
  },
  matcher: combineMatchers([
    laptops,
    desktops,
    servers,
    appleMatcher({
      metadata: {
        category: TABLET,
        name: "iPad",
      },
      regex: /^iPad[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        category: MOBILE,
        name: "iPhone",
      },
      regex: /^iPhone[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        category: "music_player",
        name: "iPod",
      },
      regex: /^iPod[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        category: "watch",
        name: "Watch",
      },
      regex: /^Watch[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        category: "speaker",
        name: "HomePod",
      },
      regex: /^AudioAccessory[0-9]+,[0-9]+$/,
    }),
    appleMatcher({
      metadata: {
        category: "tv",
        name: "Apple TV",
      },
      regex: /^AppleTV[0-9]+,[0-9]+$/,
    }),
  ]),
});

export default apple;
