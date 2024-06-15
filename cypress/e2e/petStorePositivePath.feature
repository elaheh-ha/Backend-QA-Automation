Feature:  Petstore Positive Scenarios
    
    
      #Positive Path
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



