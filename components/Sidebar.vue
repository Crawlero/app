<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  LucideGhost,
  LucideHome,
  LucidePickaxe,
  LucideSettings,
} from "lucide-vue-next";
</script>

<template>
  <div :class="cn('pb-12', $attrs.class ?? '')">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2">
        <div class="space-y-1">
          <NuxtLink to="/console">
            <Button variant="ghost" class="w-full justify-start">
              <LucideHome class="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </NuxtLink>
          <NuxtLink to="/console/crawlers">
            <Button variant="ghost" class="w-full justify-start">
              <LucidePickaxe class="mr-2 h-4 w-4" />
              Crawlers
            </Button>
          </NuxtLink>
          <Button variant="ghost" class="w-full justify-start">
            <LucideGhost class="mr-2 h-4 w-4" />
            Proxy
          </Button>
          <Button variant="ghost" class="w-full justify-start">
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
