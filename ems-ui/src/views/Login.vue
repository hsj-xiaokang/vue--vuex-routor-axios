<template>
  <div class="login-container">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm  login_parent">
      <h3 class="title" id="system">用户登录</h3>
      <div class="lostPass errColor" v-show="isErr">{{errMess}}</div>
      <hr class="thr_h"/>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <div class="lostPass">忘记密码，请联系管理员处理！</div>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>

      <hr class="thr_v" width=490  size=3 noShade />
      <img src="static/prcode.jpg" class="login_img">
      <div class="login_box">
        <span class="login_box_text">扫描二维码，下载安装设备配置APP</span>
      </div>
    </el-form>
  </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
//  import { requestLogin,getMenu } from '../api/api';
//import * as httpAxios from '../api/api';
  //import NProgress from 'nprogress'
/**
 * 登录界面
 * @author heshengjin
 * @date 2017-06-03
 */
  export default {
    components: {
        ElCol,
        ElRow},
    data() {
      return {
        errMess:"错误信息提示在这里展示？",
        isErr:true,
        logining: false,
        ruleForm2: {
          account: "",//'admin',
          checkPass:"" //'123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
//          console.log(this.$refs.ruleForm2)
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
//              httpAxios.requestLogin(loginParams).then(data => {
//              this.logining = false;
//              //NProgress.done();
//              let { msg, code, user } = data;
//              if (code !== 200) {
//                this.$message({
//                  message: msg,
//                  type: 'error'
//                });
//              } else {
              var user = {
                  id: 1,
                  username: 'admin',
                  password: '123456',
                  // avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
                  vatar:'../../static/user.png'
              };
//
                  this.$store.getters.getState.user = JSON.stringify(user);
//
//                  //localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。
                  sessionStorage.setItem('user', JSON.stringify(user));
                  console.log($("#system"))
//                  //参数传递
                  this.$router.push({ path: '/testVUEX_'});
//              }
//            });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-top: 180px;
    margin-left: 27%;
    /*margin: 180px auto;*/
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .lostPass{
      margin-left: 15%;
      margin-bottom: 2%;
    }
    .thr_v{
      transform:rotate(90deg);
      -ms-transform:rotate(90deg); 	/* IE 9 */
      -moz-transform:rotate(90deg); 	/* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg);
      position: absolute;
      left: 66%;
      top: 41%;
      width: 93%;
    }
    .thr_h{
    }
    .login_parent{
      position: relative;
    }
    .login_img{
      position: absolute;
      top: -6%;
      left: 115%;
      width: 109%;
      height: 109%;
    }
    .login_box{
      width: 670px;
      height: 390px;
      /*border: 1px #cac6c6 solid;*/
      position: absolute;
      top: -14%;
      left: -13%;
      box-shadow: 0 0 25px #cac6c6;
      border-radius: 5px;
      z-index: -11111111111;
    }
    .login_box_text{
      position: absolute;
      top: 91%;
      left: 59%;
    }
    .errColor{
      color: red;
    }
  }
</style>