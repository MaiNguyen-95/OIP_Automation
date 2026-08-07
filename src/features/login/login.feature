Feature: Login
    As a user
    I want to log in via magic link
    So that I can access the DVCS Ops Insights dashboard

    @loginWithValidEmail
    Scenario Outline: User submits valid email to receive login link
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User verifies the "Powered by Yara" text is "visible"
        And User clicks on the "<buttonName>" button
        Then User verifies the "<successText>" text is "visible"

        Examples:
            | page   | email               | buttonName      | successText   |
            | /login | mai.nguyen@yara.com | Send login link | Successfully! |


    @loginWithInvalidEmail
    Scenario Outline: User submits invalid email and sees error message
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User clicks on the "<buttonName>" button
        Then User verifies the "<errorMessage>" text is "visible"

        Examples:
            | page   | email                 | buttonName      | errorMessage                 |
            | /login | mai1.nguyen@yara.com1 | Send login link | The email address is invalid |


    @verifyAftersubmitValidEmail
    Scenario Outline: Verify after submit valid email, success screen and back to login
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User verifies the "Powered by Yara" text is "visible"
        And User clicks on the "<buttonName>" button
        Then User verifies the "<successText>" text is "visible"
        And User verifies the "<buttonBack>" text is "visible"
        When User clicks on the "<buttonBack>" button
        Then User is navigated to the "<page>" page

        Examples:
            | page   | email               | buttonName      | successText   | buttonBack    |
            | /login | mai.nguyen@yara.com | Send login link | Successfully! | Back to login |