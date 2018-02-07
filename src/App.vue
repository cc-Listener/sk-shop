<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import '../normalize.css';

.icon{
  width: 62px;
  height: 62px;
  background: url('./assets/images/tow_icon.png') no-repeat;
  display: inline-block;
  background-size: 140px 210px; /*no*/
}

</style>
