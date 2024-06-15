Feature: Store Positive Scenarios

    #Positive Path
        Scenario: Place an order for a pet
            Given I have a valid order information
             When I send a request to place an order
             Then the order should be placed successfully
             When I send a request to get the order by ID
             Then the order details should be returned
             When I send a request to delete the order by ID
             Then the order should be deleted successfully
             When I send a request to get the inventory
             Then the inventory details should be returned

