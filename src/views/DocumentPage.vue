<template>
  <transition name="fade-error-msg">
    <ErrorMessage v-if="documentStore.errorGlobalMessage" />
  </transition>
  <div class="document_page">
    <div class="document_page__sidebar">
      <!-- Форма поиска -->
      <div class="document_page__form_wr">
        <h3 class="document_page__title">Поиск документа</h3>
        <DocumentSearch />
      </div>
      <!-- Блок с результатом -->
      <h3 class="document_page__title">Результаты</h3>
      <Loader v-if="documentStore.isLoader" />
      <div class="document_list" v-else-if="documentStore.isDocumentsFound">
        <DocumentItem
          v-for="document in documentStore.documents"
          :key="document.id"
          :document="document"
        />
      </div>
      <div v-else>Ничего не найдено</div>
    </div>

    <div
      :class="[
        'document_page__preview',
        { 'document_page__preview--empty': !documentStore.documentCurrent },
      ]"
    >
      <DocumentPreview v-if="documentStore.documentCurrent" />
      <p v-else class="document_page__preview_text">
        Выберите документ, чтобы посмотреть его содержимое
      </p>
    </div>
  </div>
</template>

<script setup>
import { useDocumentStore } from "@/store/DocumentStore";
import DocumentItem from "@/components/DocumentItem.vue";
import DocumentPreview from "@/components/DocumentPreview.vue";
import DocumentSearch from "@/components/DocumentSearch.vue";
import Loader from "@/components/UI/Loader.vue";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";

const documentStore = useDocumentStore();
</script>

<style lang="scss" scoped>
.document_page {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  min-height: 70vh;
  min-width: 560px;

  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    margin-bottom: 14px;
  }

  &__sidebar {
    padding: 27px 20px 22px 20px;
    background: #fdfdfd;
    border-right: 1px solid #e0e0e0;
    width: 282px;
    flex-shrink: 0;
  }

  &__form_wr {
    margin-bottom: 29px;
  }

  &__preview {
    width: 100%;
    padding: 30px;

    &--empty {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__preview_text {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #6c757d;
  }
}
</style>
