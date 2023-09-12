<template>
  <div :class="$style.book" @click="handleClick(book.id)">
    <div :class="$style.imgBox">
      <img :src="book.image" alt="" />
    </div>
    <div :class="$style.contentBox">
      <h3 :class="$style.title">{{ book.title }}</h3>
      <p :class="$style.description">{{ book.description }}</p>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-globe"></i>
          <div>{{ book.language }}</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-book-open"></i>
          <div>{{ book.pageCount }}</div>
        </div>
      </div>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-user"></i>
          <div :class="$style.author">{{ book.authors[0] }}</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-calendar"></i>
          <div>{{ book && book.publishedDate.slice(0, 4) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { Mappers } from "../../modules/home";

const router = useRouter();

const props = defineProps({
  book: Object,
  reload: Boolean,
});
const handleClick = (id) => {
  if (props.reload) {
    window.location.href.reload();
    router.push(`/book/detail/${id}`);

    // Book detail page da turib bookni bosganda yana page reload bo'lib ma'lumotlar o'zgarish keregidin pathname o'zgarishga ulgurmayapti ancha harakat qildim
  } else {
    router.push(`/book/detail/${id}`);
  }
};
const book = Mappers.Book(props.book);
</script>

<style module scoped>
@import "./book.module.scss";
</style>
