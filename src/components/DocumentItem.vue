<template>
  <div :class="['document_item', {'active': isActiveDocumentItem(id)}]" @click="openDocument(document)">
    <div class="document_item__img_wr">
      <img class="document_item__img" :src="image" :alt="name">
    </div>
    <div class="document_item__info">
      <div class="document_item__title">{{name}}</div>
      <div class="document_item__size">{{size}}</div>
    </div>
  </div>
</template>

<script setup>
import { useDocumentStore } from '@/store/DocumentStore'

const documentStore = useDocumentStore();
const { isActiveDocumentItem, openDocument } = documentStore
const {name, image, size, id} = props.document

const props = defineProps({
  document: {
    type: Object,
    required: true,
    default: () => {}
  }
})

</script>

<style lang="scss" scoped>
.document_item {
  width: 100%;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 18px;
  cursor: pointer;
  transition: .3s;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  &__img_wr {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-right: 1px solid #E0E0E0;
    padding: 10px;
    flex-shrink: 0;
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &__info {
    padding: 15px;
    width: 100%;
    .active & {
      background: #0D6EFD;
    }
  }
  &__title {
    font-size: 14px;
    line-height: 17px;
    color: #212529;
    margin-bottom: 6px;
    .active & {
      color: #fff;
    }
  }
  &__size {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #6C757D;
    .active & {
      color: #fff;
    }
  }
}
</style>