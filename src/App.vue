<template>
  <div class="app">
    <RouterView />
  </div>
</template>
<script>
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
  },
  data() {
    return {

    };
  },
  async created() {
    if (!this.DEBUG) {
      await this.$liff.init({
        liffId: this.$config.liffId
      })
      const isLogin = await this.$liff.isLoggedIn()
      console.log('app isLogin', isLogin)

      this.$store.commit('user/setIsLogin', isLogin)
      if (isLogin) {
        const profileRes = await this.$liff.getProfile()
        console.log('profile', profileRes)
        this.$store.commit('user/setAvatar', profileRes.pictureUrl)
        this.$store.commit('user/setName', profileRes.displayName)
        const accessToken = await this.$liff.getAccessToken()
        console.log('accessToken', accessToken)
      } else {
        this.$liff.login({ redirectUri: this.$config.redirectUri });
      }
      this.$store.commit('basic/setLiffInitStatus', true)
    }
  }
};
</script>
<style>
@import "./styles/tailwind.css";

body {
  background-color: var(--background-color);
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background: var(--background-color);
}

.scroll_flex_container {
  background: var(--background-color);
  width: 100%;
  height: 100svh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scroll_flex_container::-webkit-scrollbar {
  display: none;
}
</style>
