Feature: Yara Connect Project

    Background:
        Given User loads data from "src/data/dashboardModules.json"
        And User is on the "/dashboard" page

    @verifyModuleYaraConnect
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | moduleName                              |
            | YC - Identity Management                |
            | YC - Home Screen                        |
            | YC - B2C Fulfill Order (Assisted Order) |
            | YC - B2C Fulfill Order (Normal Order)   |
            | YC - B2B Fulfill Order (Seller)         |
            | YC - B2B Fulfill Order (Buyer)          |
            | YC - Campaign manager                   |
            | YC - Order Listing                      |
            | YC - Consent (YC app)                   |