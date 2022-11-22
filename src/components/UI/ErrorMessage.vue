<template>
  <div class="text-error">{{ documentStore.errorGlobalMessage }}</div>
</template>
<script setup>
import {onMounted, onUnmounted} from 'vue'
import { useDocumentStore } from '@/store/DocumentStore'
const documentStore = useDocumentStore();

const removeGlobalMessage = () => documentStore.clearErrorGlobalMessage()
const hideErrorMessage = setTimeout(removeGlobalMessage, 3000)

onMounted(() => {
  document.addEventListener('click', removeGlobalMessage)
})
onUnmounted(() => {
  clearTimeout(hideErrorMessage)
  document.removeEventListener('click', removeGlobalMessage)
})

</script>

<style lang="scss" scoped>
.text-error {
  color: red;
  width: 100%;
  background: rgb(255, 170, 170);
  border: 1px solid red;
  padding: 10px 15px;
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  left: 0;
  transition: .3s;
}
</style>
