<template>
  <button @click="flag = !flag">Toggle</button>
  <!-- <transition name="fade" mode="out-in">
    <h2 v-if="flag" key="main">Hello world!</h2>
    <h2 v-else key="secondary">Goodbye world!</h2>
  </transition> -->

  <transition name="zoom">
    <h2 v-if="flag">Hey!</h2>
  </transition>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      flag: false,
    };
  },
};
</script>

<style>
h2 {
  width: 400px;
  padding: 2rem;
  /* margin: 2rem; */
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.25s linear;
}
.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}

.zoom-enter-from {
  opacity: 0;
}
.zoom-enter-active {
  animation: zoom-in 1s linear forwards;
}

.zoom-leave-active {
  animation: zoom-out 1s linear forwards;
}
.zoom-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1, 1);
  }
}

@keyframes zoom-out {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0, 0);
  }
}
</style>
