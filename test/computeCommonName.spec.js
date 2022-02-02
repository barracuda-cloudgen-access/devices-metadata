/**
 * Copyright (c) Barracuda Networks, Inc. and contributors. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

const computeCommonName = require("../scripts/computeCommonName");

describe("computeCommonName", () => {
  it("computes individual parts", () => {
    expect(computeCommonName(["2.1", "2.8"])).toEqual("2.1/2.8");
    expect(computeCommonName(["2.1", "2.8", "3.1"])).toEqual("2.1/2.8/3.1");
    expect(computeCommonName(["2.1", "2.8", "3.1", "4.1"])).toEqual(
      "2.1/2.8/3.1/4.1"
    );
  });

  it("computes correctly between quotes", () => {
    expect(computeCommonName(['"Quad Core"', '"Eigth Core"'])).toEqual(
      '"Quad/Eigth Core"'
    );
  });

  it("computes complete models", () => {
    expect(
      computeCommonName([
        'Xserve Xeon Nehalem 2.26 "Quad Core"',
        'Xserve Xeon Nehalem 2.26 "Eight Core"',
        'Xserve Xeon Nehalem 2.66 "Eight Core"',
        'Xserve Xeon Nehalem 2.93 "Eight Core"',
      ])
    ).toEqual('Xserve Xeon Nehalem 2.26/2.66/2.93 "Quad/Eight Core"');

    // TODO separate /?
    expect(
      computeCommonName([
        "Xserve G5/2.0 (PCI-X)",
        "Xserve G5/2.0 DP (PCI-X)",
        "Xserve G5/2.0 DP Cluster Node (PCI-X)",
        "Xserve G5/2.3 DP (PCI-X)",
        "Xserve G5/2.3 DP Cluster Node (PCI-X)",
      ])
    ).toEqual("Xserve G5/2.0/G5/2.3 (PCI-X)/DP (PCI-X)/Cluster Node (PCI-X)");

    expect(
      computeCommonName([
        'MacBook Pro "Core i7" 2.0 15" Late 2013 (IG)',
        'MacBook Pro "Core i7" 2.3 15" Late 2013 (IG)',
        'MacBook Pro "Core i7" 2.6 15" Late 2013 (IG)',
      ])
    ).toEqual('MacBook Pro "Core i7" 2.0/2.3/2.6 15" Late 2013 (IG)');

    expect(
      computeCommonName([
        'MacBook Pro "Core 2 Duo" 2.4 15" (Unibody)',
        'MacBook Pro "Core 2 Duo" 2.53 15" (Unibody)',
        'MacBook Pro "Core 2 Duo" 2.8 15" (Unibody)',
      ])
    ).toEqual('MacBook Pro "Core 2 Duo" 2.4/2.53/2.8 15" (Unibody)');

    expect(
      computeCommonName([
        'MacBook "Core 2 Duo" 2.1 13" (White-08)',
        'MacBook "Core 2 Duo" 2.4 13" (White-08)',
        'MacBook "Core 2 Duo" 2.4 13" (Black-08)',
      ])
    ).toEqual('MacBook "Core 2 Duo" 2.1/2.4 13" (White/Black 08)');

    expect(
      computeCommonName([
        'MacBook Pro "Core 2 Duo" 2.2 15" (SR)',
        'MacBook Pro "Core 2 Duo" 2.4 15" (SR)',
        'MacBook Pro "Core 2 Duo" 2.6 15" (SR)',
        'MacBook Pro "Core 2 Duo" 2.4 17" (SR)',
        'MacBook Pro "Core 2 Duo" 2.6 17" (SR)',
      ])
    ).toEqual('MacBook Pro "Core 2 Duo" 2.2/2.4/2.6 15"/17" (SR)');

    expect(
      computeCommonName([
        'Mac Pro "Quad Core" 2.8 (2010/Nehalem)',
        'Mac Pro "Quad Core" 3.2 (2010/Nehalem)',
        'Mac Pro "Six Core" 3.33 (2010/Westmere)',
        'Mac Pro "Eight Core" 2.4 (2010/Westmere)',
        'Mac Pro "Twelve Core" 2.66 (2010/Westmere)',
        'Mac Pro "Twelve Core" 2.93 (2010/Westmere)',
        'Mac Pro "Quad Core" 2.8 (Server 2010)',
        'Mac Pro "Quad Core" 3.2 (Server 2010)',
        'Mac Pro "Six Core" 3.33 (Server 2010)',
        'Mac Pro "Eight Core" 2.4 (Server 2010)',
        'Mac Pro "Twelve Core" 2.66 (Server 2010)',
        'Mac Pro "Twelve Core" 2.93 (Server 2010)',
        'Mac Pro "Quad Core" 3.2 (2012/Nehalem)',
        'Mac Pro "Six Core" 3.33 (2012/Westmere)',
        'Mac Pro "Twelve Core" 2.4 (2012/Westmere)',
        'Mac Pro "Twelve Core" 2.66 (2012/Westmere)',
        'Mac Pro "Twelve Core" 3.06 (2012/Westmere)',
        'Mac Pro "Quad Core" 3.2 (Server 2012)',
        'Mac Pro "Six Core" 3.33 (Server 2012)',
        'Mac Pro "Twelve Core" 2.4 (Server 2012)',
        'Mac Pro "Twelve Core" 2.66 (Server 2012)',
        'Mac Pro "Twelve Core" 3.06 (Server 2012)',
      ])
    ).toEqual(
      'Mac Pro "Quad/Six/Eight/Twelve Core" 2.8/3.2/3.33/2.4/2.66/2.93/3.06 (2010/2012)'
    );

    expect(
      computeCommonName([
        'iMac Pro "8-Core" 3.2 27-Inch (5K, Late 2017)',
        'iMac Pro "10-Core" 3.0 27-Inch (5K, Late 2017)',
        'iMac Pro "14-Core" 2.5 27-Inch (5K, Late 2017)',
        'iMac Pro "18-Core" 2.3 27-Inch (5K, Late 2017)',
      ])
    ).toEqual(
      'iMac Pro "8/10/14/18 Core" 3.2/3.0/2.5/2.3 27 Inch (5K, Late 2017)'
    );
  });
});
