<script setup lang="ts">
import { Button, Combobox, FeatherIcon, Select } from "frappe-ui";
import { getOperators, getValueControl } from "./utils";
import { ref } from "vue";

interface PropTypes {
  doctypeFields: any[];
}

let props = defineProps<PropTypes>();

const dummyObj = {
  field: { fieldName: "", fieldType: "", options: [] },
  operator: "",
  value: "",
};

const rows = ref([dummyObj]);

const insertRow = () => rows.value.push(dummyObj);
const clearRows = () => rows.value = [{}];

const deleteRow = (index: number) => {
  rows.value.splice(index, 1);
  if (rows.value.length === 0) insertRow();
};

const getField = (val: string) => {
  return props.doctypeFields?.find((item) => item.value === val);
};

const updateFilter = (val: any, index: number) => {
  rows.value[index].field.fieldType = getField(val).type;
  rows.value[index].field.options = getField(val).options;
};
</script>

<template>
  <div class="p-3 text-ink-gray-9 grid gap-3">
    <div class="grid grid-cols-[1fr_0.7fr_1fr_auto] gap-3">
      <span>Field</span>
      <span />
      <span>Value</span>
      <b></b>

      <template
        v-for="(row, index) in rows"
      >
        <Combobox
          :options="props.doctypeFields"
          :placeholder='"Select an option..."'
          :disabled="false"
          @update:modelValue="(e) => updateFilter(e, index)"
          v-model="row.field.fieldName"
        />

        <Select
          placeholder="is"
          :options="
            getOperators(
              row.field.fieldType,
              row.field.fieldType,
            )
          "
          v-model="row.operator"
        />

        <component :is="getValueControl(row)" v-model="row.value" />
        <Button icon="x" variant="ghost" @click="deleteRow(index)" />
      </template>
    </div>

    <div class="flex gap-2 justify-between mt-4">
      <Button variant="solid" @click="insertRow()">
        <template #prefix>
          <FeatherIcon name="plus" class="h-4" />
        </template>
        Add Filter
      </Button>

      <Button variant="ghost" @click="clearRows()">
        <template #prefix>
          <FeatherIcon name="trash-2" class="h-4" />
        </template>
        Clear All Filters</Button>
    </div>
  </div>
</template>
