<template>
  <div class="container-login">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt class="logo-index" />
      <el-form :model="loginForm" ref="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:238px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :checked="true">我已阅读并同意条款和隐私协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码格式有误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async (valid) => {
      //   // console.log(this.$refs.loginForm)
        if (valid) {
          //     this.$http.post(
          //       '/authorizations',
          //       this.loginForm
          //     )
          //       .then(res => {
          //         store.setUser(res.data.data)
          //         this.$router.push('/')
          //       })
          //       .catch(e => {
          //         this.$message.error('手机号或验证码错误')
          //       })

          // ----------或者使用try{} catch(e){}
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            store.setUser(res.data.data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })

      // // 在客户端浏览器中记录服务器端返回的token 信息
      // // 一般这个taken是axios 做账号校验返回的
      // window.sessionStorage.setItem('token', 'fsddfsfsdf')
      // 编程式
    }
  }
}
</script>

<style lang="less" scoped>
.container-login {
  width: 100%;
  height: 100%;
  // 让百分百尺寸基于window计算
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    .logo-index {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>
