Feature: Incident
    As a user
    I want to verify the text displayed on the Incidents page
    So that I can ensure the incident information is displayed correctly.

    @verifytabmenu
    Scenario: User Verifies tab menu
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User clicks on the "<buttonName>" button
        And User clicks tab "<tab>" to menutab
        Then User verifies the "Incidents" tab is selected

        Examples:
            | page   | email             | buttonName      | tab       |
            | /login | huyen.le@yara.com | Send login link | Incidents |

    @verifystatictext
    Scenario: User Verifies static text
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User clicks on the "<buttonName>" button
        And User clicks tab "<tab>" to menutab
        Then User verifies static texts
            | webAppName        | userName | email             | titlePage         | currentday        |
            | DVCS Ops Insights | Huyen Le | huyen.le@yara.com | Incidents History | Sat, Aug 08, 2026 |

        Examples:
            | page   | email             | buttonName      | tab       |
            | /login | huyen.le@yara.com | Send login link | Incidents |

    @verifytimerange
    Scenario: User Verifies time range
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User clicks on the "<buttonName>" button
        And User clicks tab "<tab>" to menutab
        Then User verifies the "<timeRange>" timerange is selected
        Examples:
            | page   | email             | buttonName      | tab       | timeRange |
            | /login | huyen.le@yara.com | Send login link | Incidents | 1h        |

    @verifycustomrange
    Scenario: User Verifies custom range
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User clicks on the "<buttonName>" button
        And User clicks tab "<tab>" to menutab
        And User clicks custom range "<customRange>"
        And User selects start date "<startDate>" and end date "<endDate>"
        Then User verifies the date range "<dateRange>" is displayed
        Examples:
            | page   | email             | buttonName      | tab       | customRange | startDate  | endDate    | dateRange                 |
            | /login | huyen.le@yara.com | Send login link | Incidents | 1h          | 2026-07-31 | 2023-08-08 | Aug 4, 2026 - Aug 8, 2026 |

    @verifyincidentlistdatetime
    Scenario: User Verifies incident list date and time
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User clicks on the "<buttonName>" button
        And User clicks tab "<tab>" to menutab
        Then User verifies the incident details "<month>", "<day>", "<weekday>", "<time>"
        Examples:
            | page   | email             | buttonName      | tab       | month        | day | weekday | time    |
            | /login | huyen.le@yara.com | Send login link | Incidents | August, 2026 | 08  | Sat     | 7:40 PM |