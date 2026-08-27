Feature: Unreported Error

    @verifyUnreportedError
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules for "<countryCode>"
        Given User is on the "dashboard" page
        And I select tenant "<tenant>" when clicking "Flag of Ghana"
        And User loads module data from "src/data/dashboardModules.json" for country "<countryCode>"
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | tenant   | countryCode | moduleName                          |
            | Tanzania | tz          | Unreported Error - Unreported Error |