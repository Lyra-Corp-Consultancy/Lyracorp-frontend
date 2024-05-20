export const fileServer = "http://192.168.1.33:3000/upload";

export const createdModules = [
                                ["dashboard"],
                                ["masters",[
                                    ["type master",
                                        [
                                            ["customer type"],
                                            ["account type"],
                                            ["payment type"],
                                            ["discount type"],
                                            ["document type"], 
                                            ["certification type"], 
                                            ["UOM type"], 
                                            ["tax type"], 
                                            ["margin setting type"], 
                                            ["department type"], 
                                            ["role type"], 
                                            ["vendor type"],
                                            ["packing type"],
                                            ["shipping type"]
                                        ]],
                                        ["customer master"], 
                                        ["vendor master"], 
                                        ["product master"], 
                                        ["profile master"]
                                    ]
                                ],
                                ["inventory management",
                                    [
                                        ["purchase order"],
                                        ["purchase inward"],
                                        ["stock check"],
                                        ["raw material - outward"],
                                        ["finished good - inward"]
                                    ]
                                ],
                                ["quality management",
                                    [
                                        ["quality check - PO"],
                                        ["quality check - FG"]
                                    ]
                                ],
                                ["supply chain management",
                                    [
                                        ["finished goods outwards"]
                                    ]
                                ],
                                ["order management"],
                                ["user management"],
                            ];
