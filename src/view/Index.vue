<template>
  <div class="index">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, key) in swiper" :key="key">
          <router-link :to="{path: '/detail', query: {id: item.id, title: item.title}}">
            <img v-lazy="baseImgUrl + item.img" />
          </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="tab-view">
      <router-link :to="{path: '/detail', query: {id: item.id, title: item.title}}" v-for="(item, key ) in indexData.tab" :key="key" class="tab-item">
        <img v-lazy="baseImgUrl + item.img" />
        <span>{{item.title}}</span>
      </router-link>
    </div>

    <div class="big-view">
      <router-link :to="{path: '/detail', query: {id: item.id, title: item.title}}" v-for="(item, key ) in indexData.big" :key="key">
        <img v-lazy="baseImgUrl + item.img" />
      </router-link>
    </div>

    <div class="category-title">分类 CATEGORY</div>
    <div class="category-view">
      <router-link :to="{path: '/detail', query: {id: item.id, title: item.title}}" v-for="(item, key ) in indexData.index_category" :key="key" class="category-item">
        <img v-lazy="baseImgUrl + item.img" />
        <div class="title-view">
          <p>{{item.title}}</p>
          <span>{{item.subTitle}}</span>
        </div>
      </router-link>
    </div>

    <div class="week-view">
      <router-link :to="{path: '/detail', query: {id: item.id}}" v-for="(item, key ) in indexData.week_good" :key="key">
        <img :src="baseImgUrl + item.img" />
      </router-link>
    </div>
    <Tab />
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { baseImgUrl } from '../../config/config.js';
  import Tab from '../components/Tab.vue';
  export default {
    name: 'Index',
    components: {
      swiper,
      swiperSlide,
      Tab,
    },
    data() {
      return {
        swiper: [],
        indexData: [],
        baseImgUrl,
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          grabCursor : true,
          setWrapperSize :true,
          pagination: {
            el: '.swiper-pagination',
          },
          observeParents:true,

        },
      }
    },
    methods: {

    },
    created() {
      this.$http.get(`data/index_data`)
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
      display: inline-block;
      position: relative;
      font-size: 0;
      margin-bottom: 20px;
      height: 250px;
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
