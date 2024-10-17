<template>
  <div class="brand-container flex items-center space-x-3 p-2">
    <a
      href="/"
      class="brand-text text-2xl font-bold bg-gradient-to-r from-green-700 via-lime-500 to-green-400 text-transparent bg-clip-text transition duration-300 hover:animate-crazy-glitch"
    >
      Crawlero
    </a>
  </div>
</template>

<script setup></script>

<style scoped>
@keyframes crazy-glitch {
  0% {
    opacity: 1;
    transform: none;
  }
  10% {
    opacity: 0.8;
    transform: translate(-3px, -3px) rotate(1deg) scale(1.05);
    color: #ff003c;
  }
  20% {
    opacity: 0.4;
    transform: translate(3px, 3px) rotate(-1deg) scale(0.98);
    color: #00ffcc;
  }
  30% {
    opacity: 0.9;
    transform: translate(-4px, 4px) rotate(2deg) scale(1.02);
    color: #ffcc00;
  }
  40% {
    opacity: 0.6;
    transform: translate(4px, -4px) rotate(-2deg) scale(1.1);
    color: #ccff00;
  }
  50% {
    opacity: 0.8;
    transform: translate(-3px, 3px) rotate(1deg) scale(1);
    color: #00ccff;
  }
  60% {
    opacity: 0.5;
    transform: translate(3px, -3px) rotate(-3deg) scale(1.07);
    color: #ff0066;
  }
  70% {
    opacity: 0.9;
    transform: translate(-4px, 4px) rotate(3deg) scale(0.95);
    color: #00ff99;
  }
  80% {
    opacity: 0.3;
    transform: translate(4px, -4px) rotate(-1deg) scale(1.05);
    color: #ff6600;
  }
  90% {
    opacity: 0.7;
    transform: translate(-3px, 3px) rotate(2deg) scale(1.03);
    color: #66ff00;
  }
  100% {
    opacity: 1;
    transform: none;
    color: #ffffff;
  }
}

.hover\:animate-crazy-glitch:hover {
  animation: crazy-glitch 0.5s infinite;
}
</style>
