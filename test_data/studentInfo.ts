import path, { join } from "node:path";   

export const student = {

    firstName: "Ba",
    lastName: "Ngo",
    email: "a@gmail.com",
    gender: "Female",
    mobile: "0102030405",
    year: "2000",
    month: "January",
    day: "01",
    subjects: "Maths",
    hobbies: "Sports",
    address: "Da Nang",
    state: "NCR",
    city: "Delhi",
    picture: path.join(__dirname, "../test_data/picture.png")

};