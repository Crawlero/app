<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  LucideGhost,
  LucideHome,
  LucidePickaxe,
  LucideSettings,
  LucideLogOut,
} from "lucide-vue-next";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isActive = (path: string) =>
  computed(() => {
    // if route is /console
    if (path === "/console") {
      return route.path === "/console";
    }

    return route.path.startsWith(path);
  });

const { user, clear } = useUserSession();

const router = useRouter();

const handleLogout = () => {
  clear();
  router.push("/");
};
</script>

<template>
  <div :class="cn('pb-12', $attrs.class ?? '')">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2 flex items-center space-x-3">
        <div
          class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center overflow-hidden"
        ></div>
        <div>
          <div class="text-lg font-semibold text-gray-800">
            {{ user?.name }}
          </div>
          <div class="text-sm text-gray-500">{{ user?.email }}</div>
        </div>
      </div>

      <div class="space-y-4 py-2">
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
            <Button
              @click="handleLogout"
              variant="ghost"
              class="w-full justify-start text-red-600"
            >
              <LucideLogOut class="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div class="py-2 px-4 border-t border-gray-200">
        <Brand />
      </div>
    </div>
  </div>
</template>
