import { InvalidFieldError } from "@/validation/errors";
import { faker } from "@faker-js/faker";
import { MinLengthValidation } from "@/validation/validators/min-length/min-length-validation";

const makeSut = (): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), 3);

describe("MinLengthValidation", () => {
  test("Should return error if value is invalid", () => {
    const sut = new MinLengthValidation("field", 5);
    const error = sut.validate("123");
    expect(error).toEqual(new InvalidFieldError());
  });
  test.skip("Should return falsy if value is valid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
