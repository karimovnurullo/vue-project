import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { LoginToken } from "@/pages";
import { isValidToken, timer } from "@/utils";
import { createPinia, setActivePinia } from "pinia";
import { useStore } from "@/store";

vi.mock("vue-router");

describe("Login component ", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("Is not active button while name input is empty", () => {
    const loginComponent = mount(LoginToken);
    const button = loginComponent.get("button");
    const isButtonDisabled = button.attributes("disabled") === "";
    expect(true).toBe(isButtonDisabled);
  });

  test("Is active button while name input is empty", async () => {
    const loginComponent = mount(LoginToken);
    const inputName = loginComponent.find("input[data-test-name-input]");
    const inputToken = loginComponent.find("input[data-test-token-input]");

    await inputName.setValue("hello world");
    await inputToken.setValue("hello world");

    const button = loginComponent.get("button");
    const isButtonDisabled = button.attributes("disabled") === "";
    expect(false).toBe(isButtonDisabled);
  });

  test("Does the timer wait for the specified time when the login button is pressed", async () => {
    const delay = 3000;
    const start = Date.now();
    await timer(delay);
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(delay);
  });

  test("is valid Token", async () => {
    expect(isValidToken("sdfdsasdfffdsada")).toBe(true);
    expect(isValidToken("abcdef1234567890")).toBe(false);
    expect(isValidToken("sdfdsasdfffdsada1")).toBe(false);
    expect(isValidToken("sdfdsasdfffdsad")).toBe(false);
  });

  test("The login button is pressed", async () => {
    const loginComponent = mount(LoginToken, {
      props: { initialLoading: true },
    });
    const button = loginComponent.get("button").text();
    expect(button).toBe("Login in...");
  });
  test("The login button is not pressed", async () => {
    const loginComponent = mount(LoginToken, {
      props: { initialLoading: false },
    });
    const button = loginComponent.get("button").text();
    expect(button).toBe("Login");
  });
});
