import { InvalidFieldError } from "@/validation/errors";
import { faker } from "@faker-js/faker";
import { MinLengthValidation } from "@/validation/validators/min-length/min-length-validation";

const makeSut = (): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), 5);

describe("MinLengthValidation", () => {
  test("Should return error if value is invalid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.string.alphanumeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });
  test("Should return falsy if value is valid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.string.alphanumeric(5));
    expect(error).toBeFalsy();
  });
});
