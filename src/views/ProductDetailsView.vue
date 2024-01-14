<template>
  <div class="product-details">
    <h1>Product Details</h1>
    <div class="loading-spinner" v-if="isLoading">
      <!-- Your loading spinner component or styles go here -->
      Loading...
    </div>
    <div v-if="product && product.images" class="image-container">
      <div v-for="img in product.images" :key="img.id" class="image-item">
        <img :src="img" :alt="img.alt" class="product-image" />
      </div>
    </div>
    <div class="product-info">
      <p>Title: <input v-model="product?.title" placeholder="No info" /></p>
      <p>Description: {{ product?.description || "No info" }}</p>
      <p>Price: {{ product?.price || "No info" }}</p>
      <p>Rating: {{ product?.rating || "No info" }}</p>
      <p>Brand: {{ product?.brand || "No info" }}</p>
      <p>Category: {{ product?.category || "No info" }}</p>
    </div>
    <div class="btn-container">
      <a class="btn-uppdate" href="">uppdate</a>
      <a class="btn-d elete" href="">delete</a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.product-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  text-align: center;
  padding: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.image-item {
  flex: 0 0 30%;
  /* Adjust the width as needed */
}
.image-item :hover{
  scale: 150%;
}

.product-image {
  width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-info {
  font-size: 16px;
}

.product-info p {
  margin-bottom: 10px;
}

.btn-container{
  display: flex;
  justify-content: space-between;
}

.btn-container a {
  text-decoration: none;
  cursor: pointer;
  padding: 10px 20px;
  background-color: cadetblue;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: 
}

</style>



<script>
import {defineComponent, ref, Ref} from 'vue';
import {useRoute} from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
import { getProductsById } from "@/services/getProductById"
import { Product } from "@/types"


export default defineComponent({
  name: 'ProductDetailsView',
  setup() {
    const product = ref();
    const isLoading = ref(false)

    const route = useRoute()
    console.log(route)
    const productId = ref(route.params.productId);

    onBeforeMount(async () => {
      try {
        isLoading.value = true
        console.log('productId', productId.value)
        //fetch to get one product
        const result = await getProductsById(productId.value)
        if (result) {
          product.value = result;
        }
        console.log(result)
        isLoading.value = false
      } catch (error) {
        isLoading.value = false
        console.log("Error", error)
      }
      
    })

    return {
      product,
    isLoading
    }
  },
});
</script>


