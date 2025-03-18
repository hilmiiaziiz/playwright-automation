Feature: Search Functionality

  Scenario: Print elements containing "jacket" in search results
    Given I am on the homepage of the e-commerce website
    When I search for the product "jacket"
    And I wait for the search results to load
    Then I should print all elements containing the word "jacket"