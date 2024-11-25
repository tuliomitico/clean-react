import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { faker } from "@faker-js/faker";
import type { HttpPostParams } from "@/data/protocols/http";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: {},
});

describe("AxiosHttpClient", () => {
  test("Should call axios with correct URL and verb", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
  // test("Should call axios with correct body", async () => {
  //   const { url } = mockPostRequest();
  //   const sut = makeSut();
  //   await sut.post({ url: faker.internet.url() });
  //   expect(mockedAxios.post).toHaveBeenCalledWith(url);
  // });
});
