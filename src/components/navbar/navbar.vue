<template>
  <div :class="$style.navbarWrapper">
    <div :class="$style.navbar">
      <div :class="$style.left">
        <div v-if="!isSearch" :class="$style.back" @click="handleHome">
          <i class="fa-solid fa-angle-left"></i>
        </div>
        <div :class="$style.logo" @click="handleHome">
          Books
          <!-- <span>beta</span> -->
        </div>
      </div>
      <form
        @submit.prevent="handleSubmit"
        v-if="isSearch"
        :class="search ? $style.centerShow : $style.center"
      >
        <input
          type="search"
          :class="$style.search"
          placeholder="Search book..."
          v-model="searchValue"
        />
        <!-- <div :class="$style.result">{{ result }} <span>found</span></div> -->
        <div :class="$style.cancel" v-if="isSearch" @click="toggleSearch">
          cancel
        </div>
      </form>
      <div :class="$style.right">
        <div v-if="isSearch" :class="$style.searchIcon" @click="toggleSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <router-link to="/favorites" :class="$style.favorite">
          <!-- <div @click="handleFavorite" :class="$style.favorite"> -->
          <span v-if="store.favorites.length > 0" data-favorite-icon></span>
          <i class="fa-regular fa-heart"></i>
          <!-- </div> -->
          <!-- <i class="fa-solid fa-heart"></i> -->
        </router-link>
        <div :class="$style.profile" id="avatar" @click="handleDropdown">
          <!-- {{ user && user.displayName ? user.displayName.charAt(0) : "" }} -->
          {{ user ? user.charAt(0) : "" }}
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
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getSession, clearSession } from "@/modules/session";
import { useStore } from "@/store";

// const props = defineProps({
//   isSearch: { type: Boolean },
//   isback: { type: Boolean },
// });

const props = defineProps({
  isSearch: { type: Boolean, required: true },
  isback: { type: Boolean, required: true },
});

const store = useStore();
const router = useRouter();
let user = ref<string | null>("");
let dropdown = ref(false);
let search = ref(false);
const windowSize = ref(window.innerWidth);

let searchValue = ref(localStorage.getItem("search") || "");

const getUser = async () => {
  // const data = await AuthService.GetUser();
  // user.value = data as Types.IEntity.User;
  user.value = getSession();
};

const handleSubmit = async () => {
  const value = searchValue.value.trim();
  if (value === "") {
    searchValue.value = "";
  }
  store.getBooks(value);
  store.pageCount = 1;
  localStorage.setItem("search", value);
};
const handleDropdown = async () => (dropdown.value = !dropdown.value);

const handleHome = () => router.push("/");

const toggleSearch = async () => {
  search.value = !search.value;
  dropdown.value = false;
  localStorage.removeItem("search");
  searchValue.value = "";
};

const handleLogout = () => {
  // AuthService.logout();
  clearSession();
  router.push("/auth/login");
};
const handleFavorite = () => {
  router.push("/favorites");
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
  getUser();
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
