<template>

</template>
<script>
  export default{
    name: 'GoodDetail',
    data(){
      return {

      }
    },
    methods:{

    },
    created() {
      var {id} = this.$route.query;
      this.$http.get(`data/good_detail?id=${id}`)
        .then( res => {
          console.log(res);
        } )
    }
  }
</script>
<style lang="scss">

</style>
