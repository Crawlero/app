<script setup lang="ts">
import { LucideCalendar, LucidePanelTop, LucidePickaxe } from "lucide-vue-next";
import { ref, h } from "vue";
import { useRoute } from "vue-router";
import { cn } from "@/lib/utils";
import { useToast } from "~/components/ui/toast";

const route = useRoute();

const isEditingName = ref(false);
const isEditingDescription = ref(false);

const navs: {
  title: string;
  href: string;
  description: string;
  icon: VNode;
}[] = [
  {
    title: "Scheme",
    href: "",
    description: "Define the scheme of the crawler",
    icon: h(LucidePanelTop),
  },
  {
    title: "Schedule",
    href: "/schedule",
    description: "Define the schedule of the crawler",
    icon: h(LucideCalendar),
  },
];

const baseRoute = `/console/crawlers/${route.params.id}`;

const { toast } = useToast();

const { data: crawler } = await useFetch<any>(
  "/api/crawler/" + route.params.id,
  {
    key: `crawler-${route.params.id}`,
  },
);

const editableName = ref(crawler.value?.name);
const editableDescription = ref(crawler.value?.description || "Edit description");

async function updateCrawler(data: Partial<Crawler>) {
  try {
    await $fetch(`/api/crawler/${route.params.id}`, {
      method: "PATCH",
      body: data,
    });

    toast({
      title: "Success",
      description: "Crawler updated",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to update crawler",
    });
  }
}

const saveDescription = async () => {
  await updateCrawler({ description: editableDescription.value });
  isEditingDescription.value = false;
};

const saveName = async () => {
  await updateCrawler({ name: editableName.value });
  isEditingName.value = false;
};
</script>

<template>
  <header class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <LucidePickaxe class="mr-2 h-4 w-4" />
      <h2
        v-if="!isEditingName"
        @click="isEditingName = true"
        class="text-lg font-semibold tracking-tight cursor-pointer"
      >
        {{ editableName }}
      </h2>
      <Input
        v-else
        v-model="editableName"
        @blur="saveName"
        @keyup.enter="saveName"
      />
    </div>
  </header>

  <div class="mt-4">
    <p
      v-if="!isEditingDescription"
      @click="isEditingDescription = true"
      class="mt-2 text-sm text-gray-500 cursor-pointer"
    >
      {{ editableDescription }}
    </p>
    <Textarea
      v-else
      v-model="editableDescription"
      @blur="saveDescription"
      @keyup.enter="saveDescription"
    />
  </div>

  <main class="mt-8">
    <div class="border-b border-gray-200 mb-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem
            v-for="nav in navs"
            :key="nav.title"
            :description="nav.description"
            :title="nav.title"
            class="pr-2"
          >
            <NavigationMenuLink
              :href="`${baseRoute}${nav.href}`"
              :class="
                cn('flex items-center space-x-2', {
                  'font-semibold': baseRoute + nav.href === $route.path,
                })
              "
            >
              <component :is="nav.icon" class="h-4 w-4" />
              <span>{{ nav.title }}</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>

    <NuxtPage />
  </main>
</template>
