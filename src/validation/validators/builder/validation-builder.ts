import type { FieldValidation } from "@/validation/protocols/field-validation";
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from "@/validation/validators";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {}
  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): this {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): this {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min(minLength: number): this {
    this.validations.push(new MinLengthValidation(this.fieldName, minLength));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
