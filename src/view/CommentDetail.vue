<template>

</template>
<script>
  export default {
    name: 'CommentDetail',
    data() {
      return{

      }
    },
    methods:{

    },
    created() {
      var id = this.$route.query.id;
      this.$http.get(`data/comment_detail?id=${id}`)
        .then( res => {
          console.log(res.data);
        } )
    }
  }
</script>
<style lang="scss">

</style>
