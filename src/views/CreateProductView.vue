<template>
  <div v-if="!isCreated">
    <h1>Add New Product</h1>
    <form @submit.prevent="addProduct" class="productLable">
      <label for="title">Title:</label>
      <input v-model="newProduct.title" type="text" required>

      <label>Category:</label>
      <a-select v-model:value="newProduct.category" show-search placeholder="Select a category" style="width: 200px">
        <a-select-option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </a-select-option>
      </a-select>

      <label for="description">Description:</label>
      <input v-model="newProduct.description" type="text" required>

      <label class="price">Price:</label>
      <input v-model="newProduct.price" type="text" required>

      <label for="image">Image:</label>
      <input type="file" id="image" name="image" accept="image/*">
      
        

      <button  type="submit">Add Product</button>
    </form>
  </div>

  <div v-else class="beackToMein">
      Product add successfully
      <router-link to="/">
        <div>
          Return to main page
        </div>
      </router-link>
    </div>

</template>

<style src="./CreatedProductView.css" lang="css" scoped/>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
}

export default {
  setup() {
    const isCreated = ref(false)
    const newProduct = ref<Product>({
      title: '',
      description: '',
      price: 0,
      category: ''
      
    });

    const categories = ref<string[]>([]);

    onMounted(async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        categories.value = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    });

    const addProduct = async (): Promise<void> => {
      try {
        const response = await axios.post('https://dummyjson.com/products/add', newProduct.value, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Product added successfully:', response);

        if (response.status === 200) {
          isCreated.value = true
        }
      
        newProduct.value = { title: '', description: '', price: 0, category: '' };
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };

    return {
      newProduct,
      categories,
      addProduct,
      isCreated
    };
  },
};
</script>
