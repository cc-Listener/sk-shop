<template>
  <div class="index">
    <Swiper v-if="swiper.length > 0" :autoPlay='true' :showIndicator='true' interval="3000" duration="500">
      <Slide v-for="(item, key) in swiper" :key="key">
        <img :src="baseImgUrl + item.img" />
      </Slide>
    </Swiper>

    <div class="tab-view">
      <div v-for="(item, key ) in indexData.tab" :key="key" class="tab-item">
        <img :src="baseImgUrl + item.img" />
        <span>{{item.title}}</span>
      </div>
    </div>

    <div class="big-view">
      <img v-for="(item, key ) in indexData.big" :key="key" :src="baseImgUrl + item.img" />
    </div>

    <div class="category-title">分类 CATEGORY</div>
    <div class="category-view">
      <div v-for="(item, key ) in indexData.category" :key="key" class="category-item">
        <img :src="baseImgUrl + item.img" />
        <div class="title-view">
          <p>{{item.title}}</p>
          <span>{{item.subTitle}}</span>
        </div>
      </div>
    </div>

    <div class="week-view">
      <img v-for="(item, key ) in indexData.week" :key="key" :src="baseImgUrl + item.img" />
    </div>
    <Tab />
  </div>
</template>
<script>
  import { Swiper, Slide } from 'vue-swiper-component';
  import { baseImgUrl } from '../../config/config.js';
  import Tab from '../components/Tab.vue';
  export default {
    name: 'Index',
    components: {
      Swiper,
      Slide,
      Tab
    },
    data() {
      return {
        swiper: [],
        indexData: [],
        baseImgUrl
      }
    },
    methods: {

    },
    created() {
      this.$http.get(`http://localhost:3000/index_data`)
      .then( res => {
        this.swiper = res.data.swiper;
        this.indexData = res.data;
      }, res => {
        console.log('获取信息失败');
      } )
    }
  }
</script>
<style lang="scss">
  .index{
    padding-bottom: 100px;
  }
  .wh_slide img {
    width: 100%;
    height: 550px;
  }
  .wh_show_bgcolor{
    background-color: #fff;
  }
  .tab-view{
    display: flex;
    justify-content: space-between;
    padding: 40px 20px;

    img{
      width: 90px;
      height: 90px;
    }

    .tab-item{
      width: 142px;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  .big-view{
    font-size: 0;

    img{
      width: 100%;
      height: 420px;
      margin-bottom: 20px;
    }

    img:last-child{
      margin-bottom: 0;
    }
  }
  .category-title{
    margin: 30px 0;
    text-align: center;
    font-size: 28px;
  }
  .category-view {
    .category-item{
      position: relative;
      font-size: 0;
      margin-bottom: 20px;
    }

    img{
      width: 100%;
      height: 250px;
    }

    .title-view{
      position: absolute;
      font-size: 36px;
      top: 50%;
      left: 48px;
      transform: translateY(-50%);

      span{
        font-size: 24px;
      }
    }
  }
  .week-view{
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
      width: 690px;
      height: 600px;
      margin-bottom: 32px;
    }
  }
</style>
