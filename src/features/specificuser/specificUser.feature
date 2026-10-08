Feature: Specific User
    As a user
    I want to search logs by Phone Number or User ID
    So that I can check the status of a specific user

    Background: Login
        Given I select tenant "Ghana" when clicking "Flag of Ghana"
        And User clicks on the "Specific User" link


    @verifypecifictab
    Scenario: User verifies tab menu
        Then User verifies the "Specific User" tab is selected


    @verifySpecifictext
    Scenario Outline: User verifies static text
        Then User verifies the "<text>" text is "<state>"

        Examples:
            | text                                                                             | state   |
            | Enter User's Phone Number or User ID                                             | visible |
            | Search                                                                           | visible |
            | Clear                                                                            | visible |
            | Enter the User’s Phone Number or User ID to check the status of a specific user. | visible |


    @verifyinvaliduser
    Scenario Outline: User verifies invalid Phone Number or User ID
        When User inputs "<phoneNumber>" in the "Enter User's Phone Number or User ID" field
        And User clicks on the "Search" button
        Then User verifies the "<errorMessage>" text is "visible"

        Examples:
            | phoneNumber | errorMessage                    |
            | 03747980260 | Invalid Phone Number or User ID |


    @verifyvaliduser
    Scenario Outline: User searches with valid Phone Number
        When User inputs "<phoneNumber>" in the "Enter User's Phone Number or User ID" field
        And User clicks on the "Search" button
        Then User verifies the "User Logs" text is "visible"
        And User verifies the "Phone Number" text is "visible"
        And User verifies the "Timestamp" text is "visible"
        And User verifies the "Log type" text is "visible"
        And User verifies the "Ingestion Source" text is "visible"
        And User verifies the "Value" text is "visible"
        And User verifies the "Status" text is "visible"

        Examples:
            | phoneNumber  |
            | +84336206333 |


    @verifyclear
    Scenario Outline: User clears search
        When User inputs "<phoneNumber>" in the "Enter User's Phone Number or User ID" field
        And User clicks on the "Clear" button
        Then User verifies the "User Logs" text is "hidden"

        Examples:
            | phoneNumber  |
            | +84336206333 |