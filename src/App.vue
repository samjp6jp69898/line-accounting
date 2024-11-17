<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('basic/toggleTheme');
    },
  },
};
</script>

<template>
  <div class="app">
    <button @click="toggleTheme">切換主題</button>
  </div>
</template>

<style>
body {
  background-color: var(--background-color);
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
