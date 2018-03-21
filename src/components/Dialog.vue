<template>
  <div class="mask fixed-bottom" :class="show ? 'show' : ''">
    <div class="dialog-view fixed-bottom" :class="dialogshow ? 'show' : ''">
      <div class="dialog-title">
        <span>{{title}}</span>
        <i class="icon icon-close" @click="hideDialog"></i>
      </div>
      <section class="dialog-server" v-if="type == 'service'">
        <div v-for="(item, key) in serverData" :key="key" class="server-list">
          <h3>{{item.name}}</h3>
          <p>{{item.desc}}</p>
          <img :src="item.img" v-if="item.img">
        </div>
      </section>
      <section class="pickup-view" v-if="type == 'pickup'">
        <div v-for="(item, key) in pickupData.pickupList" :key="key" class="pickup-list">
          <div>
            <h3>{{item.name}}</h3>
            <span>{{item.address}}</span>
          </div>
        </div>
      </section>
      <section class="size-view" v-if="type == 'moresize'">
        <img :src="sizeData.sizeImgInfo.url" />
        <div class="size-info clearfix">
          <table>
            <tbody>
              <tr v-for="(item, key) in sizeData.size">
                <td>{{item.title}}</td>
              </tr>
            </tbody>
        </table>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Dialog',
    data() {
      return{
        title: '',
        dialogshow: false
      }
    },
    props: ['serverData', 'pickupData', 'sizeData', 'type', 'show'],
    methods:{
      hideDialog() {
        this.show = false;
        this.dialogshow = false;
        setTimeout(() => {
          this.$emit('dialogShow', false)
        },250);
      }
    },
    created() {
      setTimeout(() => {
        this.dialogshow = true;
      },250);
      switch (this.type) {
        case 'service':
          this.title = '寺库服务';
          break;
        case 'pickup':
          this.title = '到店自提';
          break;
        case 'moresize':
          this.title = '尺码说明';
          break;
      }
    }
  }
</script>
<style lang="scss">
  .dialog-view.show{
    transform: translateY(0%);
  }
  .dialog-view{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    transform: translateY(100%);
    padding-top: 112px;
    transition: 0.2s;

    .dialog-title{
      position: relative;
      background-color: #f8f8f8;
      padding: 40px 50px;
      font-size: 38px;
      letter-spacing: 2px;
      .icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 30px;
      }
    }
    section{
      flex-grow: 1;
      background-color: #fff;
      overflow-y: auto;
      padding: 0 50px 60px;
      line-height: 1.8;

      h3{
        font-size: 30px;
        margin-top: 60px;
      }

      img{
        width: 100%;
        height: auto;
      }
    }
    section.size-view{
      padding-left: 0;
      padding-right: 0;
    }
    .dialog-server{
      p{
        font-size: 26px;
      }
    }
    .pickup-view{
      .pickup-list{
        background: url('../assets/images/location.png') center left no-repeat;
        padding-left: 60px;
        background-size: 25px auto;
      }
    }
    .size-view{
      .size-info{
        background-image: repeating-linear-gradient(#fbfbfb 0, #fbfbfb 1.866667rem, #fff 1.866667rem, #fff 3.733333rem);
        border: 1px solid #f5f5f5
        table{
          border-collapse: collapse;
        }
      }
    }
  }
</style>
