<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters('line', {
      name: 'name',
      avatar: 'avatar',
      isLogin: 'isLogin'
    })
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('basic/toggleTheme');
    },
    login() {
      this.$store.dispatch('line/login')
    }
  },
  async mounted() {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      await this.$store.dispatch('line/getToken', code)
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
      <button class="theme-btn mt-4" @click="login" v-if="!isLogin">login</button>
      <div v-if="isLogin">
        <img :src="avatar" alt="" class="w-10 h-10 rounded-full" />
        <span class="name">{{ name }}</span>
      </div>
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

.name {
  color: var( --text-color);
}
</style>
