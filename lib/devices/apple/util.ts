import data from "./data.json";

import {
  addMetadata,
  mapBasedMatcher,
  regexBasedMatcher,
} from "../../matchers";

export function appleMatcher({
  regex,
  metadata,
}: {
  regex: RegExp;
  metadata: { [key: string]: any };
}) {
  const insensitiveRegExp = new RegExp(regex, "i");

  const mapBased = mapBasedMatcher({
    devices: Object.fromEntries(
      Object.entries(data).filter(([key, value]) => insensitiveRegExp.test(key))
    ),
    insensitive: true,
    unknownFn(id: string) {
      const unknownStr = `Unknown: '${id}'`;
      const name = metadata.name;

      if (!name) {
        return unknownStr;
      }

      return `${name} (${unknownStr})`;
    },
  });

  return regexBasedMatcher({
    regex: insensitiveRegExp,
    getDeviceFn: addMetadata({
      matcher: mapBased,
      pre: metadata,
    }),
  });
}
