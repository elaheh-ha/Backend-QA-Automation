import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const BASE_URL = Cypress.config('baseUrl');
const INVALID_PET_INFORMATION = Cypress.env('invalidPetInfo');
const NON_EXISTENT_PET_ID = Cypress.env('nonExistentPetId');
const INVALID_PET_ID = Cypress.env('invalidPetId');


// Scenario: I try to create a pet with invalid data
Given('I have an invalid pet information', () => {
  cy.wrap(INVALID_PET_INFORMATION).as('invalidPetInformation');});

When('I send a request to create a pet', function () {
  cy.request({
    method: 'POST',
    url: `${BASE_URL}/pet`,
    body: this.invalidPetInformation,
    failOnStatusCode: false
  }).as('response');
});

Then('I should receive a 500 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(500);
    //expect(response.body.message).to.include('bad input');
  });
});

//Scenario: I try to get a pet with a non-existent ID
Given('I have a non-existent pet ID', () => {
  cy.wrap(NON_EXISTENT_PET_ID).as('nonExistentPetId');
  });

When('I send a request to get the pet by ID', function () {
  cy.get('@nonExistentPetId').then((petId) => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}/pet/${petId}`,
      failOnStatusCode: false
    }).as('response');
  });
});


Then('I should receive a 404 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(404);
    expect(response.body.message).to.include(message);
  });
});

//Scenario : I try to update a pet with invalid data
Given('I have a valid pet ID and invalid pet update information', () => {
  cy.wrap(INVALID_PET_INFORMATION).as('invalidPetInfo');
});

When('I send a request to update the pet information', function () {
  cy.get('@invalidPetInfo').then((invalidPetInfo) => {
    cy.request({
      method: 'PUT',
      url: `${BASE_URL}/pet`,
      body: invalidPetInfo,
      failOnStatusCode: false
    }).as('response');
  });
});

Then('I should receive a 500 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(500);
    expect(response.body.message).to.include(message);
  });
});

// Scenario : I try to delete a pet with an invalid ID
Given('I have an invalid pet ID', () => {
  cy.wrap(INVALID_PET_ID).as('invalidPetId');
});

When('I send a request to delete a pet with an invalid ID', function () {
  cy.get('@invalidPetId').then((Inv_petId) => {
    cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/pet/${Inv_petId}`,
      failOnStatusCode: false
    }).as('response');
  });
});

Then('I should receive a 404 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(404);
    expect(response.body.message).to.include(message);
  });
});

//Scenario: Attempt to create a pet with incorrect request_header

Given('I have a valid pet information', () => {
  cy.wrap(INVALID_PET_INFORMATION).as('invalidPetInformation');});

When('I send a request to create a pet with an incorrect header', function () {
  cy.request({
    method: 'POST',
    url: `${BASE_URL}/pet`,
    headers: {
      'Content-Type': 'application/xml'
    },
    body: this.invalidPetInformation,
    failOnStatusCode: false
  }).as('response');
});

Then('I should receive a 400 error with a message {string}', function (message) {
  cy.get('@response').then(response => {
    expect(response.status).to.eq(400);
    //expect(response.body.message).to.include(message);
  });
});