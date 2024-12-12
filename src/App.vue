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
*{
  max-width: 1920px;
  margin: 0  auto;
  padding: 0;  
  box-sizing: border-box;
}
.container{
    margin: 0 auto;
    max-width: 1920px;
    width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>