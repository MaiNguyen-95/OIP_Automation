Feature: Incident
    As a user
    I want to verify the text displayed on the Incidents page
    So that I can ensure the incident information is displayed correctly.

    Background: Login
        Given I select tenant "Ghana" when clicking "Flag of Ghana"
        And User clicks on the "Incidents" link


    @verifytabmenu
    Scenario: User verifies tab menu
        Then User verifies the "Incidents" tab is selected


    @verifystatictext
    Scenario: User verifies static text
        Then User verifies the "<text>" text is "<state>"
        Examples:
            | text              | state   |
            | DVCS Ops Insights | visible |
            | Huyen Le          | visible |
            | huyen.le@yara.com | visible |
            | Incidents History | visible |
            | Tue, Aug 11, 2026 | visible |

    @verifytimerange
    Scenario: User verifies time range
        And User selects timerange "<timeRange>"
        Then User verifies the "<timeRange>" timerange is selected
        Examples:
            | timeRange |
            | 1h        |

    @verifycustomrange
    Scenario: User verifies custom range
        And User clicks custom range "<customRange>"
        And User selects start date "<startDate>" and end date "<endDate>"
        Then User verifies the date range "<dateRange>" is displayed
        Examples:
            | customRange  | startDate                 | endDate                   | dateRange                  |
            | Custom range | Tuesday, August 4th, 2026 | Monday, August 10th, 2026 | Aug 4, 2026 - Aug 10, 2026 |

    @verifyincidentlistdatetime
    Scenario: User verifies incident list date and time
        Then User verifies the "<text>" text is "<state>"
        Examples:
            | text         | state   |
            | August, 2026 | visible |
            | 11           | visible |
            | Tue          | visible |
            | 04:39 PM     | visible |