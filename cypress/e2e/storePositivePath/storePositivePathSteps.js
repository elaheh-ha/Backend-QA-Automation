import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import chaiJsonSchema from 'chai-json-schema';
import orderSchema from '../../schemas/orderSchema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
const ORDER_INFO = Cypress.env('orderInfo');


// Utility function to get a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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

