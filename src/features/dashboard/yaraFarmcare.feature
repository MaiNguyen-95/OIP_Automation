Feature: Yara Farmcare Project

    @verifyYaraFarmcare
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules for "<countryCode>"
        Given User loads module data from "src/data/dashboardModules.json" for country "<countryCode>"
        And User is on the "/dashboard?countryCode=<countryCode>" page
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | countryCode | moduleName                                    |
            | tz          | YFC - Identity Management                     |
            | tz          | YFC - Identity Management (Farmcare Shop Web) |
            | tz          | YFC - Home Screen                             |
            | tz          | YFC - Home Screen (Farmcare Shop Web)         |
            | tz          | YFC - B2C Ordering (Via FC App)               |
            | tz          | YFC - B2C Ordering (Farmcare Shop Web)        |
            | tz          | YFC - Fertiliser Calculator                   |
            | tz          | YFC - My Orders                               |
            | tz          | YFC - Weather                                 |
            | tz          | YFC - Consent (Farmcare Shop Web)             |
            | tz          | YFC - Consent                                 |
            | tz          | YFC - Newsfeed Management                     |