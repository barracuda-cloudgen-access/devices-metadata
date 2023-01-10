/**
 * Copyright (c) Fyde, Inc.
 * All rights reserved.
 */

import { getDeviceDataFromIdentifier } from "..";
import { DESKTOP, LAPTOP, MOBILE, SERVER, TABLET } from "../categories";

function testCategory(brand: string, category: string, devices: string[]) {
  it.each(devices)("handles %s", (device) => {
    const data = getDeviceDataFromIdentifier(device);
    expect(data).not.toEqual(null);
    expect(data).toHaveProperty("brand", brand);
    expect(data).toHaveProperty("category", category);
    expect(data).toHaveProperty("name");
    expect(data?.name).toMatch(/^.+$/);
  });
}

describe("#getDeviceDataFromIdentifier", () => {
  describe("apple", () => {
    it("returns the device data", () => {
      expect(getDeviceDataFromIdentifier("iPhone10,3")).toEqual({
        name: "iPhone X (Global)",
        category: "mobile",
        brand: "Apple",
      });
    });

    it("handles unknown devices", () => {
      expect(getDeviceDataFromIdentifier("iPhone10,3000")).toEqual({
        name: "iPhone (Unknown: 'iPhone10,3000')",
        category: "mobile",
        brand: "Apple",
        unknown: true,
      });
    });

    describe("AppleTV", () => {
      testCategory("Apple", "tv", [
        "AppleTV2,1",
        "AppleTV3,1",
        "AppleTV3,2",
        "AppleTV5,3",
        "AppleTV6,2",
      ]);
    });

    describe("HomePod", () => {
      testCategory("Apple", "speaker", [
        "AudioAccessory1,1",
        "AudioAccessory1,2",
        "AudioAccessory5,1",
      ]);
    });

    describe("Music Players", () => {
      testCategory("Apple", "music_player", [
        "iPod1,1",
        "iPod2,1",
        "iPod3,1",
        "iPod4,1",
        "iPod5,1",
        "iPod7,1",
        "iPod9,1",
      ]);
    });

    describe("Watches", () => {
      testCategory("Apple", "watch", [
        "Watch1,1",
        "Watch1,2",
        "Watch2,3",
        "Watch2,4",
        "Watch2,6",
        "Watch2,7",
        "Watch3,1",
        "Watch3,2",
        "Watch3,3",
        "Watch3,4",
        "Watch4,1",
        "Watch4,2",
        "Watch4,3",
        "Watch4,4",
        "Watch5,1",
        "Watch5,2",
        "Watch5,3",
        "Watch5,4",
      ]);
    });

    describe("Desktops", () => {
      testCategory("Apple", DESKTOP, [
        "Mac13,1",
        "Mac13,2",
        "Mac14,2",
        "Mac14,7",
        "MacPro1,1",
        "MacPro2,1",
        "MacPro3,1",
        "MacPro4,1",
        "MacPro5,1",
        "MacPro6,1",
        "MacPro7,1",
        "Macmini1,1",
        "Macmini2,1",
        "Macmini3,1",
        "Macmini4,1",
        "Macmini5,1",
        "Macmini5,2",
        "Macmini5,3",
        "Macmini6,1",
        "Macmini6,2",
        "Macmini7,1",
        "Macmini8,1",
        "Macmini9,1",
        "PowerMac1,1",
        "PowerMac1,2",
        "PowerMac10,1",
        "PowerMac10,2",
        "PowerMac11,2",
        "PowerMac12,1",
        "PowerMac2,1",
        "PowerMac2,2",
        "PowerMac3,1",
        "PowerMac3,3",
        "PowerMac3,4",
        "PowerMac3,5",
        "PowerMac3,6",
        "PowerMac4,1",
        "PowerMac4,2",
        "PowerMac4,4",
        "PowerMac4,5",
        "PowerMac5,1",
        "PowerMac6,1",
        "PowerMac6,3",
        "PowerMac6,4",
        "PowerMac7,2",
        "PowerMac7,3",
        "PowerMac8,1",
        "PowerMac8,2",
        "PowerMac9,1",
        "iMac,1",
        "iMac10,1",
        "iMac11,1",
        "iMac11,2",
        "iMac11,3",
        "iMac12,1",
        "iMac12,2",
        "iMac13,1",
        "iMac13,2",
        "iMac14,1",
        "iMac14,2",
        "iMac14,3",
        "iMac14,4",
        "iMac15,1",
        "iMac16,1",
        "iMac16,2",
        "iMac17,1",
        "iMac18,1",
        "iMac18,2",
        "iMac18,3",
        "iMac19,1",
        "iMac19,2",
        "iMac20,1",
        "iMac20,2",
        "iMac21,1",
        "iMac21,2",
        "iMac4,1",
        "iMac4,2",
        "iMac5,1",
        "iMac5,2",
        "iMac6,1",
        "iMac7,1",
        "iMac8,1",
        "iMac9,1",
        "iMacPro1,1",
      ]);
    });

    describe("Laptops", () => {
      testCategory("Apple", LAPTOP, [
        "MacBook1,1",
        "MacBook10,1",
        "MacBook2,1",
        "MacBook3,1",
        "MacBook4,1",
        "MacBook5,1",
        "MacBook5,2",
        "MacBook6,1",
        "MacBook7,1",
        "MacBook8,1",
        "MacBook9,1",
        "MacBookAir1,1",
        "MacBookAir10,1",
        "MacBookAir2,1",
        "MacBookAir3,1",
        "MacBookAir3,2",
        "MacBookAir4,1",
        "MacBookAir4,2",
        "MacBookAir5,1",
        "MacBookAir5,2",
        "MacBookAir6,1",
        "MacBookAir6,2",
        "MacBookAir7,1",
        "MacBookAir7,2",
        "MacBookAir8,1",
        "MacBookAir8,2",
        "MacBookAir9,1",
        "MacBookPro1,1",
        "MacBookPro1,2",
        "MacBookPro10,1",
        "MacBookPro10,2",
        "MacBookPro11,1",
        "MacBookPro11,2",
        "MacBookPro11,3",
        "MacBookPro11,4",
        "MacBookPro11,5",
        "MacBookPro12,1",
        "MacBookPro13,1",
        "MacBookPro13,2",
        "MacBookPro13,3",
        "MacBookPro14,1",
        "MacBookPro14,2",
        "MacBookPro14,3",
        "MacBookPro15,1",
        "MacBookPro15,2",
        "MacBookPro15,3",
        "MacBookPro15,4",
        "MacBookPro16,1",
        "MacBookPro16,2",
        "MacBookPro16,3",
        "MacBookPro16,4",
        "MacBookPro17,1",
        "MacBookPro18,1",
        "MacBookPro18,2",
        "MacBookPro18,3",
        "MacBookPro18,4",
        "MacBookPro2,1",
        "MacBookPro2,2",
        "MacBookPro3,1",
        "MacBookPro4,1",
        "MacBookPro5,1",
        "MacBookPro5,2",
        "MacBookPro5,3",
        "MacBookPro5,4",
        "MacBookPro5,5",
        "MacBookPro6,1",
        "MacBookPro6,2",
        "MacBookPro7,1",
        "MacBookPro8,1",
        "MacBookPro8,2",
        "MacBookPro8,3",
        "MacBookPro9,1",
        "MacBookPro9,2",
        "PowerBook1,1",
        "PowerBook2,1",
        "PowerBook2,2",
        "PowerBook3,1",
        "PowerBook3,2",
        "PowerBook3,3",
        "PowerBook3,4",
        "PowerBook3,5",
        "PowerBook4,1",
        "PowerBook4,2",
        "PowerBook4,3",
        "PowerBook5,1",
        "PowerBook5,2",
        "PowerBook5,3",
        "PowerBook5,4",
        "PowerBook5,5",
        "PowerBook5,6",
        "PowerBook5,7",
        "PowerBook5,8",
        "PowerBook5,9",
        "PowerBook6,1",
        "PowerBook6,2",
        "PowerBook6,3",
        "PowerBook6,4",
        "PowerBook6,5",
        "PowerBook6,7",
        "PowerBook6,8",
      ]);

      describe("Tablets", () => {
        testCategory("Apple", TABLET, [
          "iPad1,1",
          "iPad11,1",
          "iPad11,2",
          "iPad11,3",
          "iPad11,4",
          "iPad11,6",
          "iPad11,7",
          "iPad12,1",
          "iPad12,2",
          "iPad13,1",
          "iPad13,10",
          "iPad13,11",
          "iPad13,16",
          "iPad13,17",
          "iPad13,18",
          "iPad13,19",
          "iPad13,2",
          "iPad13,4",
          "iPad13,5",
          "iPad13,6",
          "iPad13,7",
          "iPad13,8",
          "iPad13,9",
          "iPad14,1",
          "iPad14,2",
          "iPad14,3",
          "iPad14,4",
          "iPad14,5",
          "iPad14,6",
          "iPad2,1",
          "iPad2,2",
          "iPad2,3",
          "iPad2,4",
          "iPad2,5",
          "iPad2,6",
          "iPad2,7",
          "iPad3,1",
          "iPad3,2",
          "iPad3,3",
          "iPad3,4",
          "iPad3,5",
          "iPad3,6",
          "iPad4,1",
          "iPad4,2",
          "iPad4,3",
          "iPad4,4",
          "iPad4,5",
          "iPad4,6",
          "iPad4,7",
          "iPad4,8",
          "iPad4,9",
          "iPad5,1",
          "iPad5,2",
          "iPad5,3",
          "iPad5,4",
          "iPad6,11",
          "iPad6,12",
          "iPad6,3",
          "iPad6,4",
          "iPad6,7",
          "iPad6,8",
          "iPad7,1",
          "iPad7,11",
          "iPad7,12",
          "iPad7,2",
          "iPad7,3",
          "iPad7,4",
          "iPad7,5",
          "iPad7,6",
          "iPad8,1",
          "iPad8,10",
          "iPad8,11",
          "iPad8,12",
          "iPad8,2",
          "iPad8,3",
          "iPad8,4",
          "iPad8,5",
          "iPad8,6",
          "iPad8,7",
          "iPad8,8",
          "iPad8,9",
        ]);
      });

      describe("Mobiles", () => {
        testCategory("Apple", MOBILE, [
          "iPhone1,1",
          "iPhone1,2",
          "iPhone10,1",
          "iPhone10,2",
          "iPhone10,3",
          "iPhone10,4",
          "iPhone10,5",
          "iPhone10,6",
          "iPhone11,2",
          "iPhone11,4",
          "iPhone11,6",
          "iPhone11,8",
          "iPhone12,1",
          "iPhone12,3",
          "iPhone12,5",
          "iPhone12,8",
          "iPhone13,1",
          "iPhone13,2",
          "iPhone13,3",
          "iPhone13,4",
          "iPhone14,2",
          "iPhone14,3",
          "iPhone14,4",
          "iPhone14,5",
          "iPhone14,6",
          "iPhone14,7",
          "iPhone14,8",
          "iPhone15,2",
          "iPhone15,3",
          "iPhone2,1",
          "iPhone3,1",
          "iPhone3,2",
          "iPhone3,3",
          "iPhone4,1",
          "iPhone5,1",
          "iPhone5,2",
          "iPhone5,3",
          "iPhone5,4",
          "iPhone6,1",
          "iPhone6,2",
          "iPhone7,1",
          "iPhone7,2",
          "iPhone8,1",
          "iPhone8,2",
          "iPhone8,4",
          "iPhone9,1",
          "iPhone9,2",
          "iPhone9,3",
          "iPhone9,4",
        ]);
      });

      describe("Servers", () => {
        testCategory("Apple", SERVER, [
          "RackMac1,1",
          "RackMac1,2",
          "RackMac3,1",
          "Xserve1,1",
          "Xserve2,1",
          "Xserve3,1",
        ]);
      });
    });
  });
  describe("Dell", () => {
    describe("Latitude", () => {
      testCategory("Dell", LAPTOP, [
        "Latitude 3301",
        "Latitude 3320",
        "Latitude 3390 2-in-1",
        "Latitude 3400",
        "Latitude 3420",
        "Latitude 3430",
        "Latitude 3450",
        "Latitude 3480",
        "Latitude 3500",
        "Latitude 3510",
        "Latitude 3520",
        "Latitude 3550",
        "Latitude 5300 2-in-1",
        "Latitude 5310 2-in-1",
        "Latitude 5320",
        "Latitude 5330",
        "Latitude 5400",
        "Latitude 5410",
        "Latitude 5420",
        "Latitude 5480",
        "Latitude 5490",
        "Latitude 5500",
        "Latitude 5510",
        "Latitude 5520",
        "Latitude 5580",
        "Latitude 5590",
        "Latitude 5591",
        "Latitude 7210 2-in-1",
        "Latitude 7300",
        "Latitude 7320",
        "Latitude 7390",
        "Latitude 7390 2-in-1",
        "Latitude 7400",
        "Latitude 7410",
        "Latitude 7420",
        "Latitude 7430",
        "Latitude 7480",
        "Latitude 7490",
        "Latitude 7520",
        "Latitude 9420",
        "Latitude 9510",
        "Latitude 9520",
        "Latitude E5440",
        "Latitude E5450",
        "Latitude E5470",
        "Latitude E5520",
        "Latitude E5530 non-vPro",
        "Latitude E5570",
        "Latitude E6420",
        "Latitude E6430",
        "Latitude E7440",
        "Latitude E7450",
        "Latitude E7470",
      ]);
    });

    describe("XPS", () => {
      testCategory("Dell", LAPTOP, [
        "XPS 13 7390",
        "XPS 13 9305",
        "XPS 13 9310",
        "XPS 13 9350",
        "XPS 13 9360",
        "XPS 15 7590",
        "XPS 15 9500",
        "XPS 15 9510",
        "XPS 15 9520",
        "XPS 15 9560",
        "XPS 15 9570",
        "XPS 15 9575",
        "XPS 8700",
        "XPS 8920",
        "XPS 8930",
      ]);
    });

    describe("Precision", () => {
      testCategory("Dell", LAPTOP, [
        "Precision 3530",
        "Precision 3560",
        "Precision 3561",
        "Precision 3570",
        "Precision 3660",
        "Precision 5540",
        "Precision 5560",
        "Precision 7530",
        "Precision 7540",
        "Precision 7560",
        "Precision 3630 Tower",
        "Precision 5820 Tower",
        "Precision 7820 Tower",
      ]);
    });

    describe("Vostro", () => {
      testCategory("Dell", LAPTOP, [
        "Vostro 15 5510",
        "Vostro 3400",
        "Vostro 3401",
        "Vostro 3590",
      ]);
    });

    describe("Inspiron", () => {
      testCategory("Dell", LAPTOP, [
        "Inspiron 13 5378",
        "Inspiron 15 5510",
        "Inspiron 3501",
        "Inspiron 3585",
        "Inspiron 5593",
        "Inspiron 7306 2n1",
        "Inspiron 7375",
        "Inspiron 7506 2n1",
      ]);
    });

    describe("OptiPlex", () => {
      testCategory("Dell", DESKTOP, [
        "OptiPlex 3040",
        "OptiPlex 3046",
        "OptiPlex 3050",
        "OptiPlex 3060",
        "OptiPlex 3070",
        "OptiPlex 3080",
        "OptiPlex 390",
        "OptiPlex 5050",
        "OptiPlex 5070",
        "OptiPlex 5090",
        "OptiPlex 7040",
        "OptiPlex 7050",
        "OptiPlex 7060",
        "OptiPlex 7070",
        "OptiPlex 7080",
        "OptiPlex 7090",
        "OptiPlex 760",
        "OptiPlex 7770 AIO",
        "OptiPlex 780",
        "OptiPlex 9010 AIO",
        "OptiPlex 9020M",
      ]);
    });
  });
  describe("HP", () => {
    testCategory("HP", LAPTOP, [
      "HP 250 G6 Notebook PC",
      "HP 250 G7 Notebook PC",
      "HP 250 G8 Notebook PC",
      "HP 255 G7 Notebook PC",
      "HP 255 G8 Notebook PC",
      "HP 470 G7 Notebook PC",
      "HP Compaq 8100 Elite SFF PC",
      "HP Compaq 8200 Elite SFF PC",
      "HP ENVY 15 x360 PC",
      "HP Elite x360 1040 14 inch G9 2-in-1 Notebook PC",
      "HP EliteBook 630 13 inch G9 Notebook PC",
      "HP EliteBook 745 G6",
      "HP EliteBook 830 G6",
      "HP EliteBook 830 G8 Notebook PC",
      "HP EliteBook 840 G4",
      "HP EliteBook 840 G5",
      "HP EliteBook 840 G6",
      "HP EliteBook 840 G7 Notebook PC",
      "HP EliteBook 845 G8 Notebook PC",
      "HP EliteBook 850 G6",
      "HP EliteBook 850 G7 Notebook PC",
      "HP EliteBook 850 G8 Notebook PC",
      "HP EliteBook 855 G7 Notebook PC",
      "HP EliteBook 8560p",
      "HP EliteBook 8570p",
      "HP EliteBook Folio 1040 G3",
      "HP EliteBook Folio 9480m",
      "HP EliteBook x360 830 G8 Notebook PC",
      "HP EliteDesk 800 G3 SFF",
      "HP Envy Curved All-in-One 34-b110",
      "HP Laptop 14-dk1xxx",
      "HP Laptop 14-dq1xxx",
      "HP Laptop 14-dq2xxx",
      "HP Laptop 14-fq0xxx",
      "HP Laptop 14-fq1xxx",
      "HP Laptop 15-da0xxx",
      "HP Laptop 15-db1xxx",
      "HP Laptop 15-dw3xxx",
      "HP Laptop 15-dy1xxx",
      "HP Laptop 15-dy2xxx",
      "HP Laptop 15-ef1xxx",
      "HP Laptop 15-ef2xxx",
      "HP Notebook",
      "HP Pavilion Gaming Laptop 15-ec1xxx",
      "HP Pavilion Gaming Laptop 16-a0xxx",
      "HP Pavilion Laptop 15-cc0xx",
      "HP Pavilion Laptop 15-eg2xxx",
      "HP ProBook 430 G5",
      "HP ProBook 430 G8 Notebook PC",
      "HP ProBook 440 14 inch G9 Notebook PC",
      "HP ProBook 440 G4",
      "HP ProBook 440 G5",
      "HP ProBook 440 G6",
      "HP ProBook 440 G7",
      "HP ProBook 440 G8",
      "HP ProBook 440 G8 Notebook PC",
      "HP ProBook 445R G6",
      "HP ProBook 450 15.6 inch G9 Notebook PC",
      "HP ProBook 450 G3",
      "HP ProBook 450 G4",
      "HP ProBook 450 G5",
      "HP ProBook 450 G6",
      "HP ProBook 450 G7",
      "HP ProBook 450 G8 Notebook PC",
      "HP ProBook 455 G7",
      "HP ProBook 455 G8 Notebook PC",
      "HP ProBook 640 G8 Notebook PC",
      "HP ProBook 650 G1",
      "HP ProBook 650 G2",
      "HP ProBook 650 G8 Notebook PC",
      "HP ProBook 650 G8 ZBook",
      "HP ProBook x360 435 G8 Notebook PC",
      "HP ProDesk 400 G4 DM (TAA)",
      "HP ProDesk 400 G4 MT",
      "HP ProDesk 400 G4 SFF",
      "HP ProDesk 400 G5 Desktop Mini",
      "HP ProDesk 400 G6 SFF",
      "HP ProDesk 400 G7 Small Form Factor PC",
      "HP ProDesk 600 G6 Desktop Mini PC",
      "HP Spectre x360 Convertible",
      "HP Z2 G8 Tower Workstation Desktop PC",
      "HP Z2 SFF G9 Workstation Desktop PC",
      "HP Z230 Tower Workstation",
      "HP Z240 Tower Workstation",
      "HP ZBook 14u G6",
      "HP ZBook 15 G4",
      "HP ZBook 15 G6",
      "HP ZBook 15u G2",
      "HP ZBook 15u G3",
      "HP ZBook 15u G4",
      "HP ZBook 15u G6",
      "HP ZBook 17 G6",
      "HP ZBook Firefly 14 G7 Mobile Workstation",
      "HP ZBook Firefly 14 inch G8 Mobile Workstation PC",
      "HP ZBook Firefly 15 G7 Mobile Workstation",
      "HP ZBook Firefly 15 inch G8 Mobile Workstation PC",
      "HP ZBook Firefly 15.6 inch G8 Mobile Workstation PC",
      "HP ZBook Fury 15 G7 Mobile Workstation",
      "HP ZBook Fury 15.6 inch G8 Mobile Workstation PC",
      "HP ZBook Power 15.6 inch G8 Mobile Workstation PC",
      "HP ZBook Power 15.6 inch G9 Mobile Workstation PC",
      "HP ZBook Studio 15.6 inch G8 Mobile Workstation PC",
      "HP ZBook Studio G7 Mobile Workstation",
    ]);
  });

  describe("Lenovo", () => {
    testCategory("Lenovo", LAPTOP, [
      "30CYS0YP00",
      "10AY0082CA",
      "10B4A1BWKR",
      "10MR000XGE",
      "10T700CNUS",
      "10YM0027SP",
      "11MY002QSP",
      "20A7002QUS",
      "20AMS31G03",
      "20AWS00E00",
      "20BS0031US",
      "20BS0032US",
      "20BUS0YJ00",
      "20BWS08300",
      "20C6CTO1WW",
      "20DQ0039MH",
      "20EN004DGE",
      "20FB002RUS",
      "20FB004VUS",
      "20FQ0039US",
      "20FQ0040GE",
      "20GQ000JPB",
      "20GQ001NGE",
      "20GQ001NPB",
      "20GQ001TPB",
      "20H90018GE",
      "20HF003NMX",
      "20HHCTO1WW",
      "20HR000FUS",
      "20J60016MZ",
      "20J60018FR",
      "20K4001XUS",
      "20K40021US",
      "20KH002DUS",
      "20KH002SUS",
      "20L50011US",
      "20L7001LMX",
      "20L7001PPB",
      "20L7005PGE",
      "20L8S2ME1F",
      "20L90026GE",
      "20M5CTO1WW",
      "20M7001BPB",
      "20M7001HGE",
      "20M7CTO1WW",
      "20M90017GE",
      "20MF000QUS",
      "20N20032US",
      "20NB001HCA",
      "20NB001JUS",
      "20NKS3KY00",
      "20NT0015GE",
      "20NT0016PB",
      "20NX006PMX",
      "20QT002CMX",
      "20QVCTO1WW",
      "20R10010US",
      "20R3CTO1WW",
      "20R5A000US",
      "20R5CTO1WW",
      "20RD002RUS",
      "20S00018ZA",
      "20S00061US",
      "20S60018US",
      "20S7S1DQ00",
      "20ST0061MX",
      "20ST0064MX",
      "20T0002GUS",
      "20T00058MX",
      "20T4CTO1WW",
      "20T6002QCA",
      "20TA0025CA",
      "20TA002FUS",
      "20TA004MUS",
      "20TA004QCA",
      "20TD003KUS",
      "20TDS00B00",
      "20TH000XMX",
      "20TH003MUS",
      "20UB001DUS",
      "20UD000GUS",
      "20UD0010MX",
      "20UF0034US",
      "20VH0017PB",
      "20VH0018PB",
      "20VH0080PB",
      "20VK0013GE",
      "20W0003MUS",
      "20W0004CMX",
      "20W0008TUS",
      "20W000SUUS",
      "20W000T0US",
      "20W000T8US",
      "20W4002KUS",
      "20W400K1CA",
      "20W400K6US",
      "20W400S5US",
      "20W5S4U300",
      "20WLS2F605",
      "20WM0080US",
      "20WM009YMH",
      "20WM00B8MX",
      "20X5007CUS",
      "20XF004FUS",
      "20XK0015US",
      "20XK0069US",
      "20XLS1U100",
      "20Y10012US",
      "21A0003QUS",
      "21A7001GUS",
      "21CB000FUS",
      "21CB00BPMX",
      "30BHS1H600",
      "30BHS1T000",
      "30C5S18B00",
      "30CF0003US",
      "30DH00G0PB",
      "30DH00G1PB",
    ]);
  });

  describe("Google", () => {
    testCategory("Google", MOBILE, [
      "Pixel 5",
      "Pixel 5a",
      "Pixel 6",
      "Pixel 6 Pro",
      "Pixel 6a",
      "Pixel 7",
      "Pixel 7 Pro",
    ]);
  });

  describe("Samsung", () => {
    testCategory("Samsung", MOBILE, [
      "SM-A515U",
      "SM-F936U1",
      "SM-G990U",
      "SM-G991B",
      "SM-G998U",
      "SM-N975F",
      "SM-N986U",
      "SM-N986U1",
      "SM-S908U",
      "SM-T575",
    ]);
  });

  describe("Microsoft", () => {
    testCategory("Microsoft", TABLET, [
      "Surface Book",
      "Surface Book 2",
      "Surface Book 3",
      "Surface Pro",
      "Surface Pro 6",
      "Surface Pro 7",
      "Surface Pro 8",
    ]);

    testCategory("Microsoft", LAPTOP, [
      "Surface Laptop 3",
      "Surface Laptop 4",
      "Surface Laptop Go",
      "Surface Laptop Studio",
    ]);
  });

  describe("when identifier does not exist", () => {
    it("throws an exception", () => {
      expect(getDeviceDataFromIdentifier("unicorn")).toEqual(null);
    });
  });
});
