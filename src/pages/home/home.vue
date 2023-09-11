<template name="Home">
  <div :class="$style.container">
    <Navbar />
    <div :class="$style.wrapper">
      <Book />
    </div>
  </div>
</template>

<script setup>
import { Navbar, Book } from "../../components";
</script>

<style scoped module>
@import "./home.module.scss";
</style>
