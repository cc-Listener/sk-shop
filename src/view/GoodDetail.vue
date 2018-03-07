<template>
  <div class="good-detail" v-if="haveData">
    <swiper :options="swiperOption" ref="mySwiper" class="banner">
      <swiper-slide v-for="(item, key) in productInfo.imgList">
        <img v-lazy="item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="product-info">
      <p class="price">{{productInfo.priceInfo.nowPrice}}</p>
      <p class="title"><span>{{brandName}}</span>{{productInfo.title}}</p>
      <p>{{productInfo.areaName}} {{productInfo.deliverInfo}}</p>
    </div>
    <div class="service-view">
      <div class="service-item" v-for="(item, key) in serviceList" :key="key">
        <img v-lazy="item.icon"/>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="product-detail">
      <h2>商品信息</h2>
      <table>
        <tr v-for="(item, key) in productInfo.attrList">
          <td>{{item.name}}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="product-comment item-border-top">
      <h2>用户评价 <span v-if="commentData.retCode != 1">( {{commentData.totalCurrCommentNum}} )</span></h2>
      <div class="comment-acount">
        <span>综合评分 {{commentData.productGrade ? commentData.productGrade : '5.0'}}</span>
        <i class="icon-right"></i>
      </div>
      <div class="comment-list" v-if="commentData.commentList">
        <div class="comment-item item-border-top" v-for="(item, key) in commentData.commentList">
          <span>{{item.userName}}</span>
          <span class="icon-star" v-for="innerItem in parseInt(item.source)" :key="innerItem"></span>
          <p class="content">{{item.content}}</p>
          <span class="date">{{checkDate(item.createDate)}}</span>
          <span>{{item.productSpec}}</span>
        </div>
      </div>
    </div>
    <div class="border-line item-border-top"></div>
    <div class="goods-detail">
      <h2>商品详情</h2>
      <img v-lazy="item.info" v-for="(item, key) in productInfo.detail" :key="key" />
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    name: 'GoodDetail',
    components: {
      swiper,
      swiperSlide
    },
    data(){
      return {
        commentData: [],
        productInfo: [],
        productList: [],
        serviceList: [],
        brandName: '',
        haveData: false,
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
    methods:{
      checkDate(time) {
        var date = new Date(time);
        return [date.getFullYear(), this.checkTime(date.getMonth() + 1), this.checkTime(date.getDate())].join('.');
      },
      checkTime: function(i) {
        return (i < 10? '0': '') + i;
      },
    },
    created() {
      var {id} = this.$route.query;
      this.$http.get(`data/good_detail?id=${id}`)
        .then( res => {
          var data = res.data;
          this.commentData = data.commentData;
          this.productInfo = data.productInfo;
          this.productList = data.productList;
          this.brandName = data.brandName;
          this.serviceList = data.serviceList;

          document.title = data.brandName;
          this.haveData = true;
        } )
    }
  }
</script>
<style lang="scss">
  .good-detail{
    .border-line{
      width: 100%;
      height: 1px; /*no*/
    }
    .banner:after{
      width: 100%;
      height: 100%;
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.01));
      z-index: 10;
    }
    .banner{
      .swiper-slide{
        height: 750px !important;
      }
      .swiper-pagination-bullet{
        border-radius: 50%;
      }
      .swiper-pagination-bullet-active{
        background-color: rgba(102, 102, 102, 0.8)
      }
    }
    .product-info{
      margin: 30px 50px;
      .price{
        color: rgb(233, 59, 57);
        font-size: 48px;
      }
      .title{
        font-size: 30px;
        line-height: 1.5;
        margin: 30px 0;
        span{
          color: #BEA474;
        }
      }
    }
    .service-view{
      display: flex;
      justify-content: space-between;
      padding: 60px 50px;
      background-color: #fafafa;
      color: #4a4a4a;

      .service-item{
        text-align: center;
      }
      img{
        width: 54px;
        height: auto;
        margin-bottom: 20px;
      }
    }
    .product-detail{
      margin: 60px 50px;
      tr td:first-child{
        min-width: 214px;
      }
      td{
        padding-bottom: 20px;
      }
    }
    .product-comment{
      padding: 60px 0;
      h2{
        margin: 0;
        padding-left: 50px;
      }
      .comment-acount{
        display: flex;
        align-items: center;
        position: absolute;
        top: 60px;
        right: 50px;
        font-size: 28px;
        .icon-right{
          margin-left: 24px;
        }
      }
      .comment-list{
        margin-top: 60px;
        margin-left: 50px;
        span:first-child{
          margin-right: 30px;
        }
        .comment-item{
          padding-top: 60px;
          .icon-star{
            margin-right: 7px;
          }
          .content{
            margin: 20px 0;
          }
          .date{
            margin-right: 50px;
          }
        }
      }
    }
    .goods-detail{
      margin: 0 50px;
      h2{
        margin: 60px 0;
      }
      img{
        width: 100%;
        height: auto;
        margin-bottom: 20px;
      }
    }
  }
</style>
