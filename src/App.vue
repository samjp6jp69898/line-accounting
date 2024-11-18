<script>
import { lineLogin, getLineToken } from './services/lineApi.service'
export default {
  data() {
    return {

    };
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('basic/toggleTheme');
    },
    login() {
      lineLogin()
    }
  },
  async mounted() {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      const res = await getLineToken(code)
      console.log(res)
    } else {
      console.error('no code')
    }
  }
};
</script>

<template>
  <div class="app">
    <div class="flex items-center justify-center flex-col h-[100%]">
      <button class="theme-btn" @click="toggleTheme">切換主題</button>
      <button class="theme-btn mt-4" @click="login">login</button>
    </div>
  </div>
</template>

<style>
@import "./styles/tailwind.css";

body {
  background-color: var(--background-color);
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: var(--background-color);
}

.theme-btn {
  background-color: var(--button-bg-color);
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 20px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
