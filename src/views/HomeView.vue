<template>
  <div class="home">
    <ProductsList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductsList from '@/components/ProductsList';

export default defineComponent({
  name: 'HomeView',
  components: {
    ProductsList,
  },
});
</script>
