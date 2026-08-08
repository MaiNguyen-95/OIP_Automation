Feature: Yara Connect Project

    @verifyModuleYaraConnect
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules for "<countryCode>"
        Given User loads module data from "src/data/dashboardModules.json" for country "<countryCode>"
        And User is on the "/dashboard?countryCode=<countryCode>" page
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | countryCode | moduleName                              |
            | tz          | YC - Identity Management                |
            | tz          | YC - Home Screen                        |
            | tz          | YC - B2C Fulfill Order (Assisted Order) |
            | tz          | YC - B2C Fulfill Order (Normal Order)   |
            | tz          | YC - B2B Fulfill Order (Seller)         |
            | tz          | YC - B2B Fulfill Order (Buyer)          |
            | tz          | YC - Campaign manager                   |
            | tz          | YC - Order Listing                      |
            | tz          | YC - Consent (YC app)                   |