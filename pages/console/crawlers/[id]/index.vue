<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md">
    <form @submit.prevent="updateConfig">
      <div class="mb-4">
        <Label for="url" class="font-bold mb-2">URL:</Label>
        <Input type="url" v-model="config.url" id="url" />
      </div>

      <div class="mb-4">
        <Label for="name" class="font-bold mb-2">Name:</Label>
        <Input type="text" v-model="config.schema.name" id="name" />
      </div>

      <div class="mb-4">
        <Label for="baseSelector" class="font-bold mb-2">Base Selector:</Label>
        <Input type="text" v-model="config.schema.baseSelector" id="baseSelector" />
      </div>

      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <Label class="font-bold">Fields:</Label>
          <LucidePlusCircle
            class="h-4 w-4 cursor-pointer hover:text-indigo-500"
            @click="addField"
          />
        </div>
        <div v-for="(_, index) in config.schema.fields" :key="index">
          <Field
            :key="index"
            v-model="config.schema.fields[index]"
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
import { FieldTypes } from "~/lib/scheme";
import { LucidePlusCircle } from "lucide-vue-next";
import { type CrawlerResponse } from "~/server/api/crawler/[id]/index.get";

const route = useRoute();

const defaultConfig = {
  url: "",
  schema: {
    name: "",
    baseSelector: "",
    fields: [],
  },
};

const { data } = useFetch<CrawlerResponse>(`/api/crawler/${route.params.id}`);

const config = ref(data.value?.crawler ?? defaultConfig);

const addField = () => {
  config.value?.schema.fields.push({
    name: "",
    selector: "",
    type: FieldTypes.Text,
    fields: [],
  });
};

const removeField = (index: number) => {
  config.value?.schema.fields.splice(index, 1);
};

const updateConfig = () => {
  console.log("Schema updated:", config.value?.schema);
};
</script>
