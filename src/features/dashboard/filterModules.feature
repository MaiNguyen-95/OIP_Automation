Feature: Modules filter
    As a user
    I want to view the modules filter
    So that I can see passing, degraded, and failed modules

    @verifyModulesFilter
    Scenario: User verifies modules filter section
        Given User is on the "/dashboard" page
        Then User verifies the following texts are visible:
            | PASSING MODULES    |
            | DEGRADED MODULES   |
            | FAILED MODULES     |
            | Module/Sub-modules |