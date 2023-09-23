import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { LoginToken } from "@/pages";
import { timer } from "@/utils";

describe("Login component ", () => {
  test("Is disabled button while name input is empty", () => {
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
});
