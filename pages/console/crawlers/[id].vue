<script setup lang="ts">
import { LucideCalendar, LucidePanelTop, LucidePickaxe } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { cn } from "@/lib/utils";

interface Crawler {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  runCount: number;
  lastStatus: "pending" | "processing" | "success" | "failed";
}

const route = useRoute();
const originalCrawler = ref<Crawler>({
  id: "",
  name: "",
  description: "",
  lastRun: "",
  runCount: 0,
  lastStatus: "pending",
});
const crawler = ref<Crawler>({
  id: "",
  name: "",
  description: "",
  lastRun: "",
  runCount: 0,
  lastStatus: "pending",
});

const isEditingName = ref(false);
const isEditingDescription = ref(false);

onMounted(() => {
  const crawlerId = route.params.id;
  const fetchedCrawler = {
    id: crawlerId as string,
    name: "Sample Crawler",
    description: "Sample description of the crawler.",
    lastRun: "2023-10-01",
    runCount: 10,
    lastStatus: "success" as Crawler["lastStatus"],
  };
  originalCrawler.value = { ...fetchedCrawler };
  crawler.value = fetchedCrawler;
});

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

definePageMeta({
  layout: "console",
});
</script>

<template>
  <header class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <LucidePickaxe class="mr-2 h-4 w-4" />
      <div v-if="isEditingName">
        <input
          type="text"
          v-model="crawler.name"
          @blur="isEditingName = false"
          class="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <h2
        v-else
        @click="isEditingName = true"
        class="text-lg font-semibold tracking-tight cursor-pointer"
      >
        {{ crawler.name }}
      </h2>
    </div>
  </header>

  <div class="mt-4">
    <div v-if="isEditingDescription">
      <textarea
        v-model="crawler.description"
        @blur="isEditingDescription = false"
        @focusout="isEditingDescription = false"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      ></textarea>
    </div>
    <p
      v-else
      @click="isEditingDescription = true"
      class="mt-2 text-sm text-gray-500 cursor-pointer"
    >
      {{ crawler.description }}
    </p>
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
