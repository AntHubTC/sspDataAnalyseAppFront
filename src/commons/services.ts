import service from "./request"

// 是否是本地测试
const isLocal = true;

export const getTreeData = (premisesId: string):Promise<any>=>{
    if (isLocal) {
        return Promise.resolve(
            {
                "left": {
                    "id": "593168",
                    "title": "中豪四季公馆1",
                    "nodeType": "premises",
                    "sspId": null,
                    "data": {
                        "sspId": null
                    },
                    "items": [
                        {
                            "id": "2291844",
                            "title": "1栋",
                            "nodeType": "build",
                            "sspId": null,
                            "data": {
                                "sspId": null
                            },
                            "items": [
                                {
                                    "id": "4036563",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007990",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291844",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-066"
                                            },
                                            "items": [
                                                {
                                                    "id": "10338",
                                                    "title": "HZB-C45-066-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291844",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036563",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10337",
                                                    "title": "HZB-C45-066-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291844",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036563",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460344",
                                                    "title": "HZB-C45-066",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291844",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036563",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007991",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291844",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-041"
                                            },
                                            "items": [
                                                {
                                                    "id": "10352",
                                                    "title": "HZB-C45-041-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291844",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036563",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10351",
                                                    "title": "HZB-C45-041-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291844",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036563",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460346",
                                                    "title": "HZB-C45-041",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291844",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036563",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2291845",
                            "title": "2栋",
                            "nodeType": "build",
                            "sspId": null,
                            "data": {
                                "sspId": null
                            },
                            "items": [
                                {
                                    "id": "4036565",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007963",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291845",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-068"
                                            },
                                            "items": [
                                                {
                                                    "id": "10349",
                                                    "title": "HZB-C45-068-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036565",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10350",
                                                    "title": "HZB-C45-068-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036565",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460336",
                                                    "title": "HZB-C45-068",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036565",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007964",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291845",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-043"
                                            },
                                            "items": [
                                                {
                                                    "id": "10356",
                                                    "title": "HZB-C45-043-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036565",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10355",
                                                    "title": "HZB-C45-043-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036565",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460338",
                                                    "title": "HZB-C45-043",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036565",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "4036564",
                                    "title": "2单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007966",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291845",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-042"
                                            },
                                            "items": [
                                                {
                                                    "id": "6606353770152460342",
                                                    "title": "HZB-C45-042",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036564",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10336",
                                                    "title": "HZB-C45-042-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036564",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10335",
                                                    "title": "HZB-C45-042-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036564",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007965",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291845",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-067"
                                            },
                                            "items": [
                                                {
                                                    "id": "6606353770152460340",
                                                    "title": "HZB-C45-067",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036564",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10341",
                                                    "title": "HZB-C45-067-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036564",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10342",
                                                    "title": "HZB-C45-067-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291845",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "4036564",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2291846",
                            "title": "3栋",
                            "nodeType": "build",
                            "sspId": null,
                            "data": {
                                "sspId": null
                            },
                            "items": [
                                {
                                    "id": "5679574",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007961",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291846",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-069"
                                            },
                                            "items": [
                                                {
                                                    "id": "6606353770152460332",
                                                    "title": "HZB-C45-069",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291846",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679574",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10358",
                                                    "title": "HZB-C45-069-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291846",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679574",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10357",
                                                    "title": "HZB-C45-069-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291846",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679574",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007962",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291846",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-044"
                                            },
                                            "items": [
                                                {
                                                    "id": "6606353770152460334",
                                                    "title": "HZB-C45-044",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291846",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679574",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10365",
                                                    "title": "HZB-C45-044-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291846",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679574",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10366",
                                                    "title": "HZB-C45-044-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291846",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679574",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2291847",
                            "title": "4栋",
                            "nodeType": "build",
                            "sspId": null,
                            "data": {
                                "sspId": null
                            },
                            "items": [
                                {
                                    "id": "5900001",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007960",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291847",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-045"
                                            },
                                            "items": [
                                                {
                                                    "id": "10361",
                                                    "title": "HZB-C45-045-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291847",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900001",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460330",
                                                    "title": "HZB-C45-045",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291847",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900001",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10362",
                                                    "title": "HZB-C45-045-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291847",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900001",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007959",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291847",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-046"
                                            },
                                            "items": [
                                                {
                                                    "id": "10370",
                                                    "title": "HZB-C45-046-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291847",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900001",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460328",
                                                    "title": "HZB-C45-046",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291847",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900001",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10369",
                                                    "title": "HZB-C45-046-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291847",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900001",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2291848",
                            "title": "5栋",
                            "nodeType": "build",
                            "sspId": null,
                            "data": {
                                "sspId": null
                            },
                            "items": [
                                {
                                    "id": "5679581",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007958",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291848",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-047"
                                            },
                                            "items": [
                                                {
                                                    "id": "10354",
                                                    "title": "HZB-C45-047-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679581",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10353",
                                                    "title": "HZB-C45-047-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679581",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460326",
                                                    "title": "HZB-C45-047",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679581",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007957",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291848",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-070"
                                            },
                                            "items": [
                                                {
                                                    "id": "10348",
                                                    "title": "HZB-C45-070-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679581",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460324",
                                                    "title": "HZB-C45-070",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679581",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10347",
                                                    "title": "HZB-C45-070-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679581",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "5679579",
                                    "title": "2单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007956",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291848",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-048"
                                            },
                                            "items": [
                                                {
                                                    "id": "6606353770152460322",
                                                    "title": "HZB-C45-048",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679579",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10343",
                                                    "title": "HZB-C45-048-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679579",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10344",
                                                    "title": "HZB-C45-048-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679579",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007955",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291848",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-071"
                                            },
                                            "items": [
                                                {
                                                    "id": "6606353770152460320",
                                                    "title": "HZB-C45-071",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679579",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10345",
                                                    "title": "HZB-C45-071-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679579",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10346",
                                                    "title": "HZB-C45-071-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291848",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5679579",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2291849",
                            "title": "6栋",
                            "nodeType": "build",
                            "sspId": null,
                            "data": {
                                "sspId": null
                            },
                            "items": [
                                {
                                    "id": "5900004",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007954",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291849",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-049"
                                            },
                                            "items": [
                                                {
                                                    "id": "10359",
                                                    "title": "HZB-C45-049-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291849",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900004",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10360",
                                                    "title": "HZB-C45-049-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291849",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900004",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460318",
                                                    "title": "HZB-C45-049",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291849",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900004",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007953",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291849",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-072"
                                            },
                                            "items": [
                                                {
                                                    "id": "10367",
                                                    "title": "HZB-C45-072-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291849",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900004",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10368",
                                                    "title": "HZB-C45-072-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291849",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900004",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460316",
                                                    "title": "HZB-C45-072",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291849",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900004",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2291850",
                            "title": "7栋",
                            "nodeType": "build",
                            "sspId": null,
                            "data": {
                                "sspId": null
                            },
                            "items": [
                                {
                                    "id": "5900002",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007952",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291850",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-050"
                                            },
                                            "items": [
                                                {
                                                    "id": "10363",
                                                    "title": "HZB-C45-050-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900002",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10364",
                                                    "title": "HZB-C45-050-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900002",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460314",
                                                    "title": "HZB-C45-050",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900002",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007951",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291850",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-073"
                                            },
                                            "items": [
                                                {
                                                    "id": "10339",
                                                    "title": "HZB-C45-073-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900002",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460312",
                                                    "title": "HZB-C45-073",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900002",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10340",
                                                    "title": "HZB-C45-073-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900002",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "5900003",
                                    "title": "2单元",
                                    "nodeType": "unit",
                                    "sspId": null,
                                    "data": {
                                        "sspId": null,
                                        "unitPremisesId": "593168"
                                    },
                                    "items": [
                                        {
                                            "id": "6007950",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291850",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-051"
                                            },
                                            "items": [
                                                {
                                                    "id": "6606353770152460310",
                                                    "title": "HZB-C45-051",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900003",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10334",
                                                    "title": "HZB-C45-051-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900003",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10333",
                                                    "title": "HZB-C45-051-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900003",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "6007949",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": null,
                                            "data": {
                                                "eleBuildId": "2291850",
                                                "sspId": null,
                                                "elePremisesId": "593168",
                                                "eleNum": "HZB-C45-074"
                                            },
                                            "items": [
                                                {
                                                    "id": "10332",
                                                    "title": "HZB-C45-074-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900003",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6606353770152460308",
                                                    "title": "HZB-C45-074",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900003",
                                                        "type": "1"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "10331",
                                                    "title": "HZB-C45-074-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "2291850",
                                                        "pointPremisesId": "593168",
                                                        "pointUnitId": "5900003",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "right": {
                    "id": "1f177825623a4eaeb4e3304cfe8bdae6",
                    "title": "中豪四季公馆1",
                    "nodeType": "premises",
                    "sspId": "593168",
                    "data": {
                        "sspId": "593168"
                    },
                    "items": [
                        {
                            "id": "a3eb37e04c2e44f29381c702af16495e",
                            "title": "1栋",
                            "nodeType": "build",
                            "sspId": "2291844",
                            "data": {
                                "sspId": "2291844"
                            },
                            "items": [
                                {
                                    "id": "1aa6ceadb1654def8643a8238a82efba",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": "4036563",
                                    "data": {
                                        "sspId": "4036563",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "2ed1a49e14394b699fdf7a1da61d5eea",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": "6007990",
                                            "data": {
                                                "eleBuildId": "a3eb37e04c2e44f29381c702af16495e",
                                                "sspId": "6007990",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-066"
                                            },
                                            "items": [
                                                {
                                                    "id": "d9ee6140c694489ebbf72fc896c17bea",
                                                    "title": "HZB-C45-066-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "a3eb37e04c2e44f29381c702af16495e",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "1aa6ceadb1654def8643a8238a82efba",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "7aa44f677df441ddb8f0620043015fb3",
                                                    "title": "HZB-C45-066-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "a3eb37e04c2e44f29381c702af16495e",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "1aa6ceadb1654def8643a8238a82efba",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "9a6b4cf1da2c4ed1b46f8bbceb06064b",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": "6007991",
                                            "data": {
                                                "eleBuildId": "a3eb37e04c2e44f29381c702af16495e",
                                                "sspId": "6007991",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-041"
                                            },
                                            "items": [
                                                {
                                                    "id": "3262f6757e2d47f4ba79ea3f6c7e0337",
                                                    "title": "HZB-C45-041-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "a3eb37e04c2e44f29381c702af16495e",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "1aa6ceadb1654def8643a8238a82efba",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "a54958429ab04423b52f9b90f8a9ebfb",
                                                    "title": "HZB-C45-041-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "a3eb37e04c2e44f29381c702af16495e",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "1aa6ceadb1654def8643a8238a82efba",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "e459ab30f1404c1086de3b7013e5bc81",
                            "title": "2栋",
                            "nodeType": "build",
                            "sspId": "2291845",
                            "data": {
                                "sspId": "2291845"
                            },
                            "items": [
                                {
                                    "id": "600aef6271e34e569707425f4f54ceda",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": "4036565",
                                    "data": {
                                        "sspId": "4036565",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "7dfccef6fa894316a15bf83430540936",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": "6007963",
                                            "data": {
                                                "eleBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                "sspId": "6007963",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-068"
                                            },
                                            "items": [
                                                {
                                                    "id": "c812673539d24767ab1172c9f9d67124",
                                                    "title": "HZB-C45-068-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "600aef6271e34e569707425f4f54ceda",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "9154e96ad20149d6b072d87b09c97543",
                                                    "title": "HZB-C45-068-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "600aef6271e34e569707425f4f54ceda",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "a5f88142e7ca4ce79e6821f96ec115b9",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": "6007964",
                                            "data": {
                                                "eleBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                "sspId": "6007964",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-043"
                                            },
                                            "items": [
                                                {
                                                    "id": "c482e79608d34aa88d8f69d2e8f52745",
                                                    "title": "HZB-C45-043-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "600aef6271e34e569707425f4f54ceda",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "be70de7b40ad4298ac27242378286de7",
                                                    "title": "HZB-C45-043-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "600aef6271e34e569707425f4f54ceda",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "f40caaba2b0943b1bebe6e78c4074a3b",
                                    "title": "2单元",
                                    "nodeType": "unit",
                                    "sspId": "4036564",
                                    "data": {
                                        "sspId": "4036564",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "2ce3efbba9d447c192091c9ba76d872d",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": "6007966",
                                            "data": {
                                                "eleBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                "sspId": "6007966",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-042"
                                            },
                                            "items": [
                                                {
                                                    "id": "b1b66924e37c4d3191cb4cdfd70f8d41",
                                                    "title": "HZB-C45-042-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "f40caaba2b0943b1bebe6e78c4074a3b",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "385418d3fa56480683b7e1c6a657badf",
                                                    "title": "HZB-C45-042-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "f40caaba2b0943b1bebe6e78c4074a3b",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "405fd9a3522a46fa8ab91fc5c4614cf7",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": "6007965",
                                            "data": {
                                                "eleBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                "sspId": "6007965",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-067"
                                            },
                                            "items": [
                                                {
                                                    "id": "ead042d7e1ec48848f321aabd4e2564f",
                                                    "title": "HZB-C45-067-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "f40caaba2b0943b1bebe6e78c4074a3b",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "86497115e5be4806b9ffedbc04927c1c",
                                                    "title": "HZB-C45-067-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e459ab30f1404c1086de3b7013e5bc81",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "f40caaba2b0943b1bebe6e78c4074a3b",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "176d02feb04e4178b3f835ccad010478",
                            "title": "3栋",
                            "nodeType": "build",
                            "sspId": "2291846",
                            "data": {
                                "sspId": "2291846"
                            },
                            "items": [
                                {
                                    "id": "05f4d1a6d1f143808a6f959f2809d5e0",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": "5679574",
                                    "data": {
                                        "sspId": "5679574",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "a6ef015639ae4ee79dee101518f8c65d",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": "6007961",
                                            "data": {
                                                "eleBuildId": "176d02feb04e4178b3f835ccad010478",
                                                "sspId": "6007961",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-069"
                                            },
                                            "items": [
                                                {
                                                    "id": "dae53a0694e14e579397fb297d309ba3",
                                                    "title": "HZB-C45-069-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "176d02feb04e4178b3f835ccad010478",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "05f4d1a6d1f143808a6f959f2809d5e0",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "04bd4e7234934c769ad32fa489230c0f",
                                                    "title": "HZB-C45-069-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "176d02feb04e4178b3f835ccad010478",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "05f4d1a6d1f143808a6f959f2809d5e0",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "d43303fa29284447bb69291e319ea37d",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": "6007962",
                                            "data": {
                                                "eleBuildId": "176d02feb04e4178b3f835ccad010478",
                                                "sspId": "6007962",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-044"
                                            },
                                            "items": [
                                                {
                                                    "id": "b70ebc57b97e4eabb57df74ff0a24da9",
                                                    "title": "HZB-C45-044-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "176d02feb04e4178b3f835ccad010478",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "05f4d1a6d1f143808a6f959f2809d5e0",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "6829b235496149bca6085004cedc5c15",
                                                    "title": "HZB-C45-044-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "176d02feb04e4178b3f835ccad010478",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "05f4d1a6d1f143808a6f959f2809d5e0",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "82f90cbcf5e146ac9a26cdf3197edb3b",
                            "title": "4栋",
                            "nodeType": "build",
                            "sspId": "2291847",
                            "data": {
                                "sspId": "2291847"
                            },
                            "items": [
                                {
                                    "id": "4a36d0768c1f4026a86606cd156994eb",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": "5900001",
                                    "data": {
                                        "sspId": "5900001",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "c77c9db6b1e3423186688f3d67406a9d",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": "6007960",
                                            "data": {
                                                "eleBuildId": "82f90cbcf5e146ac9a26cdf3197edb3b",
                                                "sspId": "6007960",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-045"
                                            },
                                            "items": [
                                                {
                                                    "id": "1e77e0f77a494293b435575dd6909de7",
                                                    "title": "HZB-C45-045-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "82f90cbcf5e146ac9a26cdf3197edb3b",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4a36d0768c1f4026a86606cd156994eb",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "e0272bb329b04c188e9f0828d9e8e454",
                                                    "title": "HZB-C45-045-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "82f90cbcf5e146ac9a26cdf3197edb3b",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4a36d0768c1f4026a86606cd156994eb",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "ffc08d68e3464db387be4161ff2383a6",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": "6007959",
                                            "data": {
                                                "eleBuildId": "82f90cbcf5e146ac9a26cdf3197edb3b",
                                                "sspId": "6007959",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-046"
                                            },
                                            "items": [
                                                {
                                                    "id": "5b4ea751328e4dbaaec8e5734cda7a51",
                                                    "title": "HZB-C45-046-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "82f90cbcf5e146ac9a26cdf3197edb3b",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4a36d0768c1f4026a86606cd156994eb",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "d9d29854a21b426d8e18224bc3e19bbb",
                                                    "title": "HZB-C45-046-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "82f90cbcf5e146ac9a26cdf3197edb3b",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4a36d0768c1f4026a86606cd156994eb",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "c5a7db28e60c428d88780931998f70c8",
                            "title": "5栋",
                            "nodeType": "build",
                            "sspId": "2291848",
                            "data": {
                                "sspId": "2291848"
                            },
                            "items": [
                                {
                                    "id": "4f08e5380b494917a8e38d1423823c28",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": "5679581",
                                    "data": {
                                        "sspId": "5679581",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "9a8501cc6e2c4adcbde0fc224409d6cd",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": "6007958",
                                            "data": {
                                                "eleBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                "sspId": "6007958",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-047"
                                            },
                                            "items": [
                                                {
                                                    "id": "5a72a145abdb487792cd6f9007009fbb",
                                                    "title": "HZB-C45-047-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4f08e5380b494917a8e38d1423823c28",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "1f8551bda0824f8386cb97be3e2f6073",
                                                    "title": "HZB-C45-047-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4f08e5380b494917a8e38d1423823c28",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "79258bc1335642b1ac17189c200b7f43",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": "6007957",
                                            "data": {
                                                "eleBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                "sspId": "6007957",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-070"
                                            },
                                            "items": [
                                                {
                                                    "id": "0a3c37f694ce422e8ecd32d23268896e",
                                                    "title": "HZB-C45-070-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4f08e5380b494917a8e38d1423823c28",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "90f59bea692c48eca26791d443dd3ffd",
                                                    "title": "HZB-C45-070-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "4f08e5380b494917a8e38d1423823c28",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "e6436a7372fa4a7598c4ac57df5ac904",
                                    "title": "2单元",
                                    "nodeType": "unit",
                                    "sspId": "5679579",
                                    "data": {
                                        "sspId": "5679579",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "4f0f9beca4d64332b56350e00e11fcbc",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": "6606353770152460322",
                                            "data": {
                                                "eleBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                "sspId": "6606353770152460322",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-048"
                                            },
                                            "items": [
                                                {
                                                    "id": "c1dbebf55bd54844b9ee95ec82912796",
                                                    "title": "HZB-C45-048-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "e6436a7372fa4a7598c4ac57df5ac904",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "56eb8cb7fa30470e9c52bc1e3a27cb9a",
                                                    "title": "HZB-C45-048-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "e6436a7372fa4a7598c4ac57df5ac904",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "5a44cb62032f46de89a1e12b6d316f4b",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": "6606353770152460320",
                                            "data": {
                                                "eleBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                "sspId": "6606353770152460320",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-071"
                                            },
                                            "items": [
                                                {
                                                    "id": "adcff95aa4e9405381ea72ed9f92bce6",
                                                    "title": "HZB-C45-071-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "e6436a7372fa4a7598c4ac57df5ac904",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "274ff440e1e648c0ae3e94e24e56b589",
                                                    "title": "HZB-C45-071-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "c5a7db28e60c428d88780931998f70c8",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "e6436a7372fa4a7598c4ac57df5ac904",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "45e4e4e1d0ba4815836dcfb67a179067",
                            "title": "6栋",
                            "nodeType": "build",
                            "sspId": "2291849",
                            "data": {
                                "sspId": "2291849"
                            },
                            "items": [
                                {
                                    "id": "70313593c740430e9a8111474134d2d7",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": "5900004",
                                    "data": {
                                        "sspId": "5900004",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "ae0f391406fa4c3aba52b2080f7c52dd",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": "6007954",
                                            "data": {
                                                "eleBuildId": "45e4e4e1d0ba4815836dcfb67a179067",
                                                "sspId": "6007954",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-049"
                                            },
                                            "items": [
                                                {
                                                    "id": "80879b5a18e948e185e604a22b1d3386",
                                                    "title": "HZB-C45-049-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "45e4e4e1d0ba4815836dcfb67a179067",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "70313593c740430e9a8111474134d2d7",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "fdc1eeb7ddc14032add88a08e919bd25",
                                                    "title": "HZB-C45-049-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "45e4e4e1d0ba4815836dcfb67a179067",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "70313593c740430e9a8111474134d2d7",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "dc8d864bf62f43cca8a256ebbc04e709",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": "6007953",
                                            "data": {
                                                "eleBuildId": "45e4e4e1d0ba4815836dcfb67a179067",
                                                "sspId": "6007953",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-072"
                                            },
                                            "items": [
                                                {
                                                    "id": "81c499e81a1741979ef0b9fc6424eed1",
                                                    "title": "HZB-C45-072-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "45e4e4e1d0ba4815836dcfb67a179067",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "70313593c740430e9a8111474134d2d7",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "a020299e2f7e4ceba898df6333199b2c",
                                                    "title": "HZB-C45-072-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "45e4e4e1d0ba4815836dcfb67a179067",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "70313593c740430e9a8111474134d2d7",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "e420815d39444bf8b5f3f72f14baedb7",
                            "title": "7栋",
                            "nodeType": "build",
                            "sspId": "2291850",
                            "data": {
                                "sspId": "2291850"
                            },
                            "items": [
                                {
                                    "id": "88412738c03549bf9e122aa7dbe1dced",
                                    "title": "1单元",
                                    "nodeType": "unit",
                                    "sspId": "5900002",
                                    "data": {
                                        "sspId": "5900002",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "d041d9ed707340009ecc0a04b425874f",
                                            "title": "右1",
                                            "nodeType": "ele",
                                            "sspId": "6007952",
                                            "data": {
                                                "eleBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                "sspId": "6007952",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-050"
                                            },
                                            "items": [
                                                {
                                                    "id": "436fc5cd17cd49fdb800129559c59837",
                                                    "title": "HZB-C45-050-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "88412738c03549bf9e122aa7dbe1dced",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "1d4a71cf2ede492782a2ffdc3b215341",
                                                    "title": "HZB-C45-050-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "88412738c03549bf9e122aa7dbe1dced",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "3cfcd0f466424eaaa6d8cf0b1defd9d5",
                                            "title": "右2",
                                            "nodeType": "ele",
                                            "sspId": "6007951",
                                            "data": {
                                                "eleBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                "sspId": "6007951",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-073"
                                            },
                                            "items": [
                                                {
                                                    "id": "f1cb74fcee34466097e4a57fe343d4cd",
                                                    "title": "HZB-C45-073-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "88412738c03549bf9e122aa7dbe1dced",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "5f3533874507478a8cfaf8c5fde58cd9",
                                                    "title": "HZB-C45-073-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "88412738c03549bf9e122aa7dbe1dced",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "2b774fc6b2ea4683987eb97d67933520",
                                    "title": "2单元",
                                    "nodeType": "unit",
                                    "sspId": "5900003",
                                    "data": {
                                        "sspId": "5900003",
                                        "unitPremisesId": null
                                    },
                                    "items": [
                                        {
                                            "id": "21446786a9d34b9fb9521effd94aa620",
                                            "title": "左1",
                                            "nodeType": "ele",
                                            "sspId": "6007950",
                                            "data": {
                                                "eleBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                "sspId": "6007950",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-051"
                                            },
                                            "items": [
                                                {
                                                    "id": "1921b138d345444f857276dabf9868d9",
                                                    "title": "HZB-C45-051-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "2b774fc6b2ea4683987eb97d67933520",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "ffaeb7b41c48423981d78e405587f826",
                                                    "title": "HZB-C45-051-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "2b774fc6b2ea4683987eb97d67933520",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        },
                                        {
                                            "id": "19f0e741e7ab4cae9ca23e07ce7ceca0",
                                            "title": "左2",
                                            "nodeType": "ele",
                                            "sspId": "6007949",
                                            "data": {
                                                "eleBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                "sspId": "6007949",
                                                "elePremisesId": null,
                                                "eleNum": "HZB-C45-074"
                                            },
                                            "items": [
                                                {
                                                    "id": "0dd1ffda9d584c45983784b0d85f9b79",
                                                    "title": "HZB-C45-074-K1",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "2b774fc6b2ea4683987eb97d67933520",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                },
                                                {
                                                    "id": "0dd201716d94410398d2dbb17f787fd3",
                                                    "title": "HZB-C45-074-K2",
                                                    "nodeType": "point",
                                                    "sspId": null,
                                                    "data": {
                                                        "sspId": null,
                                                        "pointBuildId": "e420815d39444bf8b5f3f72f14baedb7",
                                                        "pointPremisesId": null,
                                                        "pointUnitId": "2b774fc6b2ea4683987eb97d67933520",
                                                        "type": "2"
                                                    },
                                                    "items": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        );
    }
    return service.post("/treeData", {
        "premisesId": premisesId
    });
}


/**
 * 获取用户当前配置
 * @returns 用户当前配置
 */
export const getUserConfig = ():Promise<any>=>{
    if (isLocal) {
        return Promise.resolve(
            {
                "sspCookie": "userToken=%7B%2xxxx",
                "rmCookie": "csrftoken=0CXnj0KDbBxxxxxxxxxxxx"
            }
        );
    }
    return service.get("/getUserConfig");
}

/**
 * 测试用户配置是否正确
 * @param userConfig 用户配置
 * @returns 
 */
export const testUserConfig = (userConfig:any):Promise<any>=>{
    if (isLocal) {
        return Promise.resolve(
            true
        );
    }
    return service.post("/testConfig", userConfig);
}

/**
 * 设置用户配置
 * @param userConfig 用户配置
 * @returns 
 */
export const setUserConfig = (userConfig:any):Promise<any>=>{
    if (isLocal) {
        return Promise.resolve(
            true
        );
    }
    return service.post("/setUserConfig", userConfig);
}

// todo:: 引入mockjs来进行接口数据模拟
