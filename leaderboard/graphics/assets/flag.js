const flag = [
    {
      "NAME": "Afghanistan",
      "2L": "AF",
      "3L": "AFG",
      "CODE": 4
    },
    {
      "NAME": "Albania",
      "2L": "AL",
      "3L": "ALB",
      "CODE": 8
    },
    {
      "NAME": "Algeria",
      "2L": "DZ",
      "3L": "DZA",
      "CODE": 12
    },
    {
      "NAME": "American Samoa",
      "2L": "AS",
      "3L": "ASM",
      "CODE": 16
    },
    {
      "NAME": "Andorra",
      "2L": "AD",
      "3L": "AND",
      "CODE": 20
    },
    {
      "NAME": "Angola",
      "2L": "AO",
      "3L": "AGO",
      "CODE": 24
    },
    {
      "NAME": "Anguilla",
      "2L": "AI",
      "3L": "AIA",
      "CODE": 660
    },
    {
      "NAME": "Antarctica",
      "2L": "AQ",
      "3L": "ATA",
      "CODE": 10
    },
    {
      "NAME": "Antigua and Barbuda",
      "2L": "AG",
      "3L": "ATG",
      "CODE": 28
    },
    {
      "NAME": "Argentina",
      "2L": "AR",
      "3L": "ARG",
      "CODE": 32
    },
    {
      "NAME": "Armenia",
      "2L": "AM",
      "3L": "ARM",
      "CODE": 51
    },
    {
      "NAME": "Aruba",
      "2L": "AW",
      "3L": "ABW",
      "CODE": 533
    },
    {
      "NAME": "Australia",
      "2L": "AU",
      "3L": "AUS",
      "CODE": 36
    },
    {
      "NAME": "Austria",
      "2L": "AT",
      "3L": "AUT",
      "CODE": 40
    },
    {
      "NAME": "Azerbaijan",
      "2L": "AZ",
      "3L": "AZE",
      "CODE": 31
    },
    {
      "NAME": "Bahamas (the)",
      "2L": "BS",
      "3L": "BHS",
      "CODE": 44
    },
    {
      "NAME": "Bahrain",
      "2L": "BH",
      "3L": "BHR",
      "CODE": 48
    },
    {
      "NAME": "Bangladesh",
      "2L": "BD",
      "3L": "BGD",
      "CODE": 50
    },
    {
      "NAME": "Barbados",
      "2L": "BB",
      "3L": "BRB",
      "CODE": 52
    },
    {
      "NAME": "Belarus",
      "2L": "BY",
      "3L": "BLR",
      "CODE": 112
    },
    {
      "NAME": "Belgium",
      "2L": "BE",
      "3L": "BEL",
      "CODE": 56
    },
    {
      "NAME": "Belize",
      "2L": "BZ",
      "3L": "BLZ",
      "CODE": 84
    },
    {
      "NAME": "Benin",
      "2L": "BJ",
      "3L": "BEN",
      "CODE": 204
    },
    {
      "NAME": "Bermuda",
      "2L": "BM",
      "3L": "BMU",
      "CODE": 60
    },
    {
      "NAME": "Bhutan",
      "2L": "BT",
      "3L": "BTN",
      "CODE": 64
    },
    {
      "NAME": "Bolivia (Plurinational State of)",
      "2L": "BO",
      "3L": "BOL",
      "CODE": 68
    },
    {
      "NAME": "Bonaire, Sint Eustatius and Saba",
      "2L": "BQ",
      "3L": "BES",
      "CODE": 535
    },
    {
      "NAME": "Bosnia and Herzegovina",
      "2L": "BA",
      "3L": "BIH",
      "CODE": 70
    },
    {
      "NAME": "Botswana",
      "2L": "BW",
      "3L": "BWA",
      "CODE": 72
    },
    {
      "NAME": "Bouvet Island",
      "2L": "BV",
      "3L": "BVT",
      "CODE": 74
    },
    {
      "NAME": "Brazil",
      "2L": "BR",
      "3L": "BRA",
      "CODE": 76
    },
    {
      "NAME": "British Indian Ocean Territory (the)",
      "2L": "IO",
      "3L": "IOT",
      "CODE": 86
    },
    {
      "NAME": "Brunei Darussalam",
      "2L": "BN",
      "3L": "BRN",
      "CODE": 96
    },
    {
      "NAME": "Bulgaria",
      "2L": "BG",
      "3L": "BGR",
      "CODE": 100
    },
    {
      "NAME": "Burkina Faso",
      "2L": "BF",
      "3L": "BFA",
      "CODE": 854
    },
    {
      "NAME": "Burundi",
      "2L": "BI",
      "3L": "BDI",
      "CODE": 108
    },
    {
      "NAME": "Cabo Verde",
      "2L": "CV",
      "3L": "CPV",
      "CODE": 132
    },
    {
      "NAME": "Cambodia",
      "2L": "KH",
      "3L": "KHM",
      "CODE": 116
    },
    {
      "NAME": "Cameroon",
      "2L": "CM",
      "3L": "CMR",
      "CODE": 120
    },
    {
      "NAME": "Canada",
      "2L": "CA",
      "3L": "CAN",
      "CODE": 124
    },
    {
      "NAME": "Cayman Islands (the)",
      "2L": "KY",
      "3L": "CYM",
      "CODE": 136
    },
    {
      "NAME": "Central African Republic (the)",
      "2L": "CF",
      "3L": "CAF",
      "CODE": 140
    },
    {
      "NAME": "Chad",
      "2L": "TD",
      "3L": "TCD",
      "CODE": 148
    },
    {
      "NAME": "Chile",
      "2L": "CL",
      "3L": "CHL",
      "CODE": 152
    },
    {
      "NAME": "China",
      "2L": "CN",
      "3L": "CHN",
      "CODE": 156
    },
    {
      "NAME": "Christmas Island",
      "2L": "CX",
      "3L": "CXR",
      "CODE": 162
    },
    {
      "NAME": "Cocos (Keeling) Islands (the)",
      "2L": "CC",
      "3L": "CCK",
      "CODE": 166
    },
    {
      "NAME": "Colombia",
      "2L": "CO",
      "3L": "COL",
      "CODE": 170
    },
    {
      "NAME": "Comoros (the)",
      "2L": "KM",
      "3L": "COM",
      "CODE": 174
    },
    {
      "NAME": "Congo (the Democratic Republic of the)",
      "2L": "CD",
      "3L": "COD",
      "CODE": 180
    },
    {
      "NAME": "Congo (the)",
      "2L": "CG",
      "3L": "COG",
      "CODE": 178
    },
    {
      "NAME": "Cook Islands (the)",
      "2L": "CK",
      "3L": "COK",
      "CODE": 184
    },
    {
      "NAME": "Costa Rica",
      "2L": "CR",
      "3L": "CRI",
      "CODE": 188
    },
    {
      "NAME": "Croatia",
      "2L": "HR",
      "3L": "HRV",
      "CODE": 191
    },
    {
      "NAME": "Cuba",
      "2L": "CU",
      "3L": "CUB",
      "CODE": 192
    },
    {
      "NAME": "Curaçao",
      "2L": "CW",
      "3L": "CUW",
      "CODE": 531
    },
    {
      "NAME": "Cyprus",
      "2L": "CY",
      "3L": "CYP",
      "CODE": 196
    },
    {
      "NAME": "Czechia",
      "2L": "CZ",
      "3L": "CZE",
      "CODE": 203
    },
    {
      "NAME": "Côte d'Ivoire",
      "2L": "CI",
      "3L": "CIV",
      "CODE": 384
    },
    {
      "NAME": "Denmark",
      "2L": "DK",
      "3L": "DNK",
      "CODE": 208
    },
    {
      "NAME": "Djibouti",
      "2L": "DJ",
      "3L": "DJI",
      "CODE": 262
    },
    {
      "NAME": "Dominica",
      "2L": "DM",
      "3L": "DMA",
      "CODE": 212
    },
    {
      "NAME": "Dominican Republic (the)",
      "2L": "DO",
      "3L": "DOM",
      "CODE": 214
    },
    {
      "NAME": "Ecuador",
      "2L": "EC",
      "3L": "ECU",
      "CODE": 218
    },
    {
      "NAME": "Egypt",
      "2L": "EG",
      "3L": "EGY",
      "CODE": 818
    },
    {
      "NAME": "El Salvador",
      "2L": "SV",
      "3L": "SLV",
      "CODE": 222
    },
    {
      "NAME": "Equatorial Guinea",
      "2L": "GQ",
      "3L": "GNQ",
      "CODE": 226
    },
    {
      "NAME": "Eritrea",
      "2L": "ER",
      "3L": "ERI",
      "CODE": 232
    },
    {
      "NAME": "Estonia",
      "2L": "EE",
      "3L": "EST",
      "CODE": 233
    },
    {
      "NAME": "Eswatini",
      "2L": "SZ",
      "3L": "SWZ",
      "CODE": 748
    },
    {
      "NAME": "Ethiopia",
      "2L": "ET",
      "3L": "ETH",
      "CODE": 231
    },
    {
      "NAME": "Falkland Islands (the) [Malvinas]",
      "2L": "FK",
      "3L": "FLK",
      "CODE": 238
    },
    {
      "NAME": "Faroe Islands (the)",
      "2L": "FO",
      "3L": "FRO",
      "CODE": 234
    },
    {
      "NAME": "Fiji",
      "2L": "FJ",
      "3L": "FJI",
      "CODE": 242
    },
    {
      "NAME": "Finland",
      "2L": "FI",
      "3L": "FIN",
      "CODE": 246
    },
    {
      "NAME": "France",
      "2L": "FR",
      "3L": "FRA",
      "CODE": 250
    },
    {
      "NAME": "French Guiana",
      "2L": "GF",
      "3L": "GUF",
      "CODE": 254
    },
    {
      "NAME": "French Polynesia",
      "2L": "PF",
      "3L": "PYF",
      "CODE": 258
    },
    {
      "NAME": "French Southern Territories (the)",
      "2L": "TF",
      "3L": "ATF",
      "CODE": 260
    },
    {
      "NAME": "Gabon",
      "2L": "GA",
      "3L": "GAB",
      "CODE": 266
    },
    {
      "NAME": "Gambia (the)",
      "2L": "GM",
      "3L": "GMB",
      "CODE": 270
    },
    {
      "NAME": "Georgia",
      "2L": "GE",
      "3L": "GEO",
      "CODE": 268
    },
    {
      "NAME": "Germany",
      "2L": "DE",
      "3L": "DEU",
      "CODE": 276
    },
    {
      "NAME": "Ghana",
      "2L": "GH",
      "3L": "GHA",
      "CODE": 288
    },
    {
      "NAME": "Gibraltar",
      "2L": "GI",
      "3L": "GIB",
      "CODE": 292
    },
    {
      "NAME": "Greece",
      "2L": "GR",
      "3L": "GRC",
      "CODE": 300
    },
    {
      "NAME": "Greenland",
      "2L": "GL",
      "3L": "GRL",
      "CODE": 304
    },
    {
      "NAME": "Grenada",
      "2L": "GD",
      "3L": "GRD",
      "CODE": 308
    },
    {
      "NAME": "Guadeloupe",
      "2L": "GP",
      "3L": "GLP",
      "CODE": 312
    },
    {
      "NAME": "Guam",
      "2L": "GU",
      "3L": "GUM",
      "CODE": 316
    },
    {
      "NAME": "Guatemala",
      "2L": "GT",
      "3L": "GTM",
      "CODE": 320
    },
    {
      "NAME": "Guernsey",
      "2L": "GG",
      "3L": "GGY",
      "CODE": 831
    },
    {
      "NAME": "Guinea",
      "2L": "GN",
      "3L": "GIN",
      "CODE": 324
    },
    {
      "NAME": "Guinea-Bissau",
      "2L": "GW",
      "3L": "GNB",
      "CODE": 624
    },
    {
      "NAME": "Guyana",
      "2L": "GY",
      "3L": "GUY",
      "CODE": 328
    },
    {
      "NAME": "Haiti",
      "2L": "HT",
      "3L": "HTI",
      "CODE": 332
    },
    {
      "NAME": "Heard Island and McDonald Islands",
      "2L": "HM",
      "3L": "HMD",
      "CODE": 334
    },
    {
      "NAME": "Holy See (the)",
      "2L": "VA",
      "3L": "VAT",
      "CODE": 336
    },
    {
      "NAME": "Honduras",
      "2L": "HN",
      "3L": "HND",
      "CODE": 340
    },
    {
      "NAME": "Hong Kong",
      "2L": "HK",
      "3L": "HKG",
      "CODE": 344
    },
    {
      "NAME": "Hungary",
      "2L": "HU",
      "3L": "HUN",
      "CODE": 348
    },
    {
      "NAME": "Iceland",
      "2L": "IS",
      "3L": "ISL",
      "CODE": 352
    },
    {
      "NAME": "India",
      "2L": "IN",
      "3L": "IND",
      "CODE": 356
    },
    {
      "NAME": "Indonesia",
      "2L": "ID",
      "3L": "IDN",
      "CODE": 360
    },
    {
      "NAME": "Iran (Islamic Republic of)",
      "2L": "IR",
      "3L": "IRN",
      "CODE": 364
    },
    {
      "NAME": "Iraq",
      "2L": "IQ",
      "3L": "IRQ",
      "CODE": 368
    },
    {
      "NAME": "Ireland",
      "2L": "IE",
      "3L": "IRL",
      "CODE": 372
    },
    {
      "NAME": "Isle of Man",
      "2L": "IM",
      "3L": "IMN",
      "CODE": 833
    },
    {
      "NAME": "Israel",
      "2L": "IL",
      "3L": "ISR",
      "CODE": 376
    },
    {
      "NAME": "Italy",
      "2L": "IT",
      "3L": "ITA",
      "CODE": 380
    },
    {
      "NAME": "Jamaica",
      "2L": "JM",
      "3L": "JAM",
      "CODE": 388
    },
    {
      "NAME": "Japan",
      "2L": "JP",
      "3L": "JPN",
      "CODE": 392
    },
    {
      "NAME": "Jersey",
      "2L": "JE",
      "3L": "JEY",
      "CODE": 832
    },
    {
      "NAME": "Jordan",
      "2L": "JO",
      "3L": "JOR",
      "CODE": 400
    },
    {
      "NAME": "Kazakhstan",
      "2L": "KZ",
      "3L": "KAZ",
      "CODE": 398
    },
    {
      "NAME": "Kenya",
      "2L": "KE",
      "3L": "KEN",
      "CODE": 404
    },
    {
      "NAME": "Kiribati",
      "2L": "KI",
      "3L": "KIR",
      "CODE": 296
    },
    {
      "NAME": "Korea (the Democratic People's Republic of)",
      "2L": "KP",
      "3L": "PRK",
      "CODE": 408
    },
    {
      "NAME": "Korea (the Republic of)",
      "2L": "KR",
      "3L": "KOR",
      "CODE": 410
    },
    {
      "NAME": "Kuwait",
      "2L": "KW",
      "3L": "KWT",
      "CODE": 414
    },
    {
      "NAME": "Kyrgyzstan",
      "2L": "KG",
      "3L": "KGZ",
      "CODE": 417
    },
    {
      "NAME": "Lao People's Democratic Republic (the)",
      "2L": "LA",
      "3L": "LAO",
      "CODE": 418
    },
    {
      "NAME": "Latvia",
      "2L": "LV",
      "3L": "LVA",
      "CODE": 428
    },
    {
      "NAME": "Lebanon",
      "2L": "LB",
      "3L": "LBN",
      "CODE": 422
    },
    {
      "NAME": "Lesotho",
      "2L": "LS",
      "3L": "LSO",
      "CODE": 426
    },
    {
      "NAME": "Liberia",
      "2L": "LR",
      "3L": "LBR",
      "CODE": 430
    },
    {
      "NAME": "Libya",
      "2L": "LY",
      "3L": "LBY",
      "CODE": 434
    },
    {
      "NAME": "Liechtenstein",
      "2L": "LI",
      "3L": "LIE",
      "CODE": 438
    },
    {
      "NAME": "Lithuania",
      "2L": "LT",
      "3L": "LTU",
      "CODE": 440
    },
    {
      "NAME": "Luxembourg",
      "2L": "LU",
      "3L": "LUX",
      "CODE": 442
    },
    {
      "NAME": "Macao",
      "2L": "MO",
      "3L": "MAC",
      "CODE": 446
    },
    {
      "NAME": "Madagascar",
      "2L": "MG",
      "3L": "MDG",
      "CODE": 450
    },
    {
      "NAME": "Malawi",
      "2L": "MW",
      "3L": "MWI",
      "CODE": 454
    },
    {
      "NAME": "Malaysia",
      "2L": "MY",
      "3L": "MYS",
      "CODE": 458
    },
    {
      "NAME": "Maldives",
      "2L": "MV",
      "3L": "MDV",
      "CODE": 462
    },
    {
      "NAME": "Mali",
      "2L": "ML",
      "3L": "MLI",
      "CODE": 466
    },
    {
      "NAME": "Malta",
      "2L": "MT",
      "3L": "MLT",
      "CODE": 470
    },
    {
      "NAME": "Marshall Islands (the)",
      "2L": "MH",
      "3L": "MHL",
      "CODE": 584
    },
    {
      "NAME": "Martinique",
      "2L": "MQ",
      "3L": "MTQ",
      "CODE": 474
    },
    {
      "NAME": "Mauritania",
      "2L": "MR",
      "3L": "MRT",
      "CODE": 478
    },
    {
      "NAME": "Mauritius",
      "2L": "MU",
      "3L": "MUS",
      "CODE": 480
    },
    {
      "NAME": "Mayotte",
      "2L": "YT",
      "3L": "MYT",
      "CODE": 175
    },
    {
      "NAME": "Mexico",
      "2L": "MX",
      "3L": "MEX",
      "CODE": 484
    },
    {
      "NAME": "Micronesia (Federated States of)",
      "2L": "FM",
      "3L": "FSM",
      "CODE": 583
    },
    {
      "NAME": "Moldova (the Republic of)",
      "2L": "MD",
      "3L": "MDA",
      "CODE": 498
    },
    {
      "NAME": "Monaco",
      "2L": "MC",
      "3L": "MCO",
      "CODE": 492
    },
    {
      "NAME": "Mongolia",
      "2L": "MN",
      "3L": "MNG",
      "CODE": 496
    },
    {
      "NAME": "Montenegro",
      "2L": "ME",
      "3L": "MNE",
      "CODE": 499
    },
    {
      "NAME": "Montserrat",
      "2L": "MS",
      "3L": "MSR",
      "CODE": 500
    },
    {
      "NAME": "Morocco",
      "2L": "MA",
      "3L": "MAR",
      "CODE": 504
    },
    {
      "NAME": "Mozambique",
      "2L": "MZ",
      "3L": "MOZ",
      "CODE": 508
    },
    {
      "NAME": "Myanmar",
      "2L": "MM",
      "3L": "MMR",
      "CODE": 104
    },
    {
      "NAME": "Namibia",
      "2L": "NA",
      "3L": "NAM",
      "CODE": 516
    },
    {
      "NAME": "Nauru",
      "2L": "NR",
      "3L": "NRU",
      "CODE": 520
    },
    {
      "NAME": "Nepal",
      "2L": "NP",
      "3L": "NPL",
      "CODE": 524
    },
    {
      "NAME": "Netherlands (the)",
      "2L": "NL",
      "3L": "NLD",
      "CODE": 528
    },
    {
      "NAME": "New Caledonia",
      "2L": "NC",
      "3L": "NCL",
      "CODE": 540
    },
    {
      "NAME": "New Zealand",
      "2L": "NZ",
      "3L": "NZL",
      "CODE": 554
    },
    {
      "NAME": "Nicaragua",
      "2L": "NI",
      "3L": "NIC",
      "CODE": 558
    },
    {
      "NAME": "Niger (the)",
      "2L": "NE",
      "3L": "NER",
      "CODE": 562
    },
    {
      "NAME": "Nigeria",
      "2L": "NG",
      "3L": "NGA",
      "CODE": 566
    },
    {
      "NAME": "Niue",
      "2L": "NU",
      "3L": "NIU",
      "CODE": 570
    },
    {
      "NAME": "Norfolk Island",
      "2L": "NF",
      "3L": "NFK",
      "CODE": 574
    },
    {
      "NAME": "Northern Mariana Islands (the)",
      "2L": "MP",
      "3L": "MNP",
      "CODE": 580
    },
    {
      "NAME": "Norway",
      "2L": "NO",
      "3L": "NOR",
      "CODE": 578
    },
    {
      "NAME": "Oman",
      "2L": "OM",
      "3L": "OMN",
      "CODE": 512
    },
    {
      "NAME": "Pakistan",
      "2L": "PK",
      "3L": "PAK",
      "CODE": 586
    },
    {
      "NAME": "Palau",
      "2L": "PW",
      "3L": "PLW",
      "CODE": 585
    },
    {
      "NAME": "Palestine, State of",
      "2L": "PS",
      "3L": "PSE",
      "CODE": 275
    },
    {
      "NAME": "Panama",
      "2L": "PA",
      "3L": "PAN",
      "CODE": 591
    },
    {
      "NAME": "Papua New Guinea",
      "2L": "PG",
      "3L": "PNG",
      "CODE": 598
    },
    {
      "NAME": "Paraguay",
      "2L": "PY",
      "3L": "PRY",
      "CODE": 600
    },
    {
      "NAME": "Peru",
      "2L": "PE",
      "3L": "PER",
      "CODE": 604
    },
    {
      "NAME": "Philippines (the)",
      "2L": "PH",
      "3L": "PHL",
      "CODE": 608
    },
    {
      "NAME": "Pitcairn",
      "2L": "PN",
      "3L": "PCN",
      "CODE": 612
    },
    {
      "NAME": "Poland",
      "2L": "PL",
      "3L": "POL",
      "CODE": 616
    },
    {
      "NAME": "Portugal",
      "2L": "PT",
      "3L": "PRT",
      "CODE": 620
    },
    {
      "NAME": "Puerto Rico",
      "2L": "PR",
      "3L": "PRI",
      "CODE": 630
    },
    {
      "NAME": "Qatar",
      "2L": "QA",
      "3L": "QAT",
      "CODE": 634
    },
    {
      "NAME": "Republic of North Macedonia",
      "2L": "MK",
      "3L": "MKD",
      "CODE": 807
    },
    {
      "NAME": "Romania",
      "2L": "RO",
      "3L": "ROU",
      "CODE": 642
    },
    {
      "NAME": "Russian Federation (the)",
      "2L": "RU",
      "3L": "RUS",
      "CODE": 643
    },
    {
      "NAME": "Rwanda",
      "2L": "RW",
      "3L": "RWA",
      "CODE": 646
    },
    {
      "NAME": "Réunion",
      "2L": "RE",
      "3L": "REU",
      "CODE": 638
    },
    {
      "NAME": "Saint Barthélemy",
      "2L": "BL",
      "3L": "BLM",
      "CODE": 652
    },
    {
      "NAME": "Saint Helena, Ascension and Tristan da Cunha",
      "2L": "SH",
      "3L": "SHN",
      "CODE": 654
    },
    {
      "NAME": "Saint Kitts and Nevis",
      "2L": "KN",
      "3L": "KNA",
      "CODE": 659
    },
    {
      "NAME": "Saint Lucia",
      "2L": "LC",
      "3L": "LCA",
      "CODE": 662
    },
    {
      "NAME": "Saint Martin (French part)",
      "2L": "MF",
      "3L": "MAF",
      "CODE": 663
    },
    {
      "NAME": "Saint Pierre and Miquelon",
      "2L": "PM",
      "3L": "SPM",
      "CODE": 666
    },
    {
      "NAME": "Saint Vincent and the Grenadines",
      "2L": "VC",
      "3L": "VCT",
      "CODE": 670
    },
    {
      "NAME": "Samoa",
      "2L": "WS",
      "3L": "WSM",
      "CODE": 882
    },
    {
      "NAME": "San Marino",
      "2L": "SM",
      "3L": "SMR",
      "CODE": 674
    },
    {
      "NAME": "Sao Tome and Principe",
      "2L": "ST",
      "3L": "STP",
      "CODE": 678
    },
    {
      "NAME": "Saudi Arabia",
      "2L": "SA",
      "3L": "SAU",
      "CODE": 682
    },
    {
      "NAME": "Senegal",
      "2L": "SN",
      "3L": "SEN",
      "CODE": 686
    },
    {
      "NAME": "Serbia",
      "2L": "RS",
      "3L": "SRB",
      "CODE": 688
    },
    {
      "NAME": "Seychelles",
      "2L": "SC",
      "3L": "SYC",
      "CODE": 690
    },
    {
      "NAME": "Sierra Leone",
      "2L": "SL",
      "3L": "SLE",
      "CODE": 694
    },
    {
      "NAME": "Singapore",
      "2L": "SG",
      "3L": "SGP",
      "CODE": 702
    },
    {
      "NAME": "Sint Maarten (Dutch part)",
      "2L": "SX",
      "3L": "SXM",
      "CODE": 534
    },
    {
      "NAME": "Slovakia",
      "2L": "SK",
      "3L": "SVK",
      "CODE": 703
    },
    {
      "NAME": "Slovenia",
      "2L": "SI",
      "3L": "SVN",
      "CODE": 705
    },
    {
      "NAME": "Solomon Islands",
      "2L": "SB",
      "3L": "SLB",
      "CODE": 90
    },
    {
      "NAME": "Somalia",
      "2L": "SO",
      "3L": "SOM",
      "CODE": 706
    },
    {
      "NAME": "South Africa",
      "2L": "ZA",
      "3L": "ZAF",
      "CODE": 710
    },
    {
      "NAME": "South Georgia and the South Sandwich Islands",
      "2L": "GS",
      "3L": "SGS",
      "CODE": 239
    },
    {
      "NAME": "South Sudan",
      "2L": "SS",
      "3L": "SSD",
      "CODE": 728
    },
    {
      "NAME": "Spain",
      "2L": "ES",
      "3L": "ESP",
      "CODE": 724
    },
    {
      "NAME": "Sri Lanka",
      "2L": "LK",
      "3L": "LKA",
      "CODE": 144
    },
    {
      "NAME": "Sudan (the)",
      "2L": "SD",
      "3L": "SDN",
      "CODE": 729
    },
    {
      "NAME": "Suriname",
      "2L": "SR",
      "3L": "SUR",
      "CODE": 740
    },
    {
      "NAME": "Svalbard and Jan Mayen",
      "2L": "SJ",
      "3L": "SJM",
      "CODE": 744
    },
    {
      "NAME": "Sweden",
      "2L": "SE",
      "3L": "SWE",
      "CODE": 752
    },
    {
      "NAME": "Switzerland",
      "2L": "CH",
      "3L": "CHE",
      "CODE": 756
    },
    {
      "NAME": "Syrian Arab Republic",
      "2L": "SY",
      "3L": "SYR",
      "CODE": 760
    },
    {
      "NAME": "Taiwan (Province of China)",
      "2L": "TW",
      "3L": "TWN",
      "CODE": 158
    },
    {
      "NAME": "Tajikistan",
      "2L": "TJ",
      "3L": "TJK",
      "CODE": 762
    },
    {
      "NAME": "Tanzania, United Republic of",
      "2L": "TZ",
      "3L": "TZA",
      "CODE": 834
    },
    {
      "NAME": "Thailand",
      "2L": "TH",
      "3L": "THA",
      "CODE": 764
    },
    {
      "NAME": "Timor-Leste",
      "2L": "TL",
      "3L": "TLS",
      "CODE": 626
    },
    {
      "NAME": "Togo",
      "2L": "TG",
      "3L": "TGO",
      "CODE": 768
    },
    {
      "NAME": "Tokelau",
      "2L": "TK",
      "3L": "TKL",
      "CODE": 772
    },
    {
      "NAME": "Tonga",
      "2L": "TO",
      "3L": "TON",
      "CODE": 776
    },
    {
      "NAME": "Trinidad and Tobago",
      "2L": "TT",
      "3L": "TTO",
      "CODE": 780
    },
    {
      "NAME": "Tunisia",
      "2L": "TN",
      "3L": "TUN",
      "CODE": 788
    },
    {
      "NAME": "Turkey",
      "2L": "TR",
      "3L": "TUR",
      "CODE": 792
    },
    {
      "NAME": "Turkmenistan",
      "2L": "TM",
      "3L": "TKM",
      "CODE": 795
    },
    {
      "NAME": "Turks and Caicos Islands (the)",
      "2L": "TC",
      "3L": "TCA",
      "CODE": 796
    },
    {
      "NAME": "Tuvalu",
      "2L": "TV",
      "3L": "TUV",
      "CODE": 798
    },
    {
      "NAME": "Uganda",
      "2L": "UG",
      "3L": "UGA",
      "CODE": 800
    },
    {
      "NAME": "Ukraine",
      "2L": "UA",
      "3L": "UKR",
      "CODE": 804
    },
    {
      "NAME": "United Arab Emirates (the)",
      "2L": "AE",
      "3L": "ARE",
      "CODE": 784
    },
    {
      "NAME": "United Kingdom of Great Britain and Northern Ireland (the)",
      "2L": "GB",
      "3L": "GBR",
      "CODE": 826
    },
    {
      "NAME": "United States Minor Outlying Islands (the)",
      "2L": "UM",
      "3L": "UMI",
      "CODE": 581
    },
    {
      "NAME": "United States of America (the)",
      "2L": "US",
      "3L": "USA",
      "CODE": 840
    },
    {
      "NAME": "Uruguay",
      "2L": "UY",
      "3L": "URY",
      "CODE": 858
    },
    {
      "NAME": "Uzbekistan",
      "2L": "UZ",
      "3L": "UZB",
      "CODE": 860
    },
    {
      "NAME": "Vanuatu",
      "2L": "VU",
      "3L": "VUT",
      "CODE": 548
    },
    {
      "NAME": "Venezuela (Bolivarian Republic of)",
      "2L": "VE",
      "3L": "VEN",
      "CODE": 862
    },
    {
      "NAME": "Viet Nam",
      "2L": "VN",
      "3L": "VNM",
      "CODE": 704
    },
    {
      "NAME": "Virgin Islands (British)",
      "2L": "VG",
      "3L": "VGB",
      "CODE": 92
    },
    {
      "NAME": "Virgin Islands (U.S.)",
      "2L": "VI",
      "3L": "VIR",
      "CODE": 850
    },
    {
      "NAME": "Wallis and Futuna",
      "2L": "WF",
      "3L": "WLF",
      "CODE": 876
    },
    {
      "NAME": "Western Sahara",
      "2L": "EH",
      "3L": "ESH",
      "CODE": 732
    },
    {
      "NAME": "Yemen",
      "2L": "YE",
      "3L": "YEM",
      "CODE": 887
    },
    {
      "NAME": "Zambia",
      "2L": "ZM",
      "3L": "ZMB",
      "CODE": 894
    },
    {
      "NAME": "Zimbabwe",
      "2L": "ZW",
      "3L": "ZWE",
      "CODE": 716
    },
    {
      "NAME": "Åland Islands",
      "2L": "AX",
      "3L": "ALA",
      "CODE": 248
    }
  ]