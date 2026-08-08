Feature: Yara Farmcare Project

    Background:
        Given User loads module data from "src/data/dashboardModules.json"
        And User is on the "/dashboard" page

    @verifyYaraFarmcare
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | moduleName                                    |
            | YFC - Identity Management                     |
            | YFC - Identity Management (Farmcare Shop Web) |
            | YFC - Home Screen                             |
            | YFC - Home Screen (Farmcare Shop Web)         |
            | YFC - B2C Ordering (Via FC App)               |
            | YFC - B2C Ordering (Farmcare Shop Web)        |
            | YFC - Fertiliser Calculator                   |
            | YFC - My Orders                               |
            | YFC - Weather                                 |
            | YFC - Consent (Farmcare Shop Web)             |
            | YFC - Consent                                 |
            | YFC - Newsfeed Management                     |