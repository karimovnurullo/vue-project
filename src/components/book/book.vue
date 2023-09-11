<template>
  <div :class="$style.book">
    <div :class="$style.imgBox">
      <img
        src="data:image/png;base64,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"
        alt=""
      />
    </div>
    <div :class="$style.contentBox">
      <h3 :class="$style.title">Karimov book</h3>
      <p :class="$style.description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sunt
        aliquid adipisci debitis, ad in incidunt commodi voluptate. Sequi illum
        sint sed fugiat illo soluta officia ullam odit pariatur saepe!
      </p>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-globe"></i>
          <div>UZ</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-book-open"></i>
          <div>280</div>
        </div>
      </div>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-user"></i>
          <div :class="$style.author">Karimov Nurullo Ominjon O'gli</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-calendar"></i>
          <div>2010</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  book: Object,
});
console.log(props.book);
</script>
<style module scoped>
@import "./book.module.scss";
</style>
