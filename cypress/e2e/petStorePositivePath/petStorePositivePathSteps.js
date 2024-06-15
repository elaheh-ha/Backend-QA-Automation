import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import chaiJsonSchema from 'chai-json-schema';
import petSchema from '../../schemas/petSchema';
import orderSchema from '../../schemas/orderSchema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
const PET_INFO = Cypress.env('petInfo');
const ORDER_INFO = Cypress.env('orderInfo');

// Utility function to get a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Scenario: I can Create, Read, update and delete a pet
Given('I have a valid pet information', () => {
  const Pet_Info  = getRandomItem(PET_INFO);
  cy.wrap(Pet_Info).as('petInformation');
});

When('I send a request to create a pet', function () {
  cy.request('POST', `${BASE_URL}/pet`, this.petInformation).as('response');
});

Then('the pet should be created successfully', function () {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq(this.petInformation.name);
    expect(response.body).to.be.jsonSchema(petSchema);
    // Save pet ID for subsequent steps
    cy.wrap(response.body.id).as('PET_ID');
    });
});


When('I send a request to get the pet by ID', function () {
  cy.get('@PET_ID').then((PET_ID) => {
  cy.request('GET', `${BASE_URL}/pet/${PET_ID}`).as('response');
});
});
Then('the pet details should be returned', function () {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
    cy.get('@PET_ID').then((PET_ID) => {
    expect(response.body.id).to.eq(PET_ID);
    expect(response.body).to.be.jsonSchema(petSchema);
   });
  });
});

When('I send a request to update the pet information', function () {
  cy.get('@petInformation').then((petInformation) => {
  const updatedPet = { ...petInformation, name: 'UpdatedPetName' };
  cy.request('PUT', `${BASE_URL}/pet`, updatedPet).as('response');
});
});
Then('the pet information should be updated successfully', function () {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq('UpdatedPetName');

    cy.get('@PET_ID').then((PET_ID) => {
    cy.request('GET', `${BASE_URL}/pet/${PET_ID}`).then(getResponse => {
      expect(getResponse.status).to.eq(200);
      expect(getResponse.body.name).to.eq('UpdatedPetName');
      expect(getResponse.body).to.be.jsonSchema(petSchema);
    });
    });
  });
});

When('I send a request to delete a pet with a valid ID', () => {
  cy.get('@PET_ID').then((PET_ID) => {
  cy.request({
    method: 'DELETE',
    url: `${BASE_URL}/pet/${PET_ID}`,
    failOnStatusCode: false
  }).as('response');
 });
});

Then('the pet should be deleted successfully', function () {
  cy.get('@PET_ID').then((PET_ID) => {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq(PET_ID.toString());
  });
 });
});



Given('I have a valid order information', () => {
  const orderInfo  = getRandomItem(ORDER_INFO);
  cy.wrap(orderInfo).as('OrderInformation');
});

When('I send a request to place an order', function () {
  cy.request('POST', `${BASE_URL}/store/order`, this.OrderInformation).as('response');
});

Then('the order should be placed successfully', function () {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
     expect(response.body.id).to.eq(this.OrderInformation.id);
     expect(response.body).to.be.jsonSchema(orderSchema);
      // Save order ID for subsequent steps
    cy.wrap(response.body.id).as('ORDER_ID');
  });
});

When('I send a request to get the order by ID', function () {
  cy.get('@ORDER_ID').then(ORDER_ID => {
    cy.request('GET', `${BASE_URL}/store/order/${ORDER_ID}`).as('response');
  });
});

Then('the order details should be returned', function () {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.jsonSchema(orderSchema);
    cy.get('@ORDER_ID').then(ORDER_ID => {
    expect(response.body.id).to.eq(ORDER_ID);
   });
  });
});

When('I send a request to delete the order by ID', function () {
  cy.get('@ORDER_ID').then(ORDER_ID => {
  cy.request('DELETE', `${BASE_URL}/store/order/${ORDER_ID}`).as('response');
 });
});

Then('the order should be deleted successfully', function () {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
    cy.get('@ORDER_ID').then(ORDER_ID => {
      cy.request({
        method: 'GET',
        url: `${BASE_URL}/store/order/${ORDER_ID}`,
        failOnStatusCode: false
      }).then(getResponse => {
        expect(getResponse.status).to.eq(404);
        expect(getResponse.body.message).to.eq('Order not found');
      });
    });
  });
});

When('I send a request to get the inventory', () => {
  cy.request('GET', `${BASE_URL}/store/inventory`).as('response');
});

Then('the inventory details should be returned', function () {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(200);
    expect(response.body).to.not.be.null;
  });
});

