Feature: Login
    As a user
    I want to log in via magic link
    So that I can access the DVCS Ops Insights dashboard

    @loginWithValidEmail
    Scenario Outline: User submits valid email to receive login link
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User sees the footer with Yara branding
        And User clicks on the "<buttonName>" button
        Then User sees the "<successPage>" success message

        Examples:
            | page   | email               | buttonName      | successPage   |
            | /login | mai.nguyen@yara.com | Send login link | login-success |


    @loginWithInvalidEmail
    Scenario Outline: User submits valid email to receive login link
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User clicks on the "<buttonName>" button
        Then User sees the error message "<errorMessage>"

        Examples:
            | page   | email                 | buttonName      | errorMessage                 |
            | /login | mai1.nguyen@yara.com1 | Send login link | The email address is invalid |

    @verifyAftersubmitValidEmail
    Scenario Outline: Verify after submit valid email, success screen and back to login
        Given User is on the "<page>" page
        When User inputs "<email>" in the "Email Address" field
        And User sees the footer with Yara branding
        And User clicks on the "<buttonName>" button
        Then User sees the "<successPage>" success message
        And User sees the "<buttonBack>" button
        When User clicks on the "<buttonBack>" button
        Then User is navigated to the "<page>" page

        Examples:
            | page   | email               | buttonName      | successPage   | buttonBack    |
            | /login | mai.nguyen@yara.com | Send login link | login-success | Back to login |
