<template>
  <div id="app">
    <CargoTracker/>
    <!-- <CargoTracker2/> -->
  </div>
</template>

<script>
import CargoTracker from './components/CargoTracker.vue';
// import CargoTracker2 from './components/CargoTracker2.vue';

export default {
  components: {
    CargoTracker,
    // CargoTracker2
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>