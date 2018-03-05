<template>
  <div class="hotgoods">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, key) in headerData.banners" :key="key">
          <img v-lazy="item.img" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="tags">
      <div v-for="(item, key) in headerData.tags" :key="key" class="tags-item" :class="selectIndex === key ? 'select' : ''" @click="tagClick(key, item.id)">
        <span>{{item.title}}</span>
        <img :src="item.img" />
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'Hotgoods',
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      return{
        selectIndex: 0,
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
        headerData: [],
        commentData: [],
        tagId: 1,
        lineNumber: 1
      }
    },
    methods:{
      tagClick(index, id) {
        this.selectIndex = index;
      },
      getCommentData() {
        this.$http.get(`data/hot_goods_comment?lineNumber=${this.lineNumber}&tagId=${this.tagId}`)
          .then(res => {
            this.lineNumber = res.data.lineNumber;
            this.commentData = this.lineNumber === 1 ? res.data.list : this.commentData.concat(res.data.list);
          })
      }
    },
    created() {
      document.title = '尖货';
      this.$http.get(`data/hot_goods_header`)
        .then( res => {
          this.headerData = res.data;
          this.tagId = res.data.tags[0].id;
          this.getCommentData();
        } )
    }
  }
</script>
<style lang="scss">
  ::-webkit-scrollbar{width:0px}
  .hotgoods{
    .tags{
      width: 100%;
      white-space: nowrap;
      margin-top: 60px;
      overflow-x: auto;

      .tags-item:first-child{
        margin-left: 30px;
      }
      .select::before {
        content: "";
        display: block;
        width: 100px;
        height: 100px;
        position: absolute;
        left: 0;
        top: 0;
        border: 2px solid #fff; /*no*/

      }
      .tags-item{
        position: relative;
        display: inline-block;
        width: 100px;
        height: 112px;
        border-radius: 50%;
        text-align: center;
        font-size: 26px;
        color: #fff;
        line-height: 100px;
        margin-right: 40px;

        img{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border-radius: 100%;
        }
        span{
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          white-space: nowrap;
          z-index: 11;
        }
      }
    }
  }
</style>
