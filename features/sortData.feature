Feature: Sorting Functionality

  Scenario: Verify sorting by price (high to low and low to high)
    Given I am on the homepage of the e-commerce website
    When I search for the product "jacket"
    And I wait for the search results to load
    And I sort the results by price high to low
    Then I should see the products sorted by price high to low
    When I sort the results by price low to high
    Then I should see the products sorted by price low to high