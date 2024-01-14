<template>
  <router-link class="product_wrapper"  :to="{ name: 'productDetails', params: { productId: product.id } }">
    <img :src="product.thumbnail" alt="Product Image" />
    <p class="product_title">{{ product.title }}</p>
    <p class="description">{{ product.description }}</p>
    <p class="rating">Rating: {{ product.rating }}/5</p>
    <p class="price">Price: ${{ product.price.toFixed(2) }}</p>
  </router-link>
</template>

<script lang="ts">

import { defineComponent} from 'vue';
import {Product} from "@/types"

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
});
</script>

<style src="./ProductCard.css" lang="css" scoped/>


