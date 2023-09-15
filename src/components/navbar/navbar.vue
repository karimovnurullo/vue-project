<template>
  <div :class="$style.navbarWrapper">
    <div :class="$style.navbar">
      <div :class="$style.logoWrapper">
        <div :class="$style.back" @click="handleHome">
          <i class="fa-solid fa-angle-left"></i>
        </div>
        <div :class="$style.logo" @click="handleHome">
          Books <span>beta</span>
        </div>
      </div>
      <div :class="isSearch === true ? $style.center : $style.centerNone">
        <input
          type="search"
          :class="$style.search"
          placeholder="Search book..."
          @input="(e) => handleSearch!((e.target as HTMLInputElement).value)"
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

<script setup lang="ts">
import { ref, onMounted, type PropType } from "vue";
import { useRouter } from "vue-router";
import { number } from "yup";
import { AuthService } from "@/modules/auth";
import type { Types } from "@/modules/home";

const props = defineProps({
  handleSearch: {
    type: Function as PropType<(value: string) => void>,
    required: false,
  },
  result: { type: Number, required: false },
  isSearch: { type: Boolean, required: true },
  isback: { type: Boolean, required: true },
});

const router = useRouter();
let user = ref<Types.IEntity.User>({} as Types.IEntity.User);
let dropdown = ref(false);

const getUser = async () => {
  const data = await AuthService.GetUser();
  user.value = data as Types.IEntity.User;
};

const handleDropdown = async () => {
  dropdown.value = !dropdown.value;
};

const handleLogout = () => {
  AuthService.logout();
  router.push("/auth/login");
};

const handleHome = () => {
  router.push("/");
};

onMounted(() => {
  getUser();
});
</script>

<style module scoped>
@import "./navbar.module.scss";
</style>
