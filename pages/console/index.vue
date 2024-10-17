<script setup lang="ts">
const { loggedIn, user } = useUserSession();
</script>

<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user?.name }}</h1>
  </div>
</template>
