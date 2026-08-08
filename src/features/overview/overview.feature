Feature: Overview Page
    As a user
    I want to see all sections on the Overview page
    So that I can confirm the page has loaded correctly

    @verifytextOverview
    Scenario: User verifies all major sections are visible on the Overview page
        Given User is on the "/overview" page
        Then User verifies the following texts are visible:
            | Kafka Monitor       |
            | TOTAL TOPICS        |
            | TOTAL CONSUMER      |
            | TOTAL PENDING LAG   |
            | CRITICAL ISSUES     |
            | Topic name          |
            | Consumer Group      |
            | Lag status          |
            | Consumer Status     |
            | Issue               |
            | Daily Job Summaries |