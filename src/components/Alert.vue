<template>
  <div class="alert-view" :class=" shows ? 'show' : '' ">
    <div class="mask" :class=" shows ? 'show' : '' "></div>
    <div class="container" :class=" shows ? 'show' : '' ">
      <div class="item-border-bottom">
        <p class="title" :class="type == 'tax' ? 'through' : ''" :data-type="type">{{title}}</p>
        <p class="subTitle" :class="type == 'message' ? 'textCenter' : ''">{{subTitle}}</p>
      </div>
      <div class="btn" @click="hideAlert">确定</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Alert',
    data() {
      return{

      }
    },
    methods:{
      hideAlert() {
        this.shows = false;
        setTimeout(() => {
          this.$emit('alertShow', false);
        },100);
      }
    },
    props: ['title', 'subTitle', 'shows', 'type'],
    created() {

    }
  }
</script>
<style lang="scss">
  .alert-view.show{
    opacity: 1;
    z-index: 999;
  }
  .alert-view{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .15s;
    .container.show{
      transform: scale(1) !important;
      z-index: 100;
    }
    .container{
      position: absolute;
      width: 550px;
      color: #333;
      font-size: 28px;
      background-color: #fff;
      padding-top: 40px;
      text-align: center;
      line-height: 1.5;
      border-radius: 4px; /* no */
      transform: scale(0.7);
      transition: 0.15s;
      .title.through{
        text-decoration: line-through;
      }
      .subTitle{
        padding: 10px 50px 50px 50px;
        text-align: left;
      }
      .textCenter{
        text-align: center;
      }
      .btn{
        padding: 25px 0;
      }
    }
  }
</style>
