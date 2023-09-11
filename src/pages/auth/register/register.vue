<template>
  <div :class="$style.login">
    <div :class="$style.title">Register page</div>
    <form :class="$style.form" @submit.prevent="handleLogin">
      <GoogleButton />
      <h3 :class="$style.or">or</h3>
      <label for="name" :class="$style.label">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        :class="$style.input"
        v-model="name"
      />
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
      <button type="submit" :class="$style.button">Register</button>
      <p :class="$style.haveAccount">
        Don't have an account?
        <router-link to="/auth/login" :class="$style.registerLink"
          >login</router-link
        >
        in it
      </p>
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
  name: Yup.string().min(4).required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

const name = ref("");
const email = ref("");
const password = ref("");
const $toast = useToast();
const handleLogin = async () => {
  try {
    await validationSchema.validate(
      { name: name.value, email: email.value, password: password.value },
      { abortEarly: false }
    );

    const { user } = await AuthService.register({
      email: email.value,
      password: password.value,
    });
    await AuthService.updateProfile(user, { name: name.value });
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
