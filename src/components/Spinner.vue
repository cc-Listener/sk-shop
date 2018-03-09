<template>
  <div class="spinner-show item-border-top">
    <span class="fontTopPro icon-loading"></span>
  </div>
</template>
<script>
  export default {
    name: 'Spinner'
  }
</script>
<style lang="scss">
  .spinner-show{
    height: 100px;
    text-align: center;
    line-height: 100px;
    .icon-loading{
      display: inline-block;
      font-size: 30px;
      animation: spinner .5s infinite linear;
    }
  }
  @keyframes spinner{
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
