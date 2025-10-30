<script setup>
import { Button, createResource } from "frappe-ui";
import FilterIcon from "./FilterIcon.vue";
import { Popover } from "frappe-ui";
import Inputs from "./Inputs.vue";

import { ref } from "vue";

const doctypeFields = ref([]);

let resource = createResource({
  url: "frappe.desk.form.load.getdoctype",
  method: "GET",
  params: { doctype: "ToDo" },
});

resource.fetch().then((r) => {
  doctypeFields.value = r.docs[0].fields
    .map((x) => {
      return {
        label: x.label,
        type: x.fieldtype,
        value: x.fieldname,
        options: x.options?.split("\n"),
      };
    })
    .filter((x) =>
      !["Section Break", "Read Only", "Column Break"].includes(x.type)
    );
});
</script>

<template>
  <Popover>
    <template #target="{ togglePopover }">
      <Button @click="togglePopover()">
        <template #prefix><FilterIcon /></template>
        Filter
      </Button>
    </template>

    <template #body-main>
      <Inputs :doctype-fields="doctypeFields" />
    </template>
  </Popover>
</template>
