# Playwright Web Form Tests
Web UI automation tests written in Playwright and TypeScript, using the Page Object Model (POM) design pattern to test web form functionality.

## Tech Stack:
Playwright Test
TypeScript
Page Object Model (POM)
Web UI Testing

## Test Coverage:
Web Form

TC01 – Successful form submission
TC02 – Country dropdown validation
TC03 – Clear form functionality
TC04 – Communication options validation (Email and Phone radio buttons)


Install dependencies:
npm install

Run all tests:
npx playwright test

Run tests with the list reporter:
npx playwright test --reporter=list

Run tests in headed mode:
npx playwright test --headed

Generate and open the HTML report:
npx playwright show-report