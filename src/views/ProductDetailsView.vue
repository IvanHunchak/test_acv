<template>
  <div class="product-details" v-if="!isDeletedStatus">
    <h1>Product Details</h1>
    <div class="loading-spinner" v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <div v-if="product && product.images" class="image-container">
        <div v-for="img in product.images" :key="img.id" class="image-item">
          <img :src="img" :alt="img.alt" class="product-image" />
        </div>
      </div>
      <div class="product-info">

        <div class="item_wrapper">
          <p class="item_title">Title:</p>
          <input v-model="product.title" :disabled="!isEditable"
            :class="{ 'editable-input': isEditable, 'readonly-input': !isEditable }" />
        </div>

        <p>Description: {{ product.description }}</p>

        <p>Price: {{ product.price }}</p>

        <div class="item_wrapper">
          <p class="item_title">Rating:</p>
          <input v-model="product.rating" :disabled="!isEditable"
            :class="{ 'editable-input': isEditable, 'readonly-input': !isEditable }" />
        </div>
        <p>Brand: {{ product.brand }}</p>
        <p>Category: {{ product.category }}</p>
      </div>
      <div class="btn-container">
        <a-button v-if="isEditable" type="primary" size="small" @click="onSaveBtnPress" class="btn-uppdate">
          Save
        </a-button>
        <a-button v-else type="primary" size="small" @click="onUpdateBtnPress" class="btn-uppdate">
          Update
        </a-button>

        <a-button type="primary" size="small" @click="deleteProduct" class="btn-delete" :loading="isDeletedLoading">
          Delete
        </a-button>
      </div>
      
    </div>
  </div>
  <div v-else class="beackToMein">
    Product deleted successfully
    <router-link to="/">
      <div>
        Return to main page
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>



<style src="./ProductDetailsView.css" lang="css" scoped/>


<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
import { getProductsById } from "@/services/getProductById"
import { deleteProductById } from "@/services/deleteProductById";


export default defineComponent({
  name: 'ProductDetailsView',
  setup() {
    const product = ref();
    const isLoading = ref(false)
    const isDeletedLoading = ref(false)
    const isDeletedStatus = ref(false)
    const isEditable = ref(false)

    const route = useRoute()
    console.log(route)
    const productId = ref(route.params.productId);
    onBeforeMount(async () => {
      try {
        isLoading.value = true
        console.log('productId', productId.value)

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

    const onUpdateBtnPress = () => {
      console.log("update")
      isEditable.value = true
    }

    const onSaveBtnPress = async () => {
      console.log("here")
      isLoading.value = true

      const result = await fetch(`https://dummyjson.com/products/${productId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product.value.title,
          rating: product.value.rating
        })
      })
  .then(res => res.json())
  .then(res => product.value = res);
isEditable.value = false
isLoading.value = false
    }
const deleteProduct = async () => {
  try {
    isDeletedLoading.value = true;

    const result = await deleteProductById(productId.value)

    console.log('Product deleted successfully', result);

    if (result?.status === 200) {
      isDeletedStatus.value = true
    }

  } catch (error) {
    console.log("Error deleting product", error);
  } finally {
    isDeletedLoading.value = false;
  }
};

return {
  product,
  isLoading,
  isDeletedLoading,
  deleteProduct,
  isDeletedStatus,
  isEditable,
  onUpdateBtnPress,
  onSaveBtnPress,
}
},
});
</script>