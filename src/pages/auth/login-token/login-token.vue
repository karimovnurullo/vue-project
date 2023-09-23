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
        data-test-name-input
      />
      <div :class="$style.error">{{ errors.name }}</div>
      <label for="token" :class="$style.label">Token</label>
      <input
        data-test-token-input
        type="text"
        id="token"
        placeholder="Token"
        :class="$style.input"
        v-model="token"
      />
      <div :class="$style.error">{{ errors.token }}</div>
      <button
        :disabled="!name || !token || isLoading"
        type="submit"
        :class="$style.button"
      >
        {{ isLoading ? "Login in..." : "Login" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import "vue-toast-notification/dist/theme-sugar.css";
import { setSession } from "@/modules/session";
import { isValidToken, timer } from "@/utils";
const router = useRouter();

const name = ref("");
const token = ref("");
interface FormErrors {
  name: string;
  token: string;
}

const errors = ref<FormErrors>({ name: "", token: "" });

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  token: Yup.string().test(
    "validToken",
    "Invalid token format 16 letter and only letters",
    isValidToken
  ),
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
      errors.value.name = "";
      errors.value.token = "";
      error.inner.forEach((err: any) => {
        if (err.path) {
          const key = err.path as keyof FormErrors;
          errors.value[key] = err.message;
        }
      });
    } else {
      console.log(error?.message);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style module scoped>
@import "../auth.module.scss";
</style>
