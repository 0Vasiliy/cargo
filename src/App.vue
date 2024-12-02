<template>
  <div id="app">
    <CargoTracker/>
  </div>
</template>

<script>
import CargoTracker from './components/CargoTracker.vue';

export default {
  components: {
    CargoTracker,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>