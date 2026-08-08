Feature: Unreported Error

    @verifyUnreportedError
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules for "<countryCode>"
        Given User loads module data from "src/data/dashboardModules.json" for country "<countryCode>"
        And User is on the "/dashboard?countryCode=<countryCode>" page
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | countryCode | moduleName                          |
            | tz          | Unreported Error - Unreported Error |