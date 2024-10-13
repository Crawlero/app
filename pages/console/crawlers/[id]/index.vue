<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md">
    <form @submit.prevent="updateSchema">
      <div class="mb-4">
        <Label for="url" class="font-bold mb-2">URL:</Label>
        <Input type="url" v-model="config.url" id="url" />
      </div>

      <div class="mb-4">
        <Label for="name" class="font-bold mb-2">Name:</Label>
        <Input type="text" v-model="schema.name" id="name" />
      </div>

      <div class="mb-4">
        <Label for="baseSelector" class="font-bold mb-2">Base Selector:</Label>
        <Input type="text" v-model="schema.baseSelector" id="baseSelector" />
      </div>

      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <Label class="font-bold">Fields:</Label>
          <LucidePlusCircle
            class="h-4 w-4 cursor-pointer hover:text-indigo-500"
            @click="addField"
          />
        </div>
        <div v-for="(_, index) in schema.fields" :key="index">
          <Field
            :key="index"
            v-model="schema.fields[index]"
            :onRemoveClick="(_) => removeField(index)"
          />
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <Button type="submit mt-4">Update Schema</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FieldTypes, type Scheme } from "~/lib/scheme";
import { LucidePlusCircle } from "lucide-vue-next";

const schema = ref<Scheme>({
  name: "News Teaser Extractor",
  baseSelector: ".wide-tease-item__wrapper",
  fields: [
    {
      name: "category",
      selector: ".unibrow span[data-testid='unibrow-text']",
      type: FieldTypes.Text,
      fields: [],
    },
    {
      name: "headline",
      selector: ".wide-tease-item__headline",
      type: FieldTypes.Text,
      fields: [],
    },
    {
      name: "summary",
      selector: ".wide-tease-item__description",
      type: FieldTypes.Text,
      fields: [],
    },
    {
      name: "time",
      selector: "[data-testid='wide-tease-date']",
      type: FieldTypes.Text,
      fields: [],
    },
    {
      name: "image",
      type: FieldTypes.Nested,
      selector: "picture.teasePicture img",
      fields: [
        {
          name: "src",
          type: FieldTypes.Attribute,
          attribute: "src",
          fields: [],
        },
        {
          name: "alt",
          type: FieldTypes.Attribute,
          attribute: "alt",
          fields: [],
        },
      ],
    },
    {
      name: "link",
      selector: "a[href]",
      type: FieldTypes.Attribute,
      attribute: "href",
      fields: [],
    },
  ],
});

const config = ref({
  url: "",
});

const addField = () => {
  schema.value.fields.push({
    name: "",
    selector: "",
    type: FieldTypes.Text,
    fields: [],
  });
};

const removeField = (index: number) => {
  schema.value.fields.splice(index, 1);
};

const updateSchema = () => {
  console.log("Schema updated:", schema.value);
};
</script>
