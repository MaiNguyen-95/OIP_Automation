Feature: Specific User
    As a user
    I want to search logs by Phone Number or User ID
    So that I can check the status of a specific user

    Background: Login
        Given I select tenant "Ghana" when clicking "Flag of Ghana"
        And User clicks on the "Specific User" link


    @verifyspecifictab
    Scenario: User verifies tab menu
        Then User verifies the "Specific User" tab is selected


    @verifyspecifictext
    Scenario: User verifies static text
        Then User verifies the "<text>" text is "<state>"
        Examples:
            | text                                                                             | state   |
            | Enter User's Phone Number or User ID                                             | visible |
            | Search                                                                           | visible |
            | Clear                                                                            | visible |
            | Enter the User’s Phone Number or User ID to check the status of a specific user. | visible |
