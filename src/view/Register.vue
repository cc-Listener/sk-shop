<template>
  <div class="register-view">
    <Header title="注册" />
    <div class="form-view">
      <div class="input-view">
        <input type="text" placeholder="输入用户名" @change="saveData" data-type="username" />
        <div class="err-msg" v-if="usernameErr.status">{{usernameErr.msg}}</div>
      </div>
      <div class="input-view">
        <input type="number" placeholder="输入手机号码" @change="saveData" data-type="phonenum" />
        <div class="err-msg" v-if="phonenumErr.status">{{phonenumErr.msg}}</div>
      </div>
      <div class="input-view">
        <input type="password" placeholder="输入6位数以上密码" @change="saveData" data-type="password" />
        <div class="err-msg" v-if="passwordErr.status">{{passwordErr.msg}}</div>
      </div>
      <div class="input-view">
        <input type="password" placeholder="再次输入密码" @change="saveData" data-type="rptPassword" />
        <div class="err-msg" v-if="rptPasswordErr.status">{{rptPasswordErr.msg}}</div>
      </div>
      <p class="register-btn" :class="[canRegister ? 'canRegister' : '']" @click="submit">立即注册</p>
    </div>
  </div>
</template>
<script>
import crypto from 'crypto';
import Header from '@/components/Header'

var md5 = crypto.createHash('md5');

  var testPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  var testPassword = /^[A-Za-z0-9]+$/;

  export default {
    name: 'Register',
    components: {
      Header
    },
    data() {
      return {
        username: '',
        phonenum: '',
        password: '',
        rptPassword: '',
        usernameErr: {
          status: false,
          msg: ''
        },
        phonenumErr: {
          status: false,
          msg: ''
        },
        passwordErr: {
          status: false,
          msg: ''
        },
        rptPasswordErr: {
          status: false,
          msg: ''
        },
        canRegister: false
      }
    },
    methods: {
      saveData(e) {
        var { type } = e.target.dataset;
        var typeObj = [{
          username: '用户名',
          phonenum: '手机号码',
          password: '密码',
          rptPassword: '确认密码'
        }]
        var value = e.target.value;

        if( value == '' ) {
          this[`${type} + Err`] = typeObj[`${type}`] + '不能为空';
          return
        }
        if( type == 'username' ) {
          this.$http.get(`data/checkname?name=${value}`)
          .then( res => {
            const data = res.data;
            if( data.status == 0 ) {
              this.usernameErr.status = true;
              this.usernameErr.msg = data.msg;
              return
            } else {
              this.usernameErr.status = false;
            }
          })
        }
        if( type == 'password' ) {
          if( !testPassword.test(value) ) {
            this.passwordErr.status = true;
            this.passwordErr.msg = '请输入合法密码';
            return
          } else {
            this.passwordErr.status = false;
          }
        }
        if( type == 'rptPassword' ) {
          if( this.password != value ) {
            this.rptPasswordErr.status = true;
            this.rptPasswordErr.msg = '与第一次密码不同，请重新输入';
            return
          } else {
            this.rptPasswordErr= false;
          }
        }

        if( type == 'phonenum' ) {
          if( !testPhone.test(value) ) {
            this.phonenumErr.status = true;
            this.phonenumErr.msg = '请输入正确的手机号码';
            return
          } else {
            this.phonenumErr.status = false;
          }
        }
        this[`${type}`] = value;
        if( !this.usernameErr.status && !this.passwordErr.status && !this.rptPasswordErr.status && !this.phonenumErr.status && this.username != '' && this.password != '' && this.phonenum != '' && this.rptPassword != '' ) {
          this.canRegister = true;
        }
      },
      timeFormatter () {
        var datetime = new Date();
        var year = datetime.getFullYear();
        var month = datetime.getMonth()+1;//js从0开始取
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minutes = datetime.getMinutes();
        var second = datetime.getSeconds();

        if(month<10){
            month = "0" + month;
        }
        if(date<10){
            date = "0" + date;
        }
        if(hour <10){
            hour = "0" + hour;
        }
        if(minutes <10){
            minutes = "0" + minutes;
        }
        if(second <10){
            second = "0" + second ;
        }

        var time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
        return time;
      },
      cryptPwd: function (password, salt) {
        var saltPassword = password + ':' + salt;
        var result = md5.update(saltPassword).digest('hex');
      },
      submit: function () {
        this.$http.post('data/register', {
          username: this.username,
          password: md5.update(this.password).digest('hex'),
          create_time: this.timeFormatter(),
          phonenum: this.phonenum
        })
        .then(res => {
          if( res.data.status == 1 ) {
            this.$router.push('/login');
          }
        } )
      },
    }
  }
</script>
<style lang="scss">
  .register-view{

    .form-view{
      padding: 0 40px;
      margin-top: 20px;
    }
    .input-view {
      position: relative;
    }
    .err-msg{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #f44343;
      font-weight: bold;
    }
    input {
      width: 100%;
      font-size: 28px;
      padding: 20px 10px;
      color: #000;
      margin-top: 14px;
      border-bottom: 1px solid #d7d7d7;
    }

    input::-webkit-input-placeholder {
      color: #d7d7d7;
    }
    .register-btn{
      background-color: #eee;
      color: #848689;
      font-size: 30px;
      text-align: center;
      margin-top: 40px;
      padding: 20px 0;
      border-radius: 12px;
    }
    .canRegister{
      background-color: #7148bf;
      color: #fff;
    }
  }
</style>
