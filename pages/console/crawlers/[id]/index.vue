<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md">
    <form @submit.prevent="updateConfig" v-if="config">
      <div v-if="Object.keys(errors).length" class="mb-4 text-red-500">
        <p v-for="(error, key) in errors" :key="key">{{ error }}</p>
      </div>

      <div class="mb-4">
        <Label for="url" class="font-bold mb-2">URL:</Label>
        <Input
          v-model="config.url"
          id="url"
          placeholder="https://facebook.com"
        />
      </div>

      <div class="mb-4">
        <Label for="name" class="font-bold mb-2">Item name:</Label>
        <Input
          type="text"
          v-model="config.schema.name"
          id="name"
          placeholder="post"
        />
      </div>

      <div class="mb-4">
        <Label for="baseSelector" class="font-bold mb-2">Base Selector:</Label>
        <Input
          type="text"
          v-model="config.schema.baseSelector"
          id="baseSelector"
          placeholder=".post.content"
        />
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
        <Button type="submit" :disabled="updating">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="updating" />
          Update
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { LucidePlusCircle } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { parseCrawlerSchema } from "~/lib/crawler";
import { FieldTypes, type CrawlerSchema } from "~/lib/types/crawler";
import { useToast } from "@/components/ui/toast/use-toast";
import { Loader2 } from "lucide-vue-next";
import type { Crawler } from "@prisma/client";

type FormDataType = {
  url: string;
  schema: CrawlerSchema;
};

const route = useRoute();
const { toast } = useToast();

const updating = ref(false);

const { data: crawler } = await useFetch<Crawler>(
  "/api/crawler/" + route.params.id,
  {
    key: `crawler-${route.params.id}`,
  },
);

const config = ref<FormDataType>({
  url: crawler.value?.url || "",
  schema: parseCrawlerSchema(crawler.value?.schema),
});

const errors = ref<Record<string, string>>({});

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

const updateConfig = async () => {
  errors.value = validateConfig();

  if (Object.keys(errors.value).length) {
    return;
  }

  updating.value = true;
  try {
    await $fetch(`/api/crawler/${route.params.id}`, {
      method: "PATCH",
      body: {
        url: config.value?.url,
        schema: JSON.stringify(config.value?.schema),
      },
    });

    toast({
      title: "Schema Updated",
      description: "Crawler schema has been updated successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to update crawler schema",
    });
  } finally {
    updating.value = false;
  }
};

function validateConfig() {
  const errors: Record<string, string> = {};

  if (!config.value?.url) {
    errors.url = "URL is required";
  }

  if (!config.value?.schema.name) {
    errors.name = "Item name is required";
  }

  if (!config.value?.schema.baseSelector) {
    errors.baseSelector = "Base Selector is required";
  }

  config.value?.schema.fields.forEach((field, index) => {
    if (!field.name) {
      errors[`fields[${index}].name`] = `Field ${index + 1} name is required`;
    }

    if (!field.selector) {
      errors[`fields[${index}].selector`] =
        `Field ${index + 1} selector is required`;
    }
  });

  return errors;
}
</script>
