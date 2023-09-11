<template>
  <div :class="$style.navbarWrapper">
    <div :class="$style.navbar">
      <div :class="$style.logo">Books</div>
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
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

import { GetUser, logout } from "../../modules/auth/service";
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

watchEffect(() => {
  getUser();
});
</script>

<style module scoped>
@import "./navbar.module.scss";
</style>
