<template>
<div class="container">
  <Header/>
  <DocumentPage/>
</div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import DocumentPage from '@/views/DocumentPage.vue'
</script>

<style>
@import '@/scss/style.scss';
.container {
  padding: 0 50px;
}
</style>
