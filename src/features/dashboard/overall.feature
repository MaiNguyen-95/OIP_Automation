Feature: Overall Availability
    As a user
    I want to view overall availability metrics
    So that I can monitor system uptime

    @verifyTextOverallAvailability
    Scenario: User verifies text of Overall Availability section
        Given I select tenant "<tenant>" when clicking "Flag of Ghana"
        Given User is on the "/dashboard" page
        Then User verifies the following texts are visible:
            | Overall Availability: |
            | Uptime                |
            | Last 1h:              |
            | Last 24h:             |
            | Last 7d:              |
            | Last 30d:             |
        Examples:
            | tenant   |
            | Tanzania |