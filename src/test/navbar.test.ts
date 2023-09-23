import { test, describe, vi, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Navbar } from "@/components";
import { createPinia, setActivePinia } from "pinia";
import useStore from "./../store/useStore";

// global: {
//   stubs: ["router-link", "router-view"],
// },
vi.mock("vue-router");

describe("Navbar component", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Favorite icon noactive", () => {
    const navBarComponent = mount(Navbar, {
      props: { favorites: [] },
    });
    const isButton = navBarComponent.find("[data-favorite-icon]").exists();
    expect(isButton).toBe(false);
  });

  test("favorite icon active", () => {
    const navBarComponent = mount(Navbar, {
      props: { favorites: [1, 1] },
    });
    const isButton = navBarComponent.find("[data-favorite-icon]").exists();
    expect(isButton).toBe(true);
  });

  test("Back button is active when book details are entered", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: true, isSearch: false },
    });
    const isButton = navBarComponent.find("[data-back-button]").exists();
    expect(isButton).toBe(true);
  });

  test("Back button is not active when book details are entered", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: false, isSearch: true },
    });
    const isButton = navBarComponent.find("[data-back-button]").exists();
    expect(isButton).toBe(false);
  });

  test("Back button is active when book details are entered", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: true, isSearch: false },
    });
    const isButton = navBarComponent.find("[data-back-button]").exists();
    expect(isButton).toBe(true);
  });

  test("Search input is active", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: false, isSearch: true },
    });
    const isButton = navBarComponent.find("[data-search-input]").exists();
    expect(isButton).toBe(true);
  });

  test("Search input is not active", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: true, isSearch: false },
    });
    const isButton = navBarComponent.find("[data-search-input]").exists();
    expect(isButton).toBe(false);
  });

  test("Responsove search icon is active", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: false, isSearch: true },
    });
    const isButton = navBarComponent.find("[data-search-icon]").exists();
    expect(isButton).toBe(true);
  });

  test("Responsove search icon is not active", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: true, isSearch: false },
    });
    const isButton = navBarComponent.find("[data-search-icon]").exists();
    expect(isButton).toBe(false);
  });
  test("Username is displayed", () => {
    const navBarComponent = mount(Navbar, {
      props: { user: "nurullo" },
    });
    const userName = navBarComponent.find("[data-user-name]").exists();
    expect(userName).toBe(true);
  });
  test("Username is not displayed", () => {
    const navBarComponent = mount(Navbar, {
      props: { user: "" },
    });
    const userName = navBarComponent.find("[data-user-name]").exists();
    expect(userName).toBe(false);
  });
});
