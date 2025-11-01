<script setup>
import { Button, createResource } from "frappe-ui";
import FilterIcon from "./FilterIcon.vue";
import { Popover } from "frappe-ui";
import Inputs from "./Inputs.vue";

let doctypeResp = createResource({
  url: "frappe.desk.form.load.getdoctype",
  method: "GET",
  params: { doctype: "ToDo" },
	auto:true,

  transform(data) {
    let fields = data.docs[0].fields;

    const options = fields.map((x) => {
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

		return options;
  },
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
      <Inputs :doctype-fields="doctypeResp.data" />
    </template>
  </Popover>
</template>
