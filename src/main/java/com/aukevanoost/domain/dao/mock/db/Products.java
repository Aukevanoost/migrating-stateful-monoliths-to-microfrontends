
package com.aukevanoost.domain.dao.mock.db;

import com.aukevanoost.domain.entities.*;

import java.util.List;
import java.util.Map;
import java.util.function.IntFunction;
import java.util.stream.Stream;

public class Products {

    public static Map<String, Product> ALL = Map.ofEntries(
        Map.entry("AU-01", new Product(
            "TerraFirma AutoCultivator T-300",
            "AU-01",
            List.of(
                new ProductVariant(
                    "Silver",
                    "/img/product/[size]/AU-01-SI.webp",
                    "AU-01-SI",
                    "#C0C0C0",
                    1000
                )
            )
        )),
        Map.entry("AU-02", new Product(
            "SmartFarm Titan",
            "AU-02",
            List.of(
                new ProductVariant(
                    "Sunset Copper",
                    "/img/product/[size]/AU-02-OG.webp",
                    "AU-02-OG",
                    "#dd5219",
                    4100
                ),
                new ProductVariant(
                    "Cosmic Sapphire",
                    "/img/product/[size]/AU-02-BL.webp",
                    "AU-02-BL",
                    "#2A52BE",
                    4000
                ),
                new ProductVariant(
                    "Verdant Shadow",
                    "/img/product/[size]/AU-02-GG.webp",
                    "AU-02-GG",
                    "#005A04",
                    4000
                )
            )
        )),
        Map.entry("AU-03", new Product(
            "FutureHarvest Navigator",
            "AU-03",
            List.of(
                new ProductVariant(
                    "Turquoise Titan",
                    "/img/product/[size]/AU-03-TQ.webp",
                    "AU-03-TQ",
                    "#169fb8",
                    1600
                ),
                new ProductVariant(
                    "Majestic Violet",
                    "/img/product/[size]/AU-03-PL.webp",
                    "AU-03-PL",
                    "#9B5FC0",
                    1700
                ),
                new ProductVariant(
                    "Scarlet Dynamo",
                    "/img/product/[size]/AU-03-RD.webp",
                    "AU-03-RD",
                    "#FF2400",
                    1900
                ),
                new ProductVariant(
                    "Sunbeam Yellow",
                    "/img/product/[size]/AU-03-YE.webp",
                    "AU-03-YE",
                    "#faad00",
                    1800
                )
            )
        )),
        Map.entry("AU-04", new Product(
            "Sapphire Sunworker 460R",
            "AU-04",
            List.of(
                new ProductVariant(
                    "Ruby Red",
                    "/img/product/[size]/AU-04-RD.webp",
                    "AU-04-RD",
                    "#9B111E",
                    8700
                ),
                new ProductVariant(
                    "Midnight Onyx",
                    "/img/product/[size]/AU-04-BK.webp",
                    "AU-04-BK",
                    "#353839",
                    8500
                )
            )
        )),
        Map.entry("AU-05", new Product(
            "EcoGrow Crop Commander",
            "AU-05",
            List.of(
                new ProductVariant(
                    "Zestful Horizon",
                    "/img/product/[size]/AU-05-ZH.webp",
                    "AU-05-ZH",
                    "#FFA07A",
                    3400
                )
            )
        )),
        Map.entry("AU-06", new Product(
            "FarmFleet Sovereign",
            "AU-06",
            List.of(
                new ProductVariant(
                    "Canary Zenith",
                    "/img/product/[size]/AU-06-CZ.webp",
                    "AU-06-CZ",
                    "#FFD700",
                    2200
                ),
                new ProductVariant(
                    "Minted Jade",
                    "/img/product/[size]/AU-06-MT.webp",
                    "AU-06-MT",
                    "#628882",
                    2100
                )
            )
        )),
        Map.entry("AU-07", new Product(
            "Verde Voyager",
            "AU-07",
            List.of(
                new ProductVariant(
                    "Glacial Mint",
                    "/img/product/[size]/AU-07-MT.webp",
                    "AU-07-MT",
                    "#AFDBD2",
                    4000
                ),
                new ProductVariant(
                    "Sunbeam Yellow",
                    "/img/product/[size]/AU-07-YE.webp",
                    "AU-07-YE",
                    "#FFDA03",
                    5000
                )
            )
        )),
        Map.entry("AU-08", new Product(
            "Field Pioneer",
            "AU-08",
            List.of(
                new ProductVariant(
                    "Polar White",
                    "/img/product/[size]/AU-08-WH.webp",
                    "AU-08-WH",
                    "#E8E8E8",
                    4500
                )
            )
        )),
        Map.entry("CL-01", new Product(
            "Heritage Workhorse",
            "CL-01",
            List.of(
                new ProductVariant(
                    "Verdant Field",
                    "/img/product/[size]/CL-01-GR.webp",
                    "CL-01-GR",
                    "#6B8E23",
                    5700
                ),
                new ProductVariant(
                    "Stormy Sky",
                    "/img/product/[size]/CL-01-GY.webp",
                    "CL-01-GY",
                    "#708090",
                    6200
                )
            )
        )),
        Map.entry("CL-02", new Product(
            "Falcon Crest Farm",
            "CL-02",
            List.of(
                new ProductVariant(
                    "Cerulean Classic",
                    "/img/product/[size]/CL-02-BL.webp",
                    "CL-02-BL",
                    "#007BA7",
                    2600
                )
            )
        )),
        Map.entry("CL-03", new Product(
            "Falcon Crest Work",
            "CL-03",
            List.of(
                new ProductVariant(
                    "Meadow Green",
                    "/img/product/[size]/CL-03-GR.webp",
                    "CL-03-GR",
                    "#7CFC00",
                    2300
                ),
                new ProductVariant(
                    "Rustic Rose",
                    "/img/product/[size]/CL-03-PI.webp",
                    "CL-03-PI",
                    "#b50018",
                    2300
                ),
                new ProductVariant(
                    "Harvest Gold",
                    "/img/product/[size]/CL-03-YE.webp",
                    "CL-03-YE",
                    "#DA9100",
                    2300
                )
            )
        )),
        Map.entry("CL-04", new Product(
            "Broadfield Majestic",
            "CL-04",
            List.of(
                new ProductVariant(
                    "Oceanic Blue",
                    "/img/product/[size]/CL-04-BL.webp",
                    "CL-04-BL",
                    "#0040a6",
                    2200
                ),
                new ProductVariant(
                    "Rustic Crimson",
                    "/img/product/[size]/CL-04-RD.webp",
                    "CL-04-RD",
                    "#7B3F00",
                    2200
                ),
                new ProductVariant(
                    "Aqua Green",
                    "/img/product/[size]/CL-04-TQ.webp",
                    "CL-04-TQ",
                    "#00b298",
                    2200
                )
            )
        )),
        Map.entry("CL-05", new Product(
            "Countryside Commander",
            "CL-05",
            List.of(
                new ProductVariant(
                    "Pacific Teal",
                    "/img/product/[size]/CL-05-PT.webp",
                    "CL-05-PT",
                    "#479da8",
                    2700
                ),
                new ProductVariant(
                    "Barn Red",
                    "/img/product/[size]/CL-05-RD.webp",
                    "CL-05-RD",
                    "#7C0A02",
                    2700
                )
            )
        )),
        Map.entry("CL-06", new Product(
            "Danamark Steadfast",
            "CL-06",
            List.of(
                new ProductVariant(
                    "Emerald Forest",
                    "/img/product/[size]/CL-06-MT.webp",
                    "CL-06-MT",
                    "#46f5bb",
                    2800
                ),
                new ProductVariant(
                    "Golden Wheat",
                    "/img/product/[size]/CL-06-YE.webp",
                    "CL-06-YE",
                    "#faaf3f",
                    2800
                )
            )
        )),
        Map.entry("CL-07", new Product(
            "Greenland Rover",
            "CL-07",
            List.of(
                new ProductVariant(
                    "Forest Fern",
                    "/img/product/[size]/CL-07-GR.webp",
                    "CL-07-GR",
                    "#2ea250",
                    2900
                ),
                new ProductVariant(
                    "Autumn Amber",
                    "/img/product/[size]/CL-07-YE.webp",
                    "CL-07-YE",
                    "#FFBF00",
                    2900
                )
            )
        )),
        Map.entry("CL-08", new Product(
            "Holland Hamster",
            "CL-08",
            List.of(
                new ProductVariant(
                    "Polder Green",
                    "/img/product/[size]/CL-08-GR.webp",
                    "CL-08-GR",
                    "#C2B280",
                    7750
                ),
                new ProductVariant(
                    "Tulip Magenta",
                    "/img/product/[size]/CL-08-PI.webp",
                    "CL-08-PI",
                    "#D65282",
                    7900
                )
            )
        )),
        Map.entry("CL-09", new Product(
            "TerraFirma Veneto",
            "CL-09",
            List.of(
                new ProductVariant(
                    "Adriatic Blue",
                    "/img/product/[size]/CL-09-BL.webp",
                    "CL-09-BL",
                    "#2f6ea3",
                    2950
                ),
                new ProductVariant(
                    "Tuscan Green",
                    "/img/product/[size]/CL-09-GR.webp",
                    "CL-09-GR",
                    "#518b2b",
                    2950
                )
            )
        )),
        Map.entry("CL-10", new Product(
            "Global Gallant",
            "CL-10",
            List.of(
                new ProductVariant(
                    "Sahara Dawn",
                    "/img/product/[size]/CL-10-SD.webp",
                    "CL-10-SD",
                    "#b8a875",
                    2600
                ),
                new ProductVariant(
                    "Violet Vintage",
                    "/img/product/[size]/CL-10-VI.webp",
                    "CL-10-VI",
                    "#8A2BE2",
                    2600
                )
            )
        )),
        Map.entry("CL-11", new Product(
            "Scandinavia Sower",
            "CL-11",
            List.of(
                new ProductVariant(
                    "Baltic Blue",
                    "/img/product/[size]/CL-11-SK.webp",
                    "CL-11-SK",
                    "#95c1f4",
                    3100
                ),
                new ProductVariant(
                    "Nordic Gold",
                    "/img/product/[size]/CL-11-YE.webp",
                    "CL-11-YE",
                    "#FFD700",
                    3100
                )
            )
        )),
        Map.entry("CL-12", new Product(
            "Celerity Cruiser",
            "CL-12",
            List.of(
                new ProductVariant(
                    "Velocity Blue",
                    "/img/product/[size]/CL-12-BL.webp",
                    "CL-12-BL",
                    "#1E90FF",
                    3200
                ),
                new ProductVariant(
                    "Rally Red",
                    "/img/product/[size]/CL-12-RD.webp",
                    "CL-12-RD",
                    "#ED2939",
                    3200
                )
            )
        )),
        Map.entry("CL-13", new Product(
            "Rapid Racer",
            "CL-13",
            List.of(
                new ProductVariant(
                    "Speedway Blue",
                    "/img/product/[size]/CL-13-BL.webp",
                    "CL-13-BL",
                    "#2679a6",
                    7500
                ),
                new ProductVariant(
                    "Raceway Red",
                    "/img/product/[size]/CL-13-RD.webp",
                    "CL-13-RD",
                    "#CF1020",
                    7500
                )
            )
        )),
        Map.entry("CL-14", new Product(
            "Caribbean Cruiser",
            "CL-14",
            List.of(
                new ProductVariant(
                    "Emerald Grove",
                    "/img/product/[size]/CL-14-GR.webp",
                    "CL-14-GR",
                    "#57ae13",
                    2300
                ),
                new ProductVariant(
                    "Ruby Fields",
                    "/img/product/[size]/CL-14-RD.webp",
                    "CL-14-RD",
                    "#cd2b1e",
                    2300
                )
            )
        )),
        Map.entry("CL-15", new Product(
            "Fieldmaster Classic",
            "CL-15",
            List.of(
                new ProductVariant(
                    "Vintage Pink",
                    "/img/product/[size]/CL-15-PI.webp",
                    "CL-15-PI",
                    "#e1949e",
                    6200
                ),
                new ProductVariant(
                    "Sahara Dust",
                    "/img/product/[size]/CL-15-SD.webp",
                    "CL-15-SD",
                    "#dec78c",
                    6200
                )
            )
        ))
    );

    public static List<Product> get(String... ids) {
        return Stream.of(ids)
            .map(ALL::get)
            .toList();
    }

    public static Product get(String sku) {
        return ALL.get(sku);
    }

    public static IntFunction<Product> getByID(String tractorClass) {
        return id -> get(String.format("%s-%02d", tractorClass, id));
    }
}