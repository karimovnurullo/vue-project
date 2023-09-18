<template>
  <div :class="$style.book">
    <div :class="$style.icon" @click="handleLike">
      <i
        v-if="store.findFavorite(book?.id!)"
        :class="$style.liked"
        class="fa-solid fa-heart"
      ></i>
      <i v-else :class="$style.niLiked" class="fa-regular fa-heart"></i>
    </div>
    <div @click="handleClick">
      <div :class="$style.imgBox">
        <img :src="book?.image ? book?.image : noImage" alt="" />
      </div>
      <div :class="$style.contentBox">
        <h3 :class="$style.title">
          {{ book?.title }}
        </h3>
        <p :class="$style.description">{{ book?.description }}</p>
        <div :class="$style.info">
          <div :class="$style.item">
            <i class="fa-solid fa-globe"></i>
            <div>{{ book?.language }}</div>
          </div>
          <div :class="$style.item">
            <i class="fa-solid fa-book-open"></i>
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
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, type PropType } from "vue";
import { useRouter } from "vue-router";
import { Types } from "@/modules/home";
import noImage from "@/assets/images/no-image.png";
import { useStore } from "@/store";

const router = useRouter();
const store = useStore();

const props = defineProps({
  book: { type: Object as PropType<Types.IEntity.Book> },
});
const handleClick = () => router.push(`/book/detail/${props.book?.id!}`);

const isBookInFavorites = () => {
  return store.findFavorite(props.book?.id!);
};
const handleLike = () => {
  const isFavorite = store.findFavorite(props.book?.id!);
  console.log("Clicked");
  if (isFavorite) {
    store.removeFavorite(props.book?.id!);
    console.log(store.favorites);
  } else {
    console.log(store.favorites);
    store.addFavorite(props.book?.id!);
  }
};

const book = props.book;
</script>

<style module scoped>
@import "./book.module.scss";
</style>
