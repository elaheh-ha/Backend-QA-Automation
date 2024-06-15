Feature:  Petstore Negative scenarios

          # Background:
            # Given platform has following error codes
            #       | Code | Description                                                |
            #       | 101  | Invalid Mobile Number                                      |
            #       | 102  | Invalid Email address                                      |
            #       | 103  | Invalid Bank Account Number                                |
            #       | 201  | Duplicate customer by First-name, Last-name, Date-of-Birth |
            #       | 202  | Duplicate customer by Email address    |

        #Negative Path
        Scenario: I try to create a pet with invalid data
            Given I have an invalid pet information
             When I send a request to create a pet
             Then I should receive a 500 error with a message "bad input"


        #Negative Path
        Scenario: I try to get a pet with a non-existent ID
            Given I have a non-existent pet ID
             When I send a request to get the pet by ID
             Then I should receive a 404 error with a message "Pet not found"

        #Negative Path
        Scenario: I try to update a pet with invalid data
            Given I have a valid pet ID and invalid pet update information
             When I send a request to update the pet information
             Then I should receive a 500 error with a message "Invalid input"

        #Negative Path
        Scenario: I try to delete a pet with an invalid ID
            Given I have an invalid pet ID
             When I send a request to delete a pet with an invalid ID
             Then I should receive a 404 error with a message "invalidPetId"


