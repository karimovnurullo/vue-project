<template>
  <div :class="$style.bookInfo">
    <div :class="$style.name">Authors:</div>
    <div :class="$style.content" v-for="author in book.authors">
      {{ author }},
    </div>
  </div>
</template>
<script setup></script>
<style scoped module>
@import "./book-info.module.scss";
</style>
