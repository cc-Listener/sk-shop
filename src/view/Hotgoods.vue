<template>
  <Loading v-if="!haveData" />
  <div class="hotgoods" v-else>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, key) in headerData.banners" :key="key">
          <img v-lazy="item.img" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="tag-container">
      <div class="tags">
        <div v-for="(item, key) in headerData.tags" :key="key" class="tags-item" :class="selectIndex === key ? 'select' : ''" @click="tagClick(key, item.id)">
          <span>{{item.title}}</span>
          <div v-if="selectIndex != key" class="mask"></div>
          <img v-lazy="item.img" />
        </div>
      </div>
    </div>

    <div class="detail-container">
      <div class="detail-item" v-for="(item, key) in commentData" :key="key">
        <div class="comment-view" v-if="!item.products">
          <div class="user-view">
            <div class="user-info">
              <img v-lazy="item.showUserImg" />
              <div>
                <p>{{item.showUserName}}</p>
                <p>{{item.showTime}}</p>
              </div>
            </div>
            <div class="content">
              <p>{{item.content}}</p>
              <router-link :to="{path: '/commentDetail', query: {id: item.id}}">查看详情</router-link>
            </div>
          </div>
          <div :class="item.showImgs.length > 2 ? 'full-img-show': 'img-show'">
            <img v-lazy="innerItem" v-for="(innerItem, InnerKey) in item.showImgs" :key="InnerKey" />
          </div>
          <div class="btn-view item-border-top">
            <div class="btn-container item-border-right">
              <div class="icon-zan fontTopPro "></div>{{item.praiseCount}}
            </div>
            <router-link :to="{path: '/goodDetail', query:{id: item.productId}}" class="btn-container">
              去购买<div class="icon-qumai fontTopPro "></div>
            </router-link>
          </div>
        </div>
        <div class="product-view item-border-bottom" v-else>
          <div class="product-top">
            <div class="mask"></div>
            <img v-lazy="item.titleImg" />
            <div class="desc">
              <p class="title">{{item.title}}</p>
              <p class="subTitle">{{item.subTitle}}</p>
              <router-link class="to-topic" to="/">进入专题</router-link>
            </div>
            <div class="see-num">
              <div class="fontTopPro icon-kan"></div>
              <span>{{item.showNumber}}</span>
            </div>
          </div>
          <div class="product-imgs">
            <div v-for="(innerItem, innerKey) in item.products" :key="innerKey">
              <img v-lazy="innerItem.img" />
              <p>{{innerItem.name}}</p>
              <p>￥{{innerItem.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Spinner v-if="spinnerShow" />
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Spinner from '../components/Spinner.vue'
  import Loading from '../components/Loading.vue'
  export default {
    name: 'Hotgoods',
    components: {
      swiper,
      swiperSlide,
      Spinner,
      Loading
    },
    data() {
      return{
        haveData: false,
        spinnerShow: false,
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
        this.commentData = [];
        this.selectIndex = index;
        this.tagId = id;
        this.getCommentData();
      },
      getCommentData() {
        this.haveData = true;
        this.$http.get(`data/hot_goods_comment?lineNumber=${this.lineNumber}&tagId=${this.tagId}`)
          .then(res => {
            this.lineNumber = res.data.lineNumber;
            this.commentData = this.lineNumber === 1 ? res.data.list : this.commentData.concat(res.data.list);
            this.spinnerShow = false;
          })
      },
      onScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.body.scrollHeight;;
        var pageHeight = window.innerHeight;
        if( pageHeight + scrollTop == windowHeight ) {
          this.spinnerShow = true;
          this.getCommentData();
        }
      }
    },
    created() {
      document.title = '尖货';
      window.addEventListener('scroll', this.onScroll);
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
    .tag-container{
      width: 100%;
      height: 210px;
      overflow: auto;

      .tags{
        width: 100%;
        white-space: nowrap;
        margin-top: 60px;

        .tags-item:first-child{
          margin-left: 30px;
        }
        .mask{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background-color: rgba(0,0,0,0.3);
          border-radius: 50%;
          z-index: 1;
        }
        .select::before,.select::after {
          content: "";
          display: block;
          width: 100px;
          height: 100px;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 100%;
        }
        .select::before{
          border: 2px solid #fff; /*no*/
          z-index: 12;
          box-sizing: border-box;
        }
        .select::after{
          top: -6px;
          left: -6px;
          border: 3px solid #ceb88e; /*no*/
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
            top: 0;
            left: 0;
            width: 100px;
            height: 100px;
            border-radius: 100%;
          }
          span{
            position: absolute;
            text-align: center;
            line-height: 100px;
            top: 0;
            left: 0;
            width: 100%;
            height: 100px;
            z-index: 11;
          }
        }
      }
    }
    .detail-container{
      .detail-item{
        margin-bottom: 30px;
      }
      .comment-view{
        .user-view{
          padding: 0 30px;
        }
        .user-info{
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 30px;
          }
          p:first-child{
            margin-bottom: 10px;
          }
        }
        .content{
          font-size: 28px;
          line-height: 42px;
          margin: 30px 0;
          p{
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
          a{
            color: #BEA474;
          }
        }
        .img-show{
          display: flex;
          justify-content: space-between;
          padding: 0 30px;
          img{
            width: 340px;
            height: 340px;
          }
        }
        .full-img-show{
          width: 100%;
          overflow-x: auto;
          white-space:nowrap;
          img{
            width: 340px;
            height: 340px;
            margin-right: 10px;
          }
          img:first-child{
            padding-left: 30px;
          }
          img:last-child{
            padding-right: 20px;
          }
        }
        .btn-view::after{
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          color: #EBEBEB;
          transform: scaleY(0.5);
          overflow: hidden;
          bottom: -1px;
          transform-origin: 0 0;
          border-bottom: 1px solid #EBEBEB; /* no */
        }
        .btn-view{
          display: flex;
          margin-top: 30px;

          .btn-container{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: 80px;

            .icon-zan{
              margin-right: 10px;
            }
            .icon-qumai{
              margin-left: 10px;
            }
          }
        }
      }
      .product-view{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .product-top{
          width: 690px;
          height: 380px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
          .desc{
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            z-index: 11;

            .title{
              font-size: 42px;
              white-space: nowrap;
            }
            .subTitle{
              font-size: 28px;
              text-align: center;
              margin-top: 14px;
              letter-spacing: 1px;
              white-space: nowrap;
            }
            .to-topic{
              display: inline-block;
              background-color: #fff;
              color: #000;
              margin-top: 30px;
              width: 120px;
              height: 40px;
              text-align: center;
              line-height: 40px;
            }
          }
          .see-num{
            display: flex;
            position: absolute;
            right: 30px;
            bottom: 20px;
            z-index: 11;
            color: #fff;

            .icon-kan{
              margin-right: 10px;
            }
          }
          .mask{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1;
            border-radius: 5px;
          }
        }
      }
      .product-imgs{
        display: flex;
        width: 690px;
        font-size: 28px;
        color: #1A191E;
        padding-bottom: 30px;
        margin-top: 20px;
        div{
          width: 33.33%;
          text-align: center;
          img{
            width: 100%;
          }
        }
      }
    }
  }
</style>
