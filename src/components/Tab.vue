<template>
  <div id="tab">
    <router-link v-for="(item ,key) in tabList" :key="key" class="tab-item" :class="[ key == 0 ? 'tab-active' : '' ]" :to="item.url">
      <img :src="item.img" />
      <p>{{item.title}}</p>
    </router-link>
  </div>
</template>
<script>
  import { baseImgUrl } from '../../config/config.js';
  export default{
    name: 'Tab',
    data() {
      return{
        tabShow: false,
        tabList: [{
          title: '首页',
          img: baseImgUrl + '/icon/1.png',
          url: '/'
        },{
          title: '尖货',
          img: baseImgUrl + '/icon/2.png',
          url:'/hotgoods'
        },{
          title: '分类',
          img: baseImgUrl + 'icon/3.png',
          url:'/category'
        },{
          title: '购物袋',
          img: baseImgUrl + '/icon/4.png',
          url: '/cart'
        },{
          title: '我的',
          img: baseImgUrl + '/icon/5.png',
          url: '/user'
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>
  #tab{
    position: fixed;
    bottom: 0;
    display: flex;
    background-color: #fff;
    padding: 20px 0 10px 0;
    border-top: 1px solid #e2e2e2;
    .tab-active{
      opacity: 1 !important;
    }
    .tab-item{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 150px;
      height: 73px;
      opacity: 0.45;

      img{
        width: 40px;
        height: 40px;
        margin-bottom: 10px;
      }
    }
  }
</style>
