<template>

</template>
<script>
  export default {
    name: 'Detail',
    data() {
      return {
        p: 1
      }
    },
    method:{
      getDetailData(){
        var id = this.$route.query.id;
        this.$http.get(`/data/detail?id=${id}&p=${this.p}`)
          .then( res => {
            this.swiper = res.data.swiper;
            this.indexData = res.data;
          } )
        }
    },
    created() {

    },
  }
</script>
