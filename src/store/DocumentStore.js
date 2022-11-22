import { defineStore } from "pinia";
import { addSizeToDocuments, downloadImg } from "@/utils/index";
const API_URL_SEARCH = import.meta.env.VITE_API_URL + "?search=";

export const useDocumentStore = defineStore("DocumentStore", {
  state: () => ({
    documents: [],
    selectedDocument: null,
    isLoader: false,
    errorSearchMessage: "",
    errorGlobalMessage: "",
  }),
  getters: {
    isDocumentsFound() {
      return this.documents.length > 0;
    },
    documentCurrent() {
      return this.selectedDocument;
    },
    isError() {
      return this.errorSearchMessage?.length > 0;
    },
  },
  actions: {
    openDocument(document) {
      this.selectedDocument = document;
    },
    isActiveDocumentItem(id) {
      return this.documentCurrent && this.documentCurrent.id === id;
    },
    deleteDocumentCurrent() {
      this.documents = this.documents.filter(
        (item) => item.id !== this.documentCurrent.id
      );
      this.selectedDocument = null;
    },
    clearErrorGlobalMessage() {
      this.errorGlobalMessage = "";
    },
    async downloadImage(url, fileName) {
      try {
        await downloadImg(url, fileName);
      } catch (e) {
        this.errorGlobalMessage = e.message;
      }
    },
    async searchDocument(documentId) {
      try {
        this.isLoader = true;
        this.errorSearchMessage = "";
        const res = await fetch(`${API_URL_SEARCH}${documentId}`);
        const data = await res.json();
        this.documents = await addSizeToDocuments(data);
      } catch (e) {
        this.documents = "";
        this.errorSearchMessage = e.message;
      } finally {
        this.isLoader = false;
      }
    },
  },
});
