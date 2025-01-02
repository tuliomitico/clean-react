import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import type { FieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    return value ? null : new InvalidFieldError();
  }
}
