Feature: Yara Connect Project

    @verifyModuleYaraConnect
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules for "<countryCode>"
        Given User is on the "dashboard" page
        And I select tenant "<tenant>" when clicking "Flag of Ghana"
        And User loads module data from "src/data/dashboardModules.json" for country "<countryCode>"
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | tenant   | countryCode | moduleName                              |
            | Tanzania | tz          | YC - Identity Management                |
            | Tanzania | tz          | YC - Home Screen                        |
            | Tanzania | tz          | YC - B2C Fulfill Order (Assisted Order) |
            | Tanzania | tz          | YC - B2C Fulfill Order (Normal Order)   |
            | Tanzania | tz          | YC - B2B Fulfill Order (Seller)         |
            | Tanzania | tz          | YC - B2B Fulfill Order (Buyer)          |
            | Tanzania | tz          | YC - Campaign manager                   |
            | Tanzania | tz          | YC - Order Listing                      |
            | Tanzania | tz          | YC - Consent (YC app)                   |
