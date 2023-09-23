import { HomeService } from "@/modules/home";
import type { Api } from "@/modules/home/types";
import axios, { isAxiosError } from "axios";
import { test, describe, expect } from "vitest";

describe("Sevice fetch api", () => {
  test("Get books list", async () => {
    let response = {} as { status: number };

    try {
      // const data = await axios.get<Api.Book.Single.Respons>(
      //   `https://www.googleapis.com/books/v1/volumes?q=programming`
      // );
      const data = await HomeService.GetBooks({
        search: "programming",
        startIdx: 1,
      });
      response.status = data.status;
    } catch (e: any) {
      if (isAxiosError(e)) {
        response.status = e.response?.status || 500;
        console.log(e.message);
      }
    }
    expect(response.status).toBe(200);
  });
  test("Get single book", async () => {
    let response = {} as { status: number };

    try {
      // const data = await axios.get<Api.Book.Single.Respons>(
      //   `https://www.googleapis.com/books/v1/volumes/2kLADwAAQBAJ`
      // );
      const data = await HomeService.GetBook("pXDzdJ_1E3oC");
      response.status = data.status;
    } catch (e: any) {
      if (isAxiosError(e)) {
        response.status = e.response?.status || 500;
        console.log(e.message);
      }
    }
    expect(response.status).toBe(200);
  });

  test("Get similar books ", async () => {
    let response = {} as { status: number };

    try {
      // const data = await axios.get<Api.Book.Single.Respons>(
      //   `https://www.googleapis.com/books/v1/volumes?q=programming`
      // );
      const data = await HomeService.GetSimilarBooks("programming");
      response.status = data.status;
    } catch (e: any) {
      if (isAxiosError(e)) {
        response.status = e.response?.status || 500;
        console.log(e.message);
      }
    }
    expect(response.status).toBe(200);
  });
});
