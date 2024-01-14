<template>
  <div class="container">
    <h1 class="title">All products</h1>
    <a-spin v-if="isLoading" class="loading"/>
    <p v-if="hasError && !isLoading">
      Ops!Something went wrong.Try again!
    </p>
    <div v-if="!hasError && !isLoading">
      <div class="radio_bts_and_input_wrapper">
        <a-radio-group v-model:value="sortBy">
          <a-radio :style="radioStyle" :value="1">By price</a-radio>
          <a-radio :style="radioStyle" :value="2">By rate</a-radio>
        </a-radio-group>
        <div class="input_wrapper">
          <button
              v-if="searchValue.length > 0"
              @click="clearBtnPress"
          >
            Clear
          </button>

          <a-input-search
              v-model:value="searchValue"
              placeholder="Search text"
              class="input_search"
              @search="onSearch"
          />
        </div>
      </div>
      <p v-if="products.length === 0" class="empty_text">Ops!We were not able to find any products</p>
      <div class="list_wrapper">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>
      <div class="pagination" v-if="!(searchValue.length > 0)">
        <a-button
            v-if="currentPage > 1"
            type="primary"
            size="small"
            @click="prevPage"
            class="pagination_btn"
        >
          Previous
        </a-button>
        <span class="current_page">{{ currentPage }}</span>
        <a-button
            v-if="currentPage < TOTAL_PAGES"
            type="primary"
            size="small"
            @click="nextPage"
            class="pagination_btn"
        >
          Next
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, onBeforeMount, reactive, Ref, ref, watchEffect} from 'vue';
import {getProducts} from "@/services/getProducts";
import {getProductsBySearch} from "@/services/getProductsBySearch"
import ProductCard from "@/components/ProductCard";
import {Product} from "@/types"


const PAGE_LIMIT = 15
const TOTAL_PRODUCTS = 100
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS/PAGE_LIMIT)
export default defineComponent({
  name: 'ProductsList',
  props: {
    msg: String,
  },
  setup() {
    const products: Ref<Product[]> = ref([]);
    const allProducts: Ref<Product[]> = ref([]);
    const hasError = ref(false)
    const isLoading = ref(false)
    const searchValue = ref("")
    const currentPage = ref(1);
    const sortBy = ref<number>(1);

    const radioStyle = reactive({
      display: 'flex',
      height: '30px',
      lineHeight: '30px',
    });


    const onSearch = async (value: string) => {
      try{
        isLoading.value = true
        const result = await getProductsBySearch(value);

        if (result) {
          products.value = result;
        } else {
          hasError.value = true;
        }
        isLoading.value = false
      }catch (error) {
        console.error('Error', error);
        isLoading.value = false
        hasError.value = true;
      }
    }

    const sortProducts = (products: Product[], sortBy: number): Product[] => {
      if (sortBy === 1) {
        return products.sort((a, b) => a.price - b.price);
      } else if (sortBy === 2) {
        return products.sort((a, b) => a.rating - b.rating);
      }

      return products;
    };

    const prevPage = async () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
        const {result} = checkIfAlreadyDownloaded();
        products.value = result
      }
    }

    const clearBtnPress = () => {
      searchValue.value = ""
      const {alreadyExist,result} = checkIfAlreadyDownloaded()
      if(alreadyExist){
        products.value = result
      }else{
        fetchProducts()
      }
    }
    const checkIfAlreadyDownloaded = (): { alreadyExist: boolean, result: Product[] | []} => {
      const startIdx = (currentPage.value - 1) * PAGE_LIMIT;
      const endIdx = startIdx + PAGE_LIMIT;
      const products = allProducts.value.slice(startIdx, endIdx)
      return {
        alreadyExist: products.length > 0 ,
        result: products
      }
    }

    const nextPage = async () => {

      try {
        currentPage.value += 1

        const {alreadyExist, result} = checkIfAlreadyDownloaded();
        if (alreadyExist) {
          products.value = result
        } else {
          //fetch
          await fetchProducts()
        }
      } catch (error){
        console.log("Error", error)
        hasError.value = true
      }
    }

    const fetchProducts = async () => {
      console.log("fetch products")
      try {
        isLoading.value = true
        const result = await getProducts(PAGE_LIMIT, allProducts.value.length);

        if (result) {
          products.value = result;
          allProducts.value = [...allProducts.value, ...result];
        } else {
          hasError.value = true;
        }
        isLoading.value = false
      } catch (error) {
        console.error('Error', error);
        isLoading.value = false
        hasError.value = true;
      }
    }
    onBeforeMount(fetchProducts);

    watchEffect(() => {
      products.value = sortProducts(products.value, sortBy.value)
    })

    return {
      products,
      hasError,
      isLoading,
      onSearch,
      searchValue,
      currentPage,
      prevPage,
      nextPage,
      clearBtnPress,
      allProducts,
      TOTAL_PRODUCTS,
      TOTAL_PAGES,
      radioStyle,
      sortBy
    };
  },
  components: {
    ProductCard
  }
});
</script>

<style src="./ProductsList.css" lang="css" scoped/>
