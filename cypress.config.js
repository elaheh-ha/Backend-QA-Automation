
const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'TestData.json')));

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
       on('file:preprocessor', cucumber())
       require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://petstore.swagger.io/v2',
    specPattern: "cypress/e2e/*.feature", 
    env: {
      orderInfo: testData.orders,
      invalidOrderInfo: testData.invalidOrders,
      nonExistentOrderId: testData.nonExistentOrderId,
      invalidOrderId: testData.invalidOrderId,
      petInfo: testData.validPets,
      invalidPetInfo: testData.invalidPets,
      nonExistentPetId: testData.nonExistentPetId,
      invalidPetId: testData.invalidPetId
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'Pet Store API Test Report',
      embeddedScreenshots: true,
      inlineAssets: true
    }
   }
});
