Feature: Admin Portal Webapp Project

    Background:
        Given User loads module data from "src/data/dashboardModules.json"
        And User is on the "/dashboard" page

    @verifyModuleAdminPortal
    Scenario Outline: User expands "<moduleName>" and verifies its sub-modules
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | moduleName           |
            | AP - User Management |
            | AP - Store           |