<template>
  <div class="document">
    <div class="document__img_wr">
      <img class="document__img" :src="documentCurrent.image" :alt="documentCurrent.name">
    </div>
    <div class="document__info">
      <div class="document__title document_page__title">{{documentCurrent.name}}</div>
      <div class="document__info_btns">
        <MyButton label="Скачать" rounded  @click="downloadImage"/>
        <MyButton label="Удалить" color="warning" rounded @click="deleteDocument"/>
      </div>
      <h3 class="document_page__title">Описание:</h3>
      <div class="document__description">{{documentCurrent.description}}</div>
    </div>
  </div>
</template>

<script setup>
import { useDocumentStore } from '@/store/DocumentStore'
import MyButton from '@/components/UI/MyButton.vue'
import { storeToRefs } from 'pinia'

const documentStore = useDocumentStore();
const { documentCurrent } = storeToRefs(documentStore)


const downloadImage = () =>{
  documentStore.downloadImage(documentCurrent.value.image, documentCurrent.value.name)
}
const deleteDocument = () => {
  documentStore.deleteDocumentCurrent()
}
</script>

<style lang="scss" scoped>
.document {
  display: grid;
  grid-template-columns: minmax(200px, 424px)  minmax(200px, 1fr);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  &__img_wr {
    max-width: 424px;
    margin-right: 60px;
    margin-bottom: 30px;
    @media (max-width: 900px) {
      margin-right: 0;
    }
  }
  &__img {
    width: 100%;
    height: auto;
  }
  &__info_btns {
    margin-bottom: 47px;
    button:not(:last-child) {
      margin-right: 17px;
    }
  }
  &__description {
    font-size: 14px;
    line-height: 17px;
    color: #6C757D;
  }
}
</style>