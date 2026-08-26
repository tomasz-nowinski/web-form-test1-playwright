import { test, expect } from '@playwright/test';
import { WebFormPage } from '../pages/WebFormPage';

test.describe('Web Form Automation', () => {

  let webForm: WebFormPage;

  
  // Opens the Web Form before each test.
  test.beforeEach(async ({ page }) => {
    webForm = new WebFormPage(page);

    await webForm.openPage();
  });


  //TC01: Verifies that the user can successfully submit a form containing valid data.
  
  test('TC01 - user can successfully submit a valid form', async () => {

    // Fill the form with valid data
    await webForm.fillValidForm();

    // Verify First Name
    await expect(webForm.firstName)
      .toHaveValue('Marek');

    // Verify Last Name
    await expect(webForm.lastName)
      .toHaveValue('Nowak');

    // Verify Email
    await expect(webForm.email)
      .toHaveValue('marek.nowak@example.com');

    // Verify Email communication is selected
    await expect(webForm.communicationEmail)
      .toBeChecked();

    // Submit the form
    await webForm.submit();

    // Verify success message
    await webForm.expectSuccessMessage();
  });

  
  // TC02: Verifies that the Country dropdown contains the expected countries.

  test('TC02 - country dropdown contains expected options', async () => {

    // Get all options from Country dropdown
    const options =
      await webForm.country.locator('option').allTextContents();

    // Verify expected countries are available
    expect(options).toEqual(
      expect.arrayContaining([
        'United States',
        'Canada',
        'United Kingdom',
        'India',
        'Australia',
        'Other'
      ])
    );
  });


  // TC03: Verifies that the Clear button removes previously entered form data.

  test('TC03 - clear button resets the form', async () => {

    // Fill several form fields
    await webForm.country.selectOption('Canada');

    await webForm.title.selectOption('Dr.');

    await webForm.firstName.fill('Marek');

    await webForm.lastName.fill('Nowak');

    await webForm.email.fill('marek.nowak@example.com');

    await webForm.communicationEmail.check();

    // Verify that data was entered
    await expect(webForm.firstName)
      .toHaveValue('Marek');

    await expect(webForm.lastName)
      .toHaveValue('Nowak');

    await expect(webForm.email)
      .toHaveValue('marek.nowak@example.com');

    await expect(webForm.communicationEmail)
      .toBeChecked();

    // Clear the form
    await webForm.clear();

    // Verify text fields are empty
    await expect(webForm.firstName)
      .toHaveValue('');

    await expect(webForm.lastName)
      .toHaveValue('');

    await expect(webForm.email)
      .toHaveValue('');

    // Verify radio button is unchecked
    await expect(webForm.communicationEmail)
      .not.toBeChecked();
  });


  // TC04: Verifies that Email and Phone communication radio buttons are mutually exclusive.
 
  test('TC04 - communication options are mutually exclusive', async () => {

    // Select Email communication
    await webForm.communicationEmail.check();

    // Verify Email is selected
    await expect(webForm.communicationEmail)
      .toBeChecked();

    // Verify Phone is not selected
    await expect(webForm.communicationPhone)
      .not.toBeChecked();

    // Select Phone communication
    await webForm.communicationPhone.check();

    // Verify Phone is selected
    await expect(webForm.communicationPhone)
      .toBeChecked();

    // Verify Email is automatically deselected
    await expect(webForm.communicationEmail)
      .not.toBeChecked();
  });
});