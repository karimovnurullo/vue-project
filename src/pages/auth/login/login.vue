<template>
  <div :class="$style.login">
    <div :class="$style.title">Login page</div>
    <form :class="$style.form" @submit.prevent="handleLogin">
      <label for="email" :class="$style.label">Email</label>
      <input
        type="text"
        id="email"
        placeholder="Email"
        :class="$style.input"
        v-model="email"
      />

      <label for="password" :class="$style.label">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        :class="$style.input"
        v-model="password"
      />
      <button type="submit" :class="$style.button">Login</button>
      <p :class="$style.haveAccount">
        Don't have an account?
        <router-link to="/auth/register" :class="$style.registerLink"
          >register</router-link
        >
        in it
      </p>
      <h3 :class="$style.or">or</h3>
      <GoogleButton />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { useToast } from "vue-toast-notification";
import { GoogleButton } from "../../../components";
import { AuthService } from "../../../modules/auth";
import "vue-toast-notification/dist/theme-sugar.css";
const router = useRouter();

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const email = ref("");
const password = ref("");
const $toast = useToast();
const handleLogin = async () => {
  try {
    await validationSchema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false }
    );

    await AuthService.login({
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (error) {
    if (error.name === "ValidationError") {
      error.inner.forEach((err) => {
        $toast.error(err.message, { position: "top-right" });
      });
    } else {
      $toast.error(error?.message, { position: "top-right" });
    }
  }
};
</script>

<style module scoped>
@import "../auth.module.scss";
</style>
