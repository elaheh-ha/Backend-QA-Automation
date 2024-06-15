Feature: Store Negative Scenarios

     #Negative Path
        Scenario: I try to place an order with invalid data
            Given I have an invalid order information
             When I send a request to place an order
             Then I should receive a 500 error with a message "Unsupported Media Type"

    #Negative Path
        Scenario: I try to get an order with a non-existent ID
            Given I have a non-existent order ID
             When I send a request to get the order by ID
             Then I should receive a 404 error with a message "Order not found"

   #Negative Path
        Scenario:I try to delete an order with an invalid ID
            Given I have an invalid order ID
             When I send a request to delete an order with an invalid ID
             Then I should receive a 404 error with a message "invalidOrderId"


