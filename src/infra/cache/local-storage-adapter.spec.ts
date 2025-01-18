import "jest-localstorage-mock";
import { faker } from "@faker-js/faker";
import { cleanup } from "@testing-library/react";
import { LocalStorageAdapter } from "./local-storage-adapter";

describe("LocalStorageAdapter", () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });
  test("Should call localStorage with correct values", async () => {
    const sut = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.lorem.word();
    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
