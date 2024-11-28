import { faker } from "@faker-js/faker";
import format from "date-fns/format";
import crypto from "crypto";

class GenData {
  /**
   * Generates user data with random values.
   * @returns An object containing user data including email, name, password, random value, and phone number.
   */
  genUserData() {
    return {
      email: "mikepaxman007@mailinator.com", // Static email for testing
      // Uncomment below to generate dynamic email:
      // email: "mikepaxman007" + this.getRandomNumber() + "@mailinator.com",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: "123456789!@#QWE", // Static password for testing
      randomValue: this.genTimeStamp() + "_random_value", // Combines timestamp with a suffix
      phoneNumber: faker.phone.number("#########") // Random phone number
    };
  }

  /**
   * Generates a timestamp in the format `yyyyMMddHHmmss`.
   * @returns A string representing the current timestamp.
   */
  genTimeStamp() {
    const now = Date.now();
    return format(now, "yyyyMMddHHmmss");
  }

  /**
   * Generates a random hexadecimal string.
   * @returns A random 8-character hexadecimal string.
   */
  getRandomNumber() {
    return crypto.randomBytes(4).toString("hex");
    // Alternative method using date for random value:
    // return new Date().valueOf();
  }
}

export default GenData;
