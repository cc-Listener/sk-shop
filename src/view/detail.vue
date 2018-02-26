<template>
  <div class="detail">
    <div class="good-list">
      <div class="good-item" v-for="(item, key) in goodsData" :key="key">
        <img v-lazy="item.img" />
        <p class="title">{{item.name}}</p>
        <div class="price">
          <span>￥{{ item.second_price === '' || item.second_price === null ? item.price : item.second_price}}</span>
          <span v-if="item.second_price != '' && item.second_price != null" class="second_price">￥{{item.price}}</span>
        </div>
      </div>
    </div>

    <div class="warm-infor">{{ noData ? '再下面就没有啦~~' : '数据加载中...' }}</div>
  </div>
</template>
<script>
  import Header from '@/components/Header'

  export default {
    name: 'Detail',
    components: {
      Header
    },
    data() {
      return {
        p: 1,
        goodsData: [],
        noData: false,
        requestStatus: false
      }
    },
    methods:{
      getDetailData(){
        this.requestStatus = false;
        var id = this.$route.query.id;
        this.$http.get(`/data/detail?id=${id}&p=${this.p}&page_size=20`)
          .then( res => {
            if( res.data.length === 0 ) {
              this.noData = true;
              return
            }
            this.goodsData = this.p === 1 ? res.data : this.goodsData.concat(res.data);
            this.p = this.p + 1;
            this.requestStatus = true;
            if( res.data.length < 20 ) {
              this.noData = true;
            }
        } )
      },
      onScroll() {
        if( (window.innerHeight + document.documentElement.scrollTop) == document.body.scrollHeight ) {
            if(this.requestStatus) {
              this.getDetailData();
            }

        }
      }
    },
    created() {
      var title = this.$route.query.title || '寺库奢侈品';
      document.title = title;
      this.getDetailData();
      window.addEventListener('scroll', this.onScroll)
    },
  }
</script>
<style lang="scss">
  .detail{
    .good-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 26px;
      background-color: #f5f5f5;
    }

    .warm-infor{
      padding: 40px;
      text-align: center;
      color:#686868;
      font-size: 30px;
      background-color: #f5f5f5;
    }
    .good-item{
      width: 370px;
      margin-bottom: 10px;
      background-color: #fff;
      .title{
        width: 350px;
        padding-left: 10px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
      .price{
        display: inline-block;
        padding-left: 10px;
        margin: 20px 0;
        color: #f23030;
      }
      .second_price{
        font-size: 24px;
        color: #ccc;
        text-decoration:line-through;
      }
      img{
        width: 370px;
        height: 370px;
      }
    }
  }
</style>
