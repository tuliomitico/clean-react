import { ValidationComposite } from "@/validation/validators/validation-composite/validation-composite";
import { FieldValidationSpy } from "../test/mock-field-validation";
import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};
const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessage = faker.lorem.words();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.lorem.words());
    const error = sut.validate(fieldName, "any_value");
    expect(error).toBe(errorMessage);
  });
  test("Should return falsy if there is no error", () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, "any_value");
    expect(error).toBeFalsy();
  });
});
