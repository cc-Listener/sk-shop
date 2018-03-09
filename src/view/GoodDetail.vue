<template>
  <Loading v-if="!haveData" />
  <div class="good-detail" v-else>
    <!-- 头部 -->
    <div class="header-view" :class="headerFix ? 'fix-top' : ''">
      <div v-for="(item, key) in headerData.item" :key="key" class="header-item" @click="tabHander(key)">
        <span v-if="item.href" :class="headerData.selectId == key ? 'on' : ''">{{item.title}}</span>
        <i v-else :class="item.title === 'goback' ? 'go-left' : 'icon icon-home'"></i>
      </div>
      <!-- <i class="go-left" :class="selectI" @click="goBack"></i>
      <a href="#good">商品</a>
      <a href="#comment">评论</a>
      <a href="#detail">详情</a>
      <a href="#groom">推荐</a>
      <i class="icon icon-home" @click="goHome"></i> -->
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="banner" id="good">
      <swiper-slide v-for="(item, key) in detail.productInfo.imgList">
        <img v-lazy="item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 商品详情 -->
    <div class="product-info">
      <p class="price">{{detail.productInfo.priceInfo.nowPrice}}</p>
      <p class="title"><span>{{detail.brandName}}</span>{{detail.productInfo.title}}</p>
      <p>{{detail.productInfo.areaName}} {{detail.productInfo.deliverInfo}}</p>
    </div>
    <!-- 商品服务 -->
    <div class="product-service item-border-top">
      <div class="service-list item-border-bottom">
        <p>{{detail.kuChequeInfo.title}}</p>
        <div>
          <span>{{detail.kuChequeInfo.subTitle}}</span>
          <i class="icon icon-right"></i>
        </div>
      </div>
      <div class="service-list item-border-bottom" v-if="detail.pickupInfo.title">
        <p>{{detail.pickupInfo.title}}</p>
        <div>
          <span>{{detail.pickupInfo.subTitle}}</span>
          <i class="icon icon-right"></i>
        </div>
      </div>
      <div class="service-list item-border-bottom">
        <p>{{detail.wecharManage.title}}</p>
        <div>
          <span>{{detail.wecharManage.subTitle}}</span>
          <i class="icon icon-right"></i>
        </div>
      </div>
    </div>
    <!-- 规格信息 -->
    <div class="sepc-view" v-if="specData.productSpec">
      <div class="wrap-view" v-if="specData.productSpec[0]">
        <h3>{{specData.productSpec[0].title}}</h3>
        <div class="color-list">
          <div v-for="(item, key) in specData.productSpec[0].values" :key="key" class="color-item">{{item.title}}</div>
        </div>
      </div>
      <div class="wrap-view"  v-if="specData.productSpec[1]">
        <h3>{{specData.productSpec[1].title}}</h3>
        <div class="color-list">
          <div v-for="(item, key) in specData.productSpec[1].values" :key="key" class="color-item">{{item.title}}</div>
          <div class="size-show">尺码信息</div>
        </div>
      </div>
    </div>
    <!-- 商家服务 -->
    <div class="service-view">
      <div class="service-item" v-for="(item, key) in detail.serviceList" :key="key">
        <img v-lazy="item.icon"/>
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="product-detail">
      <h2>商品信息</h2>
      <table>
        <tr v-for="(item, key) in detail.productInfo.attrList">
          <td>{{item.name}}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
    </div>
    <!-- 用户评价 -->
    <div id="comment"></div>
    <div class="product-comment item-border-top">
      <h2>用户评价 <span v-if="commentData.retCode != 1">( {{commentData.totalCurrCommentNum}} )</span></h2>
      <div class="comment-acount">
        <span>综合评分 {{commentData.productGrade ? commentData.productGrade : '5.0'}}</span>
        <i class="icon-right icon"></i>
      </div>
      <div class="comment-list" v-if="commentData.commentList">
        <div class="comment-item item-border-top" v-for="(item, key) in commentData.commentList">
          <span>{{item.userName}}</span>
          <span class="icon-star icon" v-for="innerItem in parseInt(item.source)" :key="innerItem"></span>
          <p class="content">{{item.content}}</p>
          <span class="date">{{checkDate(item.createDate)}}</span>
          <span>{{item.productSpec}}</span>
        </div>
      </div>
    </div>
    <div class="border-line item-border-top" id="detail"></div>
    <!-- 商品详情 -->
    <div class="goods-detail">
      <h2>商品详情</h2>
      <img v-lazy="item.info" v-for="(item, key) in detail.productInfo.detail" :key="key" v-if="item.type == 0" />
      <p v-else class="info">{{item.info}}</p>
    </div>
    <!-- 精品推荐 -->
    <div class="product-groom" id="groom">
      <p class="title">- 精品推荐 -</p>
      <router-link :to="{path: '/goodDetail', query: {id: item.id}}" class="good-item item-border-bottom" v-for="(item, key) in productList" :key="key">
        <img v-lazy="item.picUrl" />
        <div class="desc">
          <p class="name">{{item.name}}</p>
          <p class="price">￥{{item.secooPrice}}</p>
        </div>
      </router-link>
    </div>
    <!-- 底部固定 -->
    <div class="bottom-btn">
      <div class="btn-left">
        <div class="item-border-right">
          <i class="icon icon-service"></i>
          <p>客服</p>
        </div>
        <div>
          <i class="icon icon-bag"></i>
          <p>购物袋</p>
        </div>
      </div>
      <div class="submit-btn">
        <div>加入购物车</div>
        <div>立即购买</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Loading from '../components/Loading.vue'
  export default{
    name: 'GoodDetail',
    components: {
      swiper,
      swiperSlide,
      Loading
    },
    data(){
      return {
        headerFix: false,
        productInfo: [],
        specData: [],
        commentData: [],
        productList: [],
        headerData:{
          selectId: 1,
          item: [
          {
            title:'goback',
          },{
            title:'商品',
            href: 'good',
          },{
            title:'评论',
            href: 'comment',
          },{
            title:'详情',
            href: 'detail',
          },{
            title:'推荐',
            href: 'groom',
          },{
            title:'gohome'
          },
          ]
        },
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
      tabHander(index) {
        if( index == 0 ) {
          this.$router.go(-1);
        } else if( index == 5 ) {
          this.$router.push('/')
        } else {
          this.headerData.selectId = index;
          const href = this.headerData.item[index].href;
          const offsetTop = document.getElementById(href).offsetTop;
          document.documentElement.scrollTop = offsetTop;
          // var Timer = setInterval(() => {
          //   var offset = Math.abs(offsetTop - document.documentElement.scrollTop);
          //   if( document.documentElement.scrollTop < offsetTop ) {
          //     if( offset < 15 ) {
          //       document.documentElement.scrollTop += offset;
          //     } else {
          //       document.documentElement.scrollTop += 15;
          //     }
          //   } else if( document.documentElement.scrollTop > offsetTop ){
          //     if( offset < 15 ) {
          //       document.documentElement.scrollTop += offset;
          //     } else {
          //       document.documentElement.scrollTop -= 15;
          //     }
          //   } else {
          //     document.documentElement.scrollTop = offsetTop;
          //     clearInterval(Timer)
          //   }
          // },1);
        }

      },
      onScroll() {
        var offsetTop = document.getElementById('good').offsetTop;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if( scrollTop - 5 > offsetTop ) {
          this.headerFix = true;
        } else if ( scrollTop <= 20 ) {
          this.headerFix = false;
        }
      },
      checkDate(time) {
        var date = new Date(time);
        return [date.getFullYear(), this.checkTime(date.getMonth() + 1), this.checkTime(date.getDate())].join('.');
      },
      checkTime: function(i) {
        return (i < 10? '0': '') + i;
      },
      requestData() {
        var {id} = this.$route.query;
        this.$http.get(`data/good_detail?id=${id}`)
          .then( res => {
            var { categoryId, brandId } = res.data;
            this.detail = res.data;
            document.title = res.data.brandName;
            this.haveData = true;
            // 获取推荐商品
            this.$http.get(`data/groom?id=${id}&categoryId=${categoryId}&brandId=${brandId}`)
              .then( res => {
                this.productList = res.data;
              } );
            // 获取商品评论
            this.$http.get(`data/good_comment?id=${id}`)
              .then( res => {
                this.commentData = res.data;
              } );
            // 获取商品规格
            this.$http.get(`data/good_spec?id=${id}`)
              .then( res => {
                this.specData = res.data;
              } );
            // 获取更多规格
            this.$http.get(`data/good_moreSize?id=${id}`)
              .then( res => {
                this.moreSizeData = res.data;
              } )
          } )
      }
    },
    created() {
      this.requestData();
      window.addEventListener('scroll', this.onScroll);
    },
    watch: {
      '$route' (to, from) {
        this.haveData = false;
        this.requestData();
      }
    }
  }
</script>
<style lang="scss">
  .good-detail{
    padding-bottom: 110px;
    .fix-top{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .header-view{
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 0 50px 0 30px;
      width: 100%;
      height: 88px;
      background-color: #f9f9f9;
      font-size: 28px;
      .header-item{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 18.8%;
      }
      .on{
        color: #BEA474;
      }
    }
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
      margin: 44px 50px;
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
    .product-service{
      .service-list{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 36px 50px;
        div{
          display: flex;
          align-items: center;
          i{
            margin-left: 20px;
          }
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
    .sepc-view{
      margin: 60px 10px 60px 50px;
      h3{
        margin: 0;
        white-space: nowrap;
        padding-right: 80px;
        padding-top: 10px;
      }
      .wrap-view{
        display: flex;
        .color-list{
          .color-item{
            display: inline-block;
            font-size: 28px;
            margin: 0 40px 30px 0;
            padding: 10px 18px;
            border: 1px solid #ebebeb; /* no */
            border-radius: 3px; /* no */
          }
        }
        .size-show{
          display: inline-block;
          color: #BEA474;
          padding-bottom: 10px;
          border-bottom: 1px solid #BEA474;
        }
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
          padding: 60px 0;
          .icon-star{
            margin-right: 7px;
          }
          .content{
            margin: 20px 20px 20px 0;
            line-height: 1.5;
          }
          .date{
            margin-right: 50px;
          }
        }
        .comment-item:last-child{
          padding-bottom: 0;
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
      .info{
        margin-top: 25px;
        line-height: 1.5;
        font-size: 28px;
      }
    }
    .product-groom{
      .title{
        background-color: #f5f5f5;
        height: 132px;
        line-height: 130px;
        text-align: center;
        color: #1A191E;
        font-size: 36px;
      }
      .good-item:after{
        content: "";
        position: absolute;
        top: 0;
        height: 100%;
        width: 1px;
        color: #EBEBEB;
        transform: scaleX(0.5);
        overflow: hidden;
        right: -1px;
        transform-origin: 0 0;
        border-right: 1px solid #EBEBEB; /* no */
      }
      .good-item{
        display: inline-block;
        width: 50%;

        img{
          width: 100%;
          height: 375px;
        }
        .desc{
          margin: 30px;
          .name{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 26px;
          }
          .price{
            color: #1A191E;
            font-size: 34px;
            margin-top: 30px;
            font-weight: bold;
          }
        }
      }
    }
    .bottom-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 110px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      border-top: 1px solid #ebebeb;
      .btn-left{
        display: flex;
        float: left;
        height: 100%;
        div{
          display: flex;
          align-items: center;
          flex-direction: column;
          padding-top: 10px;
          width: 129px;
          height: 100%;
        }
      }
      .submit-btn{
        display: flex;
        height: 100%;
        justify-content: flex-end;
        div{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 240px;
          height: 100%;
          background-color: rgb(233, 59, 57);
          color: #fff;
          font-size: 30px;
        }
        div:first-child{
          background-color: #1A191E;
        }
      }
    }
  }
</style>
