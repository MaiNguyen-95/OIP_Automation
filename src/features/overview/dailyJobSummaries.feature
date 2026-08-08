Feature: Daily Job Summaries
    As a user
    I want to expand each job group
    So that I can verify its jobs

    Background:
        Given User loads module data from "src/data/overviewJobs.json"
        And User is on the "/overview" page

    @verifytextdailyJobSummaries
    Scenario Outline: User expands "<moduleName>" and verifies its jobs
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | moduleName |
            | B2B Order  |