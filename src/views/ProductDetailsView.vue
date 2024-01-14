<template>
  <div class="product-details">
    <h1>Product Details</h1>
    <div>
      <p>ID: {{ productId }}</p>
<!--  <p>Title: {{ product.title }}</p>-->
      <!-- Display other product details as needed -->
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<script>
import {defineComponent, ref,} from 'vue';
import {useRoute} from "vue-router";
import {onBeforeMount} from "@vue/runtime-core";


export default defineComponent({
  name: 'ProductDetailsView',
  setup() {
    const route = useRoute()
    console.log(route)
    const productId = ref(route.params.productId);

    onBeforeMount(()=> {
      console.log('productId',productId.value)
      //fetch to get one product
    })

    return {productId}
  },
});
</script>


