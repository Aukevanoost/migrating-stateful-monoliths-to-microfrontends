package com.aukevanoost.domain.dao.mock.db;

import com.aukevanoost.domain.entities.Category;
import com.aukevanoost.domain.entities.Product;
import com.aukevanoost.domain.entities.Teaser;

import java.util.List;

public class Products {
    public static List<Category> ALL = List.of(
        new Category(
            "classic",
            "Classics",
            List.of(
                new Product(
                    "Heritage Workhorse",
                    "CL-01",
                    "/img/product/[size]/CL-01-GR.webp",
                    5700,
                    "/product/CL-01"
                ),
                new Product(
                    "Falcon Crest Farm",
                    "CL-02",
                    "/img/product/[size]/CL-02-BL.webp",
                    2600,
                    "/product/CL-02"
                ),
                new Product(
                    "Falcon Crest Work",
                    "CL-03",
                    "/img/product/[size]/CL-03-GR.webp",
                    2300,
                    "/product/CL-03"
                ),
                new Product(
                    "Broadfield Majestic",
                    "CL-04",
                    "/img/product/[size]/CL-04-BL.webp",
                    2200,
                    "/product/CL-04"
                ),
                new Product(
                    "Countryside Commander",
                    "CL-05",
                    "/img/product/[size]/CL-05-PT.webp",
                    2700,
                    "/product/CL-05"
                ),
                new Product(
                    "Danamark Steadfast",
                    "CL-06",
                    "/img/product/[size]/CL-06-MT.webp",
                    2800,
                    "/product/CL-06"
                ),
                new Product(
                    "Greenland Rover",
                    "CL-07",
                    "/img/product/[size]/CL-07-GR.webp",
                    2900,
                    "/product/CL-07"
                ),
                new Product(
                    "Holland Hamster",
                    "CL-08",
                    "/img/product/[size]/CL-08-GR.webp",
                    7750,
                    "/product/CL-08"
                ),
                new Product(
                    "TerraFirma Veneto",
                    "CL-09",
                    "/img/product/[size]/CL-09-BL.webp",
                    2950,
                    "/product/CL-09"
                ),
                new Product(
                    "Global Gallant",
                    "CL-10",
                    "/img/product/[size]/CL-10-SD.webp",
                    2600,
                    "/product/CL-10"
                ),
                new Product(
                    "Scandinavia Sower",
                    "CL-11",
                    "/img/product/[size]/CL-11-SK.webp",
                    3100,
                    "/product/CL-11"
                ),
                new Product(
                    "Celerity Cruiser",
                    "CL-12",
                    "/img/product/[size]/CL-12-BL.webp",
                    3200,
                    "/product/CL-12"
                ),
                new Product(
                    "Rapid Racer",
                    "CL-13",
                    "/img/product/[size]/CL-13-BL.webp",
                    7500,
                    "/product/CL-13"
                ),
                new Product(
                    "Caribbean Cruiser",
                    "CL-14",
                    "/img/product/[size]/CL-14-GR.webp",
                    2300,
                    "/product/CL-14"
                ),
                new Product(
                    "Fieldmaster Classic",
                    "CL-15",
                    "/img/product/[size]/CL-15-PI.webp",
                    6200,
                    "/product/CL-15"
                )
            )
        ),
        new Category(
            "autonomous",
            "Autonomous",
            List.of(
                new Product(
                    "TerraFirma AutoCultivator T-300",
                    "AU-01",
                    "/img/product/[size]/AU-01-SI.webp",
                    1000,
                    "/product/AU-01"
                ),
                new Product(
                    "SmartFarm Titan",
                    "AU-02",
                    "/img/product/[size]/AU-02-OG.webp",
                    4000,
                    "/product/AU-02"
                ),
                new Product(
                    "FutureHarvest Navigator",
                    "AU-03",
                    "/img/product/[size]/AU-03-TQ.webp",
                    1600,
                    "/product/AU-03"
                ),
                new Product(
                    "Sapphire Sunworker 460R",
                    "AU-04",
                    "/img/product/[size]/AU-04-RD.webp",
                    8500,
                    "/product/AU-04"
                ),
                new Product(
                    "EcoGrow Crop Commander",
                    "AU-05",
                    "/img/product/[size]/AU-05-ZH.webp",
                    3400,
                    "/product/AU-05"
                ),
                new Product(
                    "FarmFleet Sovereign",
                    "AU-06",
                    "/img/product/[size]/AU-06-CZ.webp",
                    2100,
                    "/product/AU-06"
                ),
                new Product(
                    "Verde Voyager",
                    "AU-07",
                    "/img/product/[size]/AU-07-MT.webp",
                    4000,
                    "/product/AU-07"
                ),
                new Product(
                    "Field Pioneer",
                    "AU-08",
                    "/img/product/[size]/AU-08-WH.webp",
                    4500,
                    "/product/AU-08"
                )
            )
        )
    );
}