Feature: Add to Cart Functionality

  Scenario: Verify adding a product to the cart with selected size and color
    Given I am on the homepage of the e-commerce website
    When I search for the product "jacket"
    And I click on the first product in the search results
    And I select size "M" and color "Gray"
    And I click the "Add to Cart" button
    Then I should see a notification that the product has been added to the cart
    When I open the shopping cart
    Then I should see the selected size "M" and color "Gray" in the cart
    And I should see the initial subtotal for the product
    When I update the quantity to "2"
    Then I should see the updated subtotal reflecting the new quantity