<template>
  <div :class="$style.navbarWrapper">
    <div :class="$style.navbar">
      <div :class="$style.logo">Books <span>beta</span></div>
      <div :class="$style.center">
        <input
          type="search"
          :class="$style.search"
          placeholder="Search book..."
          @input="(e) => handleSearch(e.target.value)"
        />
        <div :class="$style.result">{{ result }} <span>found</span></div>
      </div>
      <div :class="$style.profile" @click="handleDropdown">
        {{ user && user.displayName ? user.displayName.charAt(0) : "" }}
        <div
          id="dropdown"
          :class="[$style.dropdown, { [$style.active]: dropdown }]"
        >
          <div :class="$style.email">
            {{ user && user.email ? user.email : "No email" }}
          </div>
          <div :class="$style.item && $style.hr"></div>
          <div :class="$style.item" @click="handleLogout">Log out</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  handleSearch: { type: Function },
  result: number,
});

import { GetUser, logout } from "../../modules/auth/service";
import { number } from "yup";
const router = useRouter();
let user = ref(null);
let dropdown = ref(false);

const getUser = async () => {
  const data = await GetUser();
  user.value = data;
};
const handleDropdown = async () => {
  dropdown.value = !dropdown.value;
};

const handleLogout = () => {
  logout();
  router.push("/auth/login");
};

onMounted(() => {
  getUser();
});
</script>

<style module scoped>
@import "./navbar.module.scss";
</style>
