import type { AddAccountParams } from "../usecases";
import { faker } from "@faker-js/faker";

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
