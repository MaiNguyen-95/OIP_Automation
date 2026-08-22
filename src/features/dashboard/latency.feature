Feature: Latency
    As a user
    I want to view latency metrics
    So that I can see service latency

    @verifyTextLatency
    Scenario: User verifies text of Latency section
        Given I select tenant "<tenant>" when clicking "Flag of Ghana"
        Given User is on the "/dashboard" page
        Then User verifies the following texts are visible:
            | Latency:             |
            | Mean Latency         |
            | Top services latency |
            | View all services    |
        Examples:
            | tenant   |
            | Tanzania |