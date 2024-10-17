<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "console",
  middleware() {
    const { loggedIn } = useUserSession();
    if (!loggedIn.value) {
      return navigateTo("/");
    }
  },
});
</script>
