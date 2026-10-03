Feature: Yara Farmcare Project

    @verifyYaraFarmcare
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules for "<countryCode>"
        Given User is on the "dashboard" page
        And I select tenant "<tenant>" when clicking "Flag of Ghana"
        And User loads module data from "src/data/dashboardModules.json" for country "<countryCode>"
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | tenant   | countryCode | moduleName                                    |
            | Tanzania | tz          | YFC - Identity Management                     |
            | Tanzania | tz          | YFC - Identity Management (Farmcare Shop Web) |
            | Tanzania | tz          | YFC - Home Screen                             |
            | Tanzania | tz          | YFC - Home Screen (Farmcare Shop Web)         |
            | Tanzania | tz          | YFC - B2C Ordering (Via FC App)               |
            | Tanzania | tz          | YFC - B2C Ordering (Farmcare Shop Web)        |
            | Tanzania | tz          | YFC - Fertiliser Calculator                   |
            | Tanzania | tz          | YFC - My Orders                               |
            | Tanzania | tz          | YFC - Weather                                 |
            | Tanzania | tz          | YFC - Consent (Farmcare Shop Web)             |
            | Tanzania | tz          | YFC - Consent                                 |
            | Tanzania | tz          | YFC - Newsfeed Management                     |