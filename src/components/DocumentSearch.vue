<template>
  <form @submit.prevent="searchDocument">
    <input class="input-search" type="text" placeholder="Введите ID документа" v-model.trim="searchId" required>
    <div class="text-error" v-if="documentStore.isError">{{documentStore.errorSearchMessage}}</div>
  </form>
</template>

<script setup>
import {ref} from 'vue'
import { useDocumentStore } from '@/store/DocumentStore'

const documentStore = useDocumentStore();
const searchId = ref('')

const searchDocument = () => {
  documentStore.searchDocument(searchId.value)
  searchId.value = ''
}

</script>

<style lang="scss" scoped>
.input-search {
    background: #fff;
    border: 1px solid #E9ECEF;
    border-radius: 8px;
    padding: 15px 24px;
    width: 100%;
}
.text-error {
  color: red;
  font-size: 12px;
  line-height: 1.2;
  margin-top: 4px;
}
</style>