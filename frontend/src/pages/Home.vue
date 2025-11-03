<script setup lang="ts">
import { Filter } from "frappe-ui/frappe";
import { ref, watch } from "vue";
import { createResource } from "frappe-ui";

const foo = ref([]);
</script>

<template>
  <main class="grid gap-5 m-20 p-3 rounded">
    {{ JSON.stringify(foo) }}
    <br />
    <br />

    <Filter v-model="foo" doctype="ToDo" />
  </main>
</template>
