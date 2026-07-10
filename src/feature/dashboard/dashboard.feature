Feature: Latency on Dashboard

    Background:
        Given I navigate to the login page
        When I fill input 'email' with 'huyen.le@yara.com'
        And I click button 'Send login link'
        And I login via Outlook magic link
        Then I verify login redirect to DVCS Ops Insights
        When I click to open tenant combobox "Ghana"
        And I selects "India" option on combobox

    @verifylatencywithfilter
    Scenario Outline: Latency
        And I select "<timerange>" timerange "<filtertimerange>"
        Then I verify both "<P95>" and "<P99>" latency metrics for "<timerange>" timerange on card "<meanlatency>" match API
        Examples:
            | option       | timerange | filtertimerange | meanlatency       | P95  | P99  |
            | Yara Connect | 7d        | latency-section | mean-latency-card | 95th | 99th |


    @verifypopuptopservicesopen
    Scenario: Open popup top services latency
        And From "<datatestid>" I click "<text>"
        Then I verify popup is "<status>"
        Examples:
            | datatestid      | text              | status |
            | latency-section | View all services | open   |


    @verifypopuptopservicesclosed
    Scenario: Close popup top services latency
        And From "<datatestid>" I click "<text>"
        And I verify popup is "open"
        And I click to "<btnclose>" button to close popup Services latency
        Then I verify popup is "<status>"
        Examples:
            | datatestid      | text              | btnclose | status |
            | latency-section | View all services | Close    | closed |

