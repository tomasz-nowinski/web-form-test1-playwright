import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class WebFormPage extends BasePage {

  // Country dropdown
  readonly country: Locator;

  // Title dropdown
  readonly title: Locator;

  // First Name input
  readonly firstName: Locator;

  // Last Name input
  readonly lastName: Locator;

  // Date of Birth input
  readonly dateOfBirth: Locator;

  // Date of Joining input
  readonly dateOfJoining: Locator;

  // Email input
  readonly email: Locator;

  // Phone country code dropdown
  readonly phoneCode: Locator;

  // Phone number input
  readonly phoneNumber: Locator;

  // Communication by Email radio button
  readonly communicationEmail: Locator;

  // Communication by Phone radio button
  readonly communicationPhone: Locator;

  // Clear button
  readonly clearButton: Locator;

  // Submit button
  readonly submitButton: Locator;

  // Success message
  readonly successMessage: Locator;

  // Initializes all locators used by the Web Form page.
  constructor(page: Page) {
    super(page);

    // Country dropdown
    this.country = page.getByTestId('forms-country');

    // Title dropdown
    this.title = page.getByTestId('forms-title');

    // First Name input
    this.firstName = page.getByTestId('forms-first-name');

    // Last Name input
    this.lastName = page.getByTestId('forms-last-name');

    // Date of Birth input
    this.dateOfBirth = page.locator('#forms-dob');

    // Date of Joining input
    this.dateOfJoining = page.getByTestId('forms-doj');

    // Email input
    this.email = page.getByTestId('forms-email');

    // Phone country code dropdown
    this.phoneCode = page.getByTestId('forms-phone-code');

    // Phone number input
    this.phoneNumber = page.getByTestId('forms-phone-number');

    // Communication by Email
    this.communicationEmail = page.getByTestId('forms-comm-email');

    // Communication by Phone
    this.communicationPhone = page.getByTestId('forms-comm-phone');

    // Clear button
    this.clearButton = page.getByTestId('forms-clear');

    // Submit button
    this.submitButton = page.getByTestId('forms-submit');

    // Success message
    this.successMessage = page.getByTestId('forms-success');
  }

  // Opens the Web Form page.
  async openPage() {
    await this.open('/practice-forms');
  }

  // Fills all required fields with valid data.
  async fillValidForm() {
    await this.country.selectOption('Canada');
    await this.title.selectOption('Dr.');
    await this.firstName.fill('Marek');
    await this.lastName.fill('Nowak');
    await this.dateOfBirth.fill('1990-05-20');
    await this.dateOfJoining.fill('01/06/2021');
    await this.email.fill('marek.nowak@example.com');
    await this.phoneCode.selectOption('+91');
    await this.phoneNumber.fill('111000111');
    await this.communicationEmail.check();
  }

  // Clicks the Submit button.
  async submit() {
    await this.submitButton.click();
  }

  // Clicks the Clear button.
  async clear() {
    await this.clearButton.click();
  }

  // Verifies that the success message is displayed after successful form submission.
  async expectSuccessMessage() {
    await expect(this.successMessage).toBeVisible();

    await expect(this.successMessage)
      .toContainText('Details Successfully Added');
  }
}
