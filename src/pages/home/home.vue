<template name="Home">
  <div :class="$style.container">
    <Navbar />
  </div>
</template>

<script setup>
import { Navbar } from "../../components";
</script>

<style scoped module>
@import "./home.module.scss";
</style>
