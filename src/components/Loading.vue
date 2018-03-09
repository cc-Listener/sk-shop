<template>
  <div class="loading-show">
    <div class="loading"></div>
  </div>
</template>
<script>
  export default {
    name: 'Loading',
    data() {
      return{

      }
    },
    methods:{

    },
    created() {

    }
  }
</script>
<style lang="scss">
  .loading-show{
    .loading{
      position: fixed;
      top: 50%;
      left: 50%;
      width: 42px;
      height: 42px;
      margin: -21px;
      border-radius: 50%;
      border: 2px solid #1a191e; /* no*/
      border-right-color: transparent;
      animation: loading .5s linear infinite;
    }
  }
  @keyframes loading{
    0%{
      transform: rotate(0deg)
    }
    100%{
      transform: rotate(360deg)
    }
  }
</style>
