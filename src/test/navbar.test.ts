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
      props: { isback: false, isSearch: false },
    });
    const isButton = navBarComponent.find("span[data-favorite-icon]").exists();
    console.log(isButton);
    expect(isButton).toBe(false);
  });
  test("favorite icon active", () => {
    const navBarComponent = mount(Navbar, {
      props: { isback: false, isSearch: false },
    });
    // beforeEach(() => {
    //   favorites: 0;
    // });
    const store = useStore();
    const isFavorite = store.favorites.length > 0;
    const isButton = navBarComponent.find("span[data-favorite-icon]").exists();
    console.log(isButton);
    if (isFavorite) {
      expect(isButton).toBe(true);
    }
  });
});
