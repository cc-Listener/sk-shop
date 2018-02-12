<template>
  <div class="login">
    <div class="login-view">
      <span>
        <div class="txt-left">账号：</div>
        <input type="text" style="display: none" />
        <input type="text" placeholder="请输入账号" v-model="username" />
      </span>
      <span>
        <div class="txt-left">密码：</div>
        <input type="text" style="display: none" />
        <input type="password" placeholder="请输入密码" v-model="password" />
      </span>
      <p class="btn_submit" @click="submit">登录</p>
      <p class="register-btn" @click="toRegister">立即注册</p>
    </div>
  </div>
</template>
<script>
import { baseImgUrl, HOST } from '../../config/config';
import crypto from 'crypto';

var md5 = crypto.createHash('md5');

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/register');
    },
    submit: function () {
      // var password = md5.update(this.password).digest('hex');
      var password = 2222;
      this.$http.post(`/data/login`, {
        username: this.username,
        password: 123
      },{
          emulateJSON:true//一定要写上这句话
      })
      .then(res => {
        if( res.data.status == 1 ) {
          this.$router.push('/');
        }
      } ), res => {
        alert('登录失败');
      }
    }
  },
}
</script>
<style type="text/css" scoped>
  .login{
    padding: 0 40px;
  }
  .login-view span{
    position: relative;
    width: 100%;
    height: 94px;
    line-height: 94px;
    display: block;
    font-size: 28px;
    border-bottom: 1px solid #d7d7d7;
  }
  .txt-left{
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
  .login-view span input{
    padding: 0 60px 0 120px;
    color: #333;
  }
  .btn_submit{
    margin-top: 60px;
    width: 100%;
    padding: 20px 0;
    font-size: 28px;
    color: #848689;
    background-color: #eee;
    text-align: center;
    letter-spacing: 10px;
  }
  input::-webkit-input-placeholder {
    color: #d7d7d7;
  }
  .register-btn{
    background-color: #7148bf;
    color: white;
    font-size: 30px;
    text-align: center;
    margin-top: 40px;
    padding: 20px 0;
    width: 100%;
  }
</style>
