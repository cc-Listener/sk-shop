<template>
  <div class="comment-detail">
    <div class="user-info">
      <img :src="commentData.headImg" />
      <div>
        <p>{{commentData.nickName}}</p>
        <p>{{commentData.createDate}}</p>
      </div>
    </div>
    <img :src="innerItem" v-for="(innerItem, innerKey) in commentData.imgs" :key="innerKey" />
    <p class="content">{{commentData.content}}</p>
  </div>
</template>
<script>
  export default {
    name: 'CommentDetail',
    data() {
      return{
        commentData: []
      }
    },
    methods:{

    },
    created() {
      document.title = '晒货详情';
      var id = this.$route.query.id;
      this.$http.get(`data/comment_detail?id=${id}`)
        .then( res => {
          this.commentData = res.data.show;
        } )
    }
  }
</script>
<style lang="scss">
  .comment-detail{
    width: 100%;
    overflow: hidden;
    img{
      width: 100%;
      height: auto;
      margin-bottom: 20px;
    }
    .user-info{
      display: flex;
      align-items: center;
      width: 100%;
      height: 126px;
      margin-left: 30px;
      img{
        width: 66px;
        height: 66px;
        border-radius: 50%;
        margin-right: 20px;
        margin-bottom: 0;
      }
    }
    .content{
      padding: 0 30px;
      font-size: 26px;
      line-height: 1.8;
    }
  }
</style>
