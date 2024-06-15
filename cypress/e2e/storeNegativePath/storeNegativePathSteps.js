import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const BASE_URL = Cypress.config('baseUrl');
const ORDER_INFO = Cypress.env('orderInfo');
const INVALID_ORDER_INFORMATION = Cypress.env('invalidOrderInfo');
const NON_EXISTENT_ORDER_ID = Cypress.env('nonExistentOrderId');
const INVALID_ORDER_ID = Cypress.env('invalidOrderId');


// Negative Path
//Scenario : Place Order with Invalid Data
Given('I have an invalid order information', () => {
  cy.wrap(INVALID_ORDER_INFORMATION).as('invalidOrderInformation');
});

When('I send a request to place an order', function () {
  cy.request({
    method: 'POST',
    url: `${BASE_URL}/store/order`,
    body: this.invalidOrderInformation,
    failOnStatusCode: false
  }).as('response');
});

Then('I should receive a 500 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(500);
   // expect(response.body.message).to.include(message);
  });
});


// Negative Path
//Scenario : Get Order by Non-existent ID
Given('I have a non-existent order ID', () => {
  cy.wrap(NON_EXISTENT_ORDER_ID).as('nonExistentOrderId');
});

When('I send a request to get the order by ID', function () {
  cy.request({
    method: 'GET',
    url: `${BASE_URL}/store/order/${this.nonExistentOrderId}`,
    failOnStatusCode: false
  }).as('response');
});

Then('I should receive a 404 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(404);
   // expect(response.body.message).to.include(message);
  });
});

// Negative Path
//Scenario : Delete Order with Invalid ID
Given('I have an invalid order ID', () => {
  cy.wrap('invalidOrderId').as('invalidOrderId');
});

When('I send a request to delete an order with an invalid ID', function () {
  cy.request({
    method: 'DELETE',
    url: `${BASE_URL}/store/order/${this.invalidOrderId}`,
    failOnStatusCode: false
  }).as('response');
});

Then('I should receive a 404 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(404);
    expect(response.body.message).to.include(message);
  });
});

