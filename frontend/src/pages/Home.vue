<script setup lang="ts">
import Filter from "../ui/Filter/Filter.vue";
import { ref } from "vue";

const foo = ref([]);
</script>

<template>
  <main class="flex m-20 p-3 rounded">
    <Filter v-model="foo" doctype="ToDo" />
  </main>
</template>
