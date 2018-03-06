<template>
  <div class="loading-show item-border-top">
    <span class="fontTopPro icon-loading"></span>
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
    height: 100px;
    text-align: center;
    line-height: 100px;
    .icon-loading{
      display: inline-block;
      font-size: 30px;
      animation: loading .5s infinite linear;
    }
  }
  @keyframes loading{
    0%{
      transform: rotate(0);
    }
    50%{
      transform: rotate(180deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
