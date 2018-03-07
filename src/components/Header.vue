<template>
  <div id="header" class="item-border-bottom">
    <span class="go-left" @click="goBack" />
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
    methods:{
      goBack() {
        this.$router.go(-1)
      }
    },
    props: ['title']
  }
</script>
<style lang="scss">
  #header{
    position: relative;
    background-color: #fff;
    width: 100%;
    height: 87px;
    line-height: 87px;
    text-align: center;
    font-size: 34px;

    .go-left{
      width: 87px;
      height: 87px;
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
