<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast } from "./ui/toast";
import { useForm } from "vee-validate";
import { PlusIcon } from "lucide-vue-next";

const { onCreated } = defineProps({
  onCreated: {
    type: Function,
    required: true,
  },
});

const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().optional(),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const open = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch("/api/crawler", {
      method: "POST",
      body: {
        name: values.name,
        description: values.description,
        url: "",
        schema: "",
      },
    });

    toast({
      title: "Crawler created",
      description: "Crawler has been created successfully",
    });

    onCreated();
    open.value = false;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to create crawler",
    });
  }
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>
        <PlusIcon class="w-4 h-4 mr-2" />
        Create crawler
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>New Crawler</DialogTitle>
      </DialogHeader>

      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Crawler name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="First crawler"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter class="mt-8">
          <Button type="submit"> Create </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
