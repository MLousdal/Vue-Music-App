<template>
  <app-header></app-header>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <app-player></app-player>
  <auth-modal></auth-modal>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppPlayer from './components/Player.vue'
import AuthModal from './components/Auth.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppPlayer,
    AuthModal,
  },
  created() {
    this.$store.dispatch('init_login')
  },
}
</script>

<style lang="scss">
.fade {
  &-enter-from {
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.5s linear;
  }
  &-leave-to {
    transition: all 0.5s linear;
    opacity: 0;
  }
}
</style>