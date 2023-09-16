<template>
  <div :class="$style.book" @click="handleClick(book?.id!)">
    <div :class="$style.imgBox">
      <img :src="book?.image ? book?.image : noImage" alt="" />
    </div>
    <div :class="$style.contentBox">
      <h3 :class="$style.title">{{ book?.title }}</h3>
      <p :class="$style.description">{{ book?.description }}</p>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-globe"></i>
          <div>{{ book?.language }}</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-book?-open"></i>
          <div>{{ book?.pageCount }}</div>
        </div>
      </div>
      <div :class="$style.info">
        <div :class="$style.item">
          <i class="fa-solid fa-user"></i>
          <div :class="$style.author">{{ book?.authors[0] }}</div>
        </div>
        <div :class="$style.item">
          <i class="fa-solid fa-calendar"></i>
          <div>{{ book && book?.publishedDate.slice(0, 4) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import { useRouter } from "vue-router";
import { Types } from "@/modules/home";
import noImage from "@/assets/images/no-image.png";

const router = useRouter();

const props = defineProps({
  book: { type: Object as PropType<Types.IEntity.Book> },
});
const handleClick = (id: string) => {
  router.push(`/book/detail/${id}`);
};
const book = props.book;
</script>

<style module scoped>
@import "./book.module.scss";
</style>
