<template>
  <div :class="$style.navbarWrapper">
    <div :class="$style.navbar">
      <div :class="$style.left">
        <div
          v-if="!isSearch"
          :class="$style.back"
          data-back-button
          @click="handleHome"
        >
          <i class="fa-solid fa-angle-left"></i>
        </div>
        <div :class="$style.logo" @click="handleHome">
          Books
          <!-- <span>beta</span> -->
        </div>
      </div>
      <form
        @submit.prevent="handleSearch!(searchValue)"
        v-if="isSearch"
        :class="search ? $style.centerShow : $style.center"
      >
        <input
          type="search"
          :class="$style.search"
          placeholder="Search book..."
          v-model="searchValue"
          data-search-input
        />
        <!-- <div :class="$style.result">{{ result }} <span>found</span></div> -->
        <div :class="$style.cancel" v-if="isSearch" @click="toggleSearch">
          cancel
        </div>
      </form>
      <div :class="$style.right">
        <div
          v-if="isSearch"
          :class="$style.searchIcon"
          data-search-icon
          @click="toggleSearch"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <router-link to="/favorites" :class="$style.favorite">
          <span v-if="favorites!?.length > 0" data-favorite-icon></span>
          <i class="fa-regular fa-heart"></i>
        </router-link>
        <!-- <i class="fa-solid fa-heart"></i> -->
        <div :class="$style.profile" id="avatar" @click="handleDropdown">
          <!-- {{ user && user.displayName ? user.displayName.charAt(0) : "" }} -->
          <span v-if="user" data-user-name>{{ user.charAt(0) }}</span>
          <div
            id="dropdown"
            :class="[$style.dropdown, { [$style.active]: dropdown }]"
          >
            <div :class="$style.email">
              <!-- {{ user && user.email ? user.email : "No email" }} -->
              {{ user }}
            </div>
            <div :class="$style.item && $style.hr"></div>
            <div :class="$style.item" @click="handleLogout">Log out</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type PropType } from "vue";
import { useRouter } from "vue-router";
import { clearSession } from "@/modules/session";

const props = defineProps({
  isSearch: { type: Boolean, required: false },
  isback: { type: Boolean, required: false },
  favorites: { type: Array, required: false },
  user: { type: String, required: false },
  handleSearch: {
    type: Function as PropType<(searchValue: string) => void>,
    required: false,
  },
});

const router = useRouter();
let dropdown = ref(false);
let search = ref(false);
const windowSize = ref(window.innerWidth);

let searchValue = ref(localStorage.getItem("search") || "");

const handleDropdown = async () => (dropdown.value = !dropdown.value);

const handleHome = () => router.push("/");

const toggleSearch = async () => {
  search.value = !search.value;
  dropdown.value = false;
  localStorage.removeItem("search");
  searchValue.value = "";
};

const handleLogout = () => {
  clearSession();
  router.push("/auth/login");
};

const handleClickOutside = (event: MouseEvent) => {
  const dropdownElement = document.getElementById("avatar");
  if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
    dropdown.value = false;
  }
};

window.addEventListener("resize", () => {
  windowSize.value = window.innerWidth;
  search.value = windowSize.value < 650;
});

onMounted(() => {
  search.value = true;
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<style module scoped>
@import "./navbar.module.scss";
</style>
