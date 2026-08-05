import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class RegisterFormPage extends BasePage{
    firstName: Locator;
    lastName: Locator;
    email: Locator;

    genderMale: Locator;
    genderFemale: Locator;
    genderOther: Locator;

    mobile: Locator;
    
    dateOfBirth: Locator;

    subjects: Locator;

    hobbySport: Locator;
    hobbyReading:Locator;
    hobbyMusic: Locator;

    picture: Locator;

    currentAddress: Locator;

    state: Locator;
    city: Locator;

    submitButton: Locator;

    verifyMessage: Locator;
    verifyInformation: Locator;

constructor(page: Page){
    super(page);

    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator("#userEmail");
    
    this.genderMale = page.locator("//label[contains(normalize-space(.), 'Male')]");
    this.genderFemale = page.locator("//label[contains(normalize-space(.), 'Female')]");
    this.genderOther = page.locator("//label[contains(normalize-space(.), 'Other')]");

    this.mobile = page.locator('#userNumber');

    this.dateOfBirth = page.locator('#dateOfBirthInput');

    this.subjects = page.locator('#subjectsInput');

    this.hobbySport = page.locator("//label[contains(normalize-space(.), 'Sports')]");
    this.hobbyReading = page.locator("//label[contains(normalize-space(.), 'Reading')]");
    this.hobbyMusic= page.locator("//label[contains(normalize-space(.), 'Music')]");

    this.picture = page.locator('#uploadPicture');

    this.currentAddress = page.locator('#currentAddress');

    this.state = page.locator('#state');
    this.city = page.locator('#city');

    this.submitButton = page.locator('#submit');

    this.verifyMessage = page.locator('#example-modal-sizes-title-lg');
    this.verifyInformation = page.locator(".table");
    }

async open(){
    await this.navigate('https://demoqa.com/automation-practice-form');
    }

async inputRequiredFields(data: any){
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);

    if (data.gender === "Male")
        await this.genderMale.click();
    else if  (data.gender === "Female")
        await this.genderFemale.click();
    else
        await this.genderOther.click();

    await this.fill(this.mobile, data.mobile);

}

async inputAllFields(data: any){
    await this.fill(this.email, data.email);
    await this.dateOfBirth.click();
    await this.page.locator(".react-datepicker__year-select").selectOption(data.year);
    await this.page.locator(".react-datepicker__month-select").selectOption({ label: data.month });
    await this.page.locator(`.react-datepicker__day--0${data.day}`).first().click();

    await this.subjects.fill(data.subjects);
    await this.subjects.press("Enter");
    
    await this.hobbySport.click();

    await this.picture.setInputFiles(data.picture);

    await this.fill(this.currentAddress, data.address);

    await this.state.click();
    await this.page.getByText(data.state, {exact: true}).click();

    await this.city.click();
    await this.page.getByText(data.city, {exact:true}).click();

    }

async submitForm(){
    await this.submitButton.click();
    }


async verifyConfirmMessage(){
    await expect(this.verifyMessage).toHaveText("Thanks for submitting the form");
    }

async verifyRequiredFields(data: any){
    await expect(this.verifyInformation).toContainText(`${data.firstName} ${data.lastName}`);
    await expect(this.verifyInformation).toContainText(data.gender);
    await expect(this.verifyInformation).toContainText(data.mobile);
}

async verifyAllFields(data: any){
    await expect(this.verifyInformation).toContainText(`${data.firstName} ${data.lastName}`);
    await expect(this.verifyInformation).toContainText(data.email);
    await expect(this.verifyInformation).toContainText(data.gender);
    await expect(this.verifyInformation).toContainText(data.mobile);
    await expect(this.verifyInformation).toContainText(data.day + " " + data.month + "," + data.year);
    await expect(this.verifyInformation).toContainText(data.subjects);
    await expect(this.verifyInformation).toContainText(data.hobbies);
    // await expect(this.verifyInformation).toContainText(data.picture);
    await expect(this.verifyInformation).toContainText(data.address);
    await expect(this.verifyInformation).toContainText(`${data.state} ${data.city}`);
    }

}




