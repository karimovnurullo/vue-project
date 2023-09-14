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

<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import { useRouter } from "vue-router";
import { Mappers, Types } from "@/modules/home";

const router = useRouter();

const props = defineProps({
  book: { type: Object as PropType<Types.IEntity.Book> },

  reload: Boolean,
});
const handleClick = (id: string) => {
  if (props.reload) {
    window.location.reload();
    router.push(`/book/detail/${id}`);
  } else {
    router.push(`/book/detail/${id}`);
  }
};
const book = Mappers.Book(props.book);
</script>

<style module scoped>
@import "./book.module.scss";
</style>
