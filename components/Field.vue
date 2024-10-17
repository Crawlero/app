<template>
  <div class="mb-4">
    <div class="mb-4 grid grid-cols-6 gap-2">
      <div class="flex items-center space-x-2">
        <LucideTrash
          @click="onRemoveClick(model)"
          class="h-4 w-4 cursor-pointer hover:text-red-900 text-red-500"
        />

        <Input type="text" v-model="model.name" placeholder="Field Name" />
      </div>
      <Input type="text" v-model="model.selector" placeholder="Selector (.h1.title)" />
      <Select v-model="model.type">
        <SelectTrigger>
          <SelectValue v-if="model.type">{{ model.type }}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="type in Object.values(FieldTypes)"
            :key="type"
            :value="type"
          >
            {{ type }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Input
        v-if="model.type === FieldTypes.Attribute"
        v-model="model.attribute"
        type="text"
        placeholder="href, src, data-id"
      />
    </div>

    <div v-if="model.type === FieldTypes.Nested" class="ml-8 border-l-2 border-gray-300 pl-4">
      <div v-if="model.fields" class="">
        <div v-for="(_, index) in model.fields" :key="index">
          <Field
            :onRemoveClick="(_) => model.fields?.splice(index, 1)"
            v-model="model.fields[index]"
          />
        </div>
      </div>

      <div class="">
        <LucidePlusCircle
          class="h-4 w-4 cursor-pointer hover:text-indigo-500"
          @click="addChildField"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucidePlusCircle, LucideTrash } from "lucide-vue-next";
import { FieldTypes } from "~/lib/types/crawler";

type Field = {
  name: string;
  type: FieldTypes;
  selector?: string | undefined;
  attribute?: string | undefined;
  fields: Field[];
};

type FieldsProps = {
  onRemoveClick: (field: Field) => void;
};
defineProps<FieldsProps>();

const model = defineModel<Field>({
  default: {
    name: "",
    type: FieldTypes.Text,
    selector: "",
    fields: [],
  },
});

function addChildField() {
  model.value.fields?.push({
    name: "",
    type: FieldTypes.Text,
    fields: [],
  });
}
</script>
