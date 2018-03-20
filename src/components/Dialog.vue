<template>
  <div class="dialog-view">
    <div class="dialog-title">
      <span>{{title}}</span>
      <i class="icon icon-close"></i>
    </div>
    <div class="dialog-server">
      <div v-for="(item, key) in serverData" :key="key" class="server-list">
        <h3>{{item.name}}</h3>
        <p>{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Dialog',
    data() {
      return{
        title: ''
      }
    },
    props: ['serverData', 'type'],
    methods:{

    },
    created() {
      if( this.type == 'service' ) {
        this.title = '寺库服务';
      }
    }
  }
</script>
<style lang="scss">
  .dialog-view{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
    padding-top: 112px;

    .dialog-title{
      position: relative;
      background-color: #f8f8f8;
      padding: 40px 50px;
      font-size: 38px;
      .icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 30px;
      }
    }
    .dialog-server{
      background-color: #fff;
      padding: 0 50px 60px;
      overflow-y: auto;
      flex-grow: 1;
      line-height: 1.8;

      h3{
        margin-top: 60px;
        font-size: 30px;
      }
      p{
        font-size: 26px;
      }
      .server-list:last-child{
        padding-bottom: 60px;
      }
    }
  }
</style>
