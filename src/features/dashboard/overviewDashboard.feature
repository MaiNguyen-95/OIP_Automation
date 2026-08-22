Feature: Dashboard Overview
    As a user
    I want to see all sections on the Dashboard page
    So that I can confirm the page has loaded correctly

    @verifytextdashboardOverview
    Scenario: User verifies all sections are visible on the Dashboard page
        Given I select tenant "<tenant>" when clicking "Flag of Ghana"
        Given User is on the "dashboard" page
        Then User verifies the following texts are visible:
            | Overall Availability: |
            | Uptime                |
            | Latency:              |
            | Mean Latency          |
            | Top services latency  |
            | View all services     |
            | PASSING MODULES       |
            | DEGRADED MODULES      |
            | FAILED MODULES        |
            | Module/Sub-modules    |
            | Last Results          |
            | Passing               |
            | Degraded              |
            | Failed                |
        Examples:
            | tenant   |
            | Tanzania |