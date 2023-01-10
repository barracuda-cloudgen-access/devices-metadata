type MatcherType = (id: string) => { [key: string]: any } | null;

export function regexBasedMatcher({
  regex,
  getDeviceFn = (id: string) => ({ name: id }),
}: {
  regex: RegExp;
  getDeviceFn?: MatcherType;
}) {
  return function match(id: string) {
    if (!regex.test(id)) {
      return null;
    }

    return getDeviceFn(id);
  };
}

export function addMetadata({
  matcher,
  pre = {},
  post = {},
}: {
  pre?: { [key: string]: any };
  post?: { [key: string]: any };
  matcher: MatcherType;
}) {
  return function match(id: string) {
    const val = matcher(id);

    if (val === undefined || val === null) {
      return null;
    }

    return {
      ...pre,
      ...val,
      ...post,
    };
  };
}

export function mapBasedMatcher({
  devices,
  unknownFn,
  insensitive,
}: {
  devices: { [key: string]: any };
  unknownFn(id: string): string;
  insensitive: boolean;
}) {
  let targetDevices = devices;

  if (insensitive) {
    targetDevices = Object.fromEntries(
      Object.entries(devices).map(([key, val]) => [key.toLowerCase(), val])
    );
  }

  return function match(id: string) {
    const device = targetDevices[insensitive ? id.toLowerCase() : id];

    if (!device && !unknownFn) {
      return null;
    }

    return {
      ...(device ?? { name: unknownFn(id), unknown: true }),
    };
  };
}

export function combineMatchers(matchers: MatcherType[]) {
  return function matcher(id: string) {
    for (let elem of matchers) {
      const ret = elem(id);

      if (ret !== null) {
        return ret;
      }
    }
    return null;
  };
}
