Feature: Overview - Filter by Country
    As a user
    I want to filter data by country
    So that I can view relevant information for a specific region

    Background:
        Given User is on the "dashboard" page
        And I select tenant "Tanzania" when clicking "Flag of Ghana"
        And User is on the "/overview" page

    @overview @filterCountry
    Scenario: Filter Kafka Monitor topics by "Kenya, Tanzania"
        When User opens "All Countries" checkbox dropdown with index 1
        And User selects "Kenya, Tanzania" from the checkbox list

    @overview @filterCountry
    Scenario: Filter Daily Job Summaries by "Tanzania"
        When User opens "All Countries" checkbox dropdown with index 2
        And User selects "Tanzania" from the checkbox list