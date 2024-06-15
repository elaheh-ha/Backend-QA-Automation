Feature:  Pet Store End-to-End Scenarios
    
    
      #Pet Apis Positive Path
        Scenario: I can Create, Read, update and delete a pet
            Given I have a valid pet information
             When I send a request to create a pet
             Then the pet should be created successfully
           
             When I send a request to get the pet by ID
             Then the pet details should be returned
            
             When I send a request to update the pet information
             Then the pet information should be updated successfully
            
             When I send a request to delete a pet with a valid ID
             Then the pet should be deleted successfully


    #Store Apis Positive Path
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


  #Pet & Store Positive Path
        Scenario: User can create a pet, update it, place an order, and delete the pet
            Given I have a valid pet information
             When I send a request to create a pet
             Then the pet should be created successfully

             When I send a request to update the pet information
             Then the pet information should be updated successfully

            Given I have a valid order information
             When I send a request to place an order
             Then the order should be placed successfully

             When I send a request to get the order by ID
             Then the order details should be returned

             When I send a request to delete a pet with a valid ID
             Then the pet should be deleted successfully

