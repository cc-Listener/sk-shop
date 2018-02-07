<template>
  <div id="user">
    <div class="usercenter_list">
      <div class="tablelist">
        <div class="icon icon-user"></div>
        <div class="list_r">
          <p>账户</p>
          <span>122828016</span>
          <!-- <span class="icon icon-right"></span> -->
        </div>
      </div>

      <!-- <div class="tablelist">
        <div class="icon icon-user"></div>
        <p>订单</p>
        <div class="list_r">
          <span class="icon icon-right"></span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User'
  }
</script>
<style>
  body{
    background-color: #f9f9f9;
  }
  #user{
    font-size: 32px;
  }
  .user-item{
    display: flex;
    background-color: #fff;
  }
  .icon-user{
    background-position: -73px -2px; /*no*/
    margin-right: 20px;
  }
  .icon-right{
    width: 44px;
    height: 44px;
    background-position: -35px -75px; /*no*/
  }
  .borderTop{
    border-top: 1px solid #ccc;
  }
  .borderBottom{
    border-bottom: 1px solid #ccc;
  }
  .usercenter_list{
    margin: 44px 0;
  }
  .tablelist{
    height: 88px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    background-color: #fff;
  }
  .list_r{
    flex:1;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
