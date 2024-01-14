<template>
  <header class="header">
    <router-link to="/">
      <div>
        <img src="@/assets/logo.jpg" class="logo_img" alt="Logo" />
      </div>
    </router-link>
    <nav>
      <router-link to="/newProduct" class="create_page">Create</router-link>
    </nav>

  </header>
  <router-view/>
</template>

<script setup lang="ts">
</script>
<style src="./App.css" lang="css" scoped/>