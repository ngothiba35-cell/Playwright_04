import {test, expect} from "../fixture/page_fixture";
import { student } from "../test_data/studentInfo"; 

test.describe("Student Registration", () => {
    test("Register student with required fields successfully", async ({ studentPage }) => {
        await studentPage.open();
        await studentPage.inputRequiredFields(student);
        await studentPage.submitForm();
        await studentPage.verifyConfirmMessage();
        await studentPage.verifyRequiredFields(student);        
    });

    test("Register student with all fields successfully", async ({ studentPage }) => {
        await studentPage.open();
        await studentPage.inputRequiredFields(student);
        await studentPage.inputAllFields(student);
        await studentPage.submitForm();
        await studentPage.verifyConfirmMessage();
        await studentPage.verifyRequiredFields(student);
        await studentPage.verifyAllFields(student);
});
})