Feature: Login page

    @inputvalidemail
    Scenario Outline: Input valid eamil
        Given I navigate to the login page
        When I fill input '<textbox>' with '<email>'
        And I click button '<submit>'
        Then I should see text '<text>'
        When I login via Outlook magic link
        Examples:
            | email             | textbox | submit          | text          |
            | huyen.le@yara.com | email   | Send login link | Successfully! |

    @inputinvalidemail
    Scenario Outline: Input invalid email
        Given I navigate to the login page
        When I fill input '<textbox>' with '<email>'
        And I click button '<submit>'
        Then I should see text '<text>'
        Examples:
            | email             | textbox | submit          | text                                               |
            | abc.test@yara.com | email   | Send login link | Your email does not have the necessary permissions |

    @loginsuccessfully
    Scenario Outline: Login by link sent from Outlook successfully
        Given I navigate to the login page
        When I fill input '<textbox>' with '<email>'
        And I click button '<submit>'
        And I login via Outlook magic link
        Then I verify login redirect to DVCS Ops Insights
        Examples:
            | email             | textbox | submit          |
            | huyen.le@yara.com | email   | Send login link |
