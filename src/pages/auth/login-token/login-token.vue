<template>
  <div :class="$style.login">
    <div :class="$style.title">Login page</div>
    <form :class="$style.form" @submit.prevent="handleLogin">
      <label for="name" :class="$style.label">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        :class="$style.input"
        v-model="name"
      />
      <label for="token" :class="$style.label">Token</label>
      <input
        type="text"
        id="token"
        placeholder="Token"
        :class="$style.input"
        v-model="token"
      />
      <button type="submit" :class="$style.button" :disabled="isLoading">
        {{ isLoading ? "Logging in..." : "Login" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { setSession } from "@/modules/session";

const isValidToken = (value: string | undefined) => {
  if (!value) {
    return false;
  }
  const validate = /^[a-zA-Z]{16}$/;
  return validate.test(value);
};

const router = useRouter();
const $toast = useToast();

const name = ref("");
const token = ref("");

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  token: Yup.string().test("validToken", "Invalid token format", isValidToken),
});

const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await validationSchema.validate(
      { name: name.value, token: token.value },
      { abortEarly: false }
    );
    setSession(name.value);
    await timer(3000);
    router.push("/");
  } catch (error: any) {
    if (error.name === "ValidationError") {
      error.inner.forEach((err: any) => {
        $toast.error(err?.message, { position: "top-right" });
      });
    } else {
      $toast.error(error?.message, { position: "top-right" });
    }
  } finally {
    isLoading.value = false;
  }
};

const timer = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};
</script>

<style module scoped>
@import "../auth.module.scss";
</style>
