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

    @verifyincidentdetail
    Scenario: User clicks Incident Detail link and verifies the incident detail page
        When User clicks on the "<link>" link
        Then User is navigated to the "<page>" page
        And User verifies the "<text>" text is "<state>"
        Examples:
            | link            | page        | text            | state   |
            | Incident Detail | /incidents/ | Incident Detail | visible |
            | Incident Detail | /incidents/ | Workflow        | visible |
            | Incident Detail | /incidents/ | Update          | visible |

    @addcomment
    Scenario: User adds a comment to an incident
        When User clicks on the "<link>" link
        Then User is navigated to the "<page>" page
        When User clicks on the "<button>" button
        And User inputs "<comment>" in the "<field>" field
        And User clicks on the "<button>" button
        Then User verifies the "<comment>" text is "visible"
        Examples:
            | link            | page        | button      | field             | comment                      |
            | Incident Detail | /incidents/ | Add Comment | Type something... | Test comment from automation |

    @markinprogress
    Scenario: User marks an incident as in progress
        When User opens the first incident that can be marked "<button>"
        Then User is navigated to the "<page>" page
        When User clicks on the "<button>" button
        Then User verifies the "<text>" text is "<state>"
        Examples:
            | page        | button           | text                  | state   |
            | /incidents/ | Mark in Progress | Marked In Progress by | visible |

    @markasresolved
    Scenario: User marks an incident as resolved
        When User opens the first incident that can be marked "<button>"
        Then User is navigated to the "<page>" page
        When User clicks on the "<button>" button
        Then User verifies the "<popup>" text is "<state>"
        When User clicks on the "<confirm>" button
        Then User verifies the "<text>" text is "<state>"
        Examples:
            | page        | button           | popup                  | confirm | text                  | state   |
            | /incidents/ | Mark as Resolved | Mark this as resolved? | Confirm | Marked as resolved by | visible |

    @collapseworkflow
    Scenario: User collapses and expands the Workflow accordion
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        And User verifies the "<step>" text is "visible"
        When User clicks on the "<flow>" button
        Then User verifies the "<step>" text is "hidden"
        When User clicks on the "<flow>" button
        Then User verifies the "<step>" text is "visible"
        Examples:
            | flow                  | step             |
            | Unreported Error Flow | Step 2: AppCrash |

    @collapseopenTelemetry
    Scenario: User collapses and expands the Update accordion
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        And User verifies the "<entry>" text is "visible"
        When User clicks on the "<section>" button
        Then User verifies the "<entry>" text is "hidden"
        When User clicks on the "<section>" button
        Then User verifies the "<entry>" text is "visible"
        Examples:
            | section       | entry                                                                                  |
            | OpenTelemetry | Unreported Error Unreported Error step 1 operation failed - Unreported error: ApiError |

    @viewstepdetails
    Scenario: User opens the step details from the Workflow
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        And User verifies the "<step>" text is "visible"
        When User clicks on the "<button>" button
        Then User is navigated to the "<page>" page
        And User verifies the "<text>" text is "<state>"
        Examples:
            | step                 | button       | page         | text                                 | state   |
            | Step 3: HandledError | View Details | /flow-steps/ | Log Details for Step 3: HandledError | visible |

    @jiralink
    Scenario: User opens the Jira ticket from the incident detail page
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        When User clicks on the "<link>" link
        Then User verifies the "<text>" text is "<state>"
        Examples:
            | link                              | text                  | state   |
            | View the incident details in Jira | Unreported Error Flow | visible |

    @errorlevelfilter
    Scenario: User filters the log list by Error Level
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        When User clicks on the "<viewDetails>" button
        Then User is navigated to the "<page>" page
        When User opens "<checkbox>" checkbox dropdown with index 1
        Then User verifies the "<warn>" text is "hidden"
        And User verifies the "<error>" text is "visible"
        When User opens "<checkbox>" checkbox dropdown with index 1
        Then User verifies the "<error>" text is "visible"
        Examples:
            | viewDetails  | page         | checkbox    | warn | error |
            | View Details | /flow-steps/ | Error Level | Warn | Error |

    @selectdate
    Scenario: User filters the log list by a selected date
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        When User clicks on the "<viewDetails>" button
        Then User is navigated to the "<page>" page
        And User verifies the "<placeholder>" text is "visible"
        When User clicks on the "<placeholder>" button
        And User clicks on the "<date>" button
        Then User verifies the "<placeholder>" text is "hidden"
        And User verifies the "<displayed>" text is "visible"
        Examples:
            | viewDetails  | page         | placeholder | date                      | displayed  |
            | View Details | /flow-steps/ | Select Date | Friday, October 2nd, 2026 | 2026-10-02 |

    @viewlogpopup
    Scenario: User opens the log detail popup
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        When User clicks on the "<viewDetails>" button
        Then User is navigated to the "<page>" page
        When User clicks on the "<view>" button
        Then User verifies the "<status>" text is "visible"
        And User verifies the "<summary>" text is "visible"
        And User verifies the "<technical>" text is "visible"
        And User verifies the "<showDetails>" text is "visible"
        Examples:
            | viewDetails  | page         | view | status          | summary          | technical         | showDetails  |
            | View Details | /flow-steps/ | View | INCIDENT STATUS | Business Summary | Technical Details | Show details |

    @showhidedetails
    Scenario: User shows and hides the technical details in the log popup
        When User clicks on the "Incident Detail" link
        Then User is navigated to the "/incidents/" page
        When User clicks on the "<viewDetails>" button
        Then User is navigated to the "<page>" page
        When User clicks on the "<view>" button
        Then User verifies the "<severity>" text is "visible"
        When User clicks on the "<show>" button
        Then User verifies the "<show>" text is "hidden"
        And User verifies the "<hide>" text is "visible"
        When User clicks on the "<hide>" button
        Then User verifies the "<hide>" text is "hidden"
        And User verifies the "<show>" text is "visible"
        Examples:
            | viewDetails  | page         | view | severity       | show         | hide         |
            | View Details | /flow-steps/ | View | Status: Failed | Show details | Hide details |
