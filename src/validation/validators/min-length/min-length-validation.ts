import { InvalidFieldError } from "@/validation/errors";
import type { FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number,
  ) {}
  validate(input: Partial<Record<string, string>>): Error | null {
    const { [this.field]: value } = input;

    if (!value) {
      return null;
    }

    return value.length < this.minLength ? new InvalidFieldError() : null;
  }
}
