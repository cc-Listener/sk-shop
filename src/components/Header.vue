<template>
  <div id="header">
    <span class="icon" />
    <span>{{title}}</span>
  </div>
</template>
<script>
  export default{
    name: 'Header',
    data() {
      return {

      }
    },
    props: ['title']
  }
</script>
<style lang="scss" scoped>
  #header{
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 90px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    line-height: 90px;
    text-align: center;
    font-size: 36px;

    .icon{
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
