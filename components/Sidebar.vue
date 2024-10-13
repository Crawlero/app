<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  LucideGhost,
  LucideHome,
  LucidePickaxe,
  LucideSettings,
} from "lucide-vue-next";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isActive = (path: string) => computed(() => {
  // if rote is /console
  if (path === "/console") {
    return route.path === "/console";
  }

  return route.path.startsWith(path);
});
</script>

<template>
  <div :class="cn('pb-12', $attrs.class ?? '')">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2">
        <div class="space-y-1">
          <NuxtLink to="/console">
            <Button
              :class="{ 'bg-gray-200': isActive('/console').value }"
              variant="ghost"
              class="w-full justify-start"
            >
              <LucideHome class="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </NuxtLink>
          <NuxtLink to="/console/crawlers">
            <Button
              :class="{ 'bg-gray-200': isActive('/console/crawlers').value }"
              variant="ghost"
              class="w-full justify-start"
            >
              <LucidePickaxe class="mr-2 h-4 w-4" />
              Crawlers
            </Button>
          </NuxtLink>
          <Button
            :class="{ 'bg-gray-200': isActive('/console/proxy').value }"
            variant="ghost"
            class="w-full justify-start"
          >
            <LucideGhost class="mr-2 h-4 w-4" />
            Proxy
          </Button>
          <Button
            :class="{ 'bg-gray-200': isActive('/console/settings').value }"
            variant="ghost"
            class="w-full justify-start"
          >
            <LucideSettings class="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      <div class="py-2">
        <h2 class="relative px-7 text-lg font-semibold tracking-tight"></h2>
        <ScrollArea class="h-[300px] px-1"> </ScrollArea>
      </div>
    </div>
  </div>
</template>
