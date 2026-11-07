Feature: Daily Job Summaries
    As a user
    I want to expand each job group
    So that I can verify its jobs

    Background:
        Given I select tenant "Ghana" when clicking "Flag of Ghana"
        And User is on the "/overview" page

    @verifytextdailyJobSummaries
    Scenario Outline: User expands "<moduleName>" and verifies its jobs
        When User expands the "<moduleName>" row
        Then User verifies the items of "<moduleName>" are visible

        Examples:
            | moduleName |
            | B2B Order  |

    @copydeeplink
    Scenario: User copies the deep link of a failed job run
        When User expands the "TH - Yapie Products Sync" row
        Then User verifies the following texts are visible:
            | TH - Yapie Products Sync |
            | Failed                   |
        When User clicks on the "Copy link" button
        Then User verifies the "Link copied" text is "visible"

    @viewfailedstepdetail
    Scenario: User opens the detail of a failed step
        When User expands the "TH - Yapie Products Sync" row
        Then User verifies the following texts are visible:
            | Failed       |
            | View Details |
        When User clicks on the "View Details" link
        Then User is navigated to the "/incidents/" page
