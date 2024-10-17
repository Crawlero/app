<script setup lang="ts">
import { ref } from "vue";
import GithubIcon from "~/assets/icons/github.png";
import GoogleIcon from "~/assets/icons/google.png";

const loading = ref(false);

const handleLogin = (provider: string) => {
  loading.value = true;
  window.location.href = `/auth/${provider}`;
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full h-screen space-y-4 bg-gradient-to-r from-emerald-500 to-emerald-900"
  >
    <div
      class="flex flex-col items-center justify-center space-y-4 bg-white p-8 rounded-lg shadow-lg"
    >
      <div class="flex flex-col space-y-2 text-center">
        <div class="flex items-center">
          <h1 class="text-2xl font-semibold text-primary mr-2">Login to</h1>
          <Brand />
        </div>
      </div>

      <a
        v-if="!loading"
        @click.prevent="handleLogin('google')"
        href="#"
        class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <img :src="GoogleIcon" alt="Google" class="w-6 h-6" />
        <span class="font-semibold">Google</span>
      </a>

      <a
        v-if="!loading"
        @click.prevent="handleLogin('github')"
        href="#"
        class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <img :src="GithubIcon" alt="GitHub" class="w-6 h-6" />
        <span class="font-semibold">GitHub</span>
      </a>

      <div v-if="loading" class="flex items-center justify-center space-x-2">
        <span class="text-lg font-semibold">Loading...</span>
        <svg
          class="animate-spin h-5 w-5 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>

      <p class="px-8 pt-2 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our
        <NuxtLink
          to="/terms"
          class="underline underline-offset-4 hover:text-primary"
          >Terms of Service</NuxtLink
        >
        and
        <NuxtLink
          to="/privacy"
          class="underline underline-offset-4 hover:text-primary"
          >Privacy Policy</NuxtLink
        >.
      </p>
    </div>
  </div>
</template>
