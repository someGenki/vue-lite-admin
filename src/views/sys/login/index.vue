<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-left">
        <!--<div title="未设计" class="login-logo"></div>-->
        <img width="450" src="/src/assets/year2022.svg" alt=""/>
      </div>
      <div class="login-right">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
          class="login-form"
        >
          <h1 class="login-title">登录</h1>
          <p>这在个地方说点什么东西吧</p>

          <el-form-item required prop="username">
            <el-input
              required
              name="username"
              class="login-input"
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
              placeholder="用户名/邮箱"
            />
          </el-form-item>

          <el-form-item required prop="password">
            <el-input
              required
              name="password"
              class="login-input"
              show-password
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              placeholder="请输入密码"
            />
          </el-form-item>

          <el-form-item class="form-captcha">
            <el-input
              placeholder="验证码"
              name="code"
              prefix-icon="el-icon-picture-filled"
              class="login-input"
              style="height: 44px; margin-right: 12px"
              type="text"
              v-model="loginForm.code"
            />
            <img
              style="width: 120px; height: 42px"
              :src="captchaSrc"
              alt="验证码"
              title="验证码"
            />
          </el-form-item>

          <el-button
            @click.prevent="handleLogin"
            :loading="loading"
            class="login-btn"
            type="primary"
            size="large"
          >登录
          </el-button>
        </el-form>
      </div>
      <div class="login-footer">Powered by 禾几元</div>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import {useLogin} from './useLogin'
import backgrounds from "./loginBackgronds";

const loading = ref(false)
const loginFormRef = ref(null)
const {loginForm, loginRules, code, loginPassed} = useLogin()
const captchaSrc = `http://www.webxml.com.cn/WebServices/ValidateCodeWebService.asmx/cnValidateImage?byString=${code}`
const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)]
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      loginPassed().finally(() => (loading.value = false))
    }
  })
}
</script>


<style lang="scss" scoped>
$bg-input: #f1f2f3; // 输入框背景颜色
$sm-width: 768px; // 小屏幕平板尺寸
$input-height: 44px;

.admin-login {
  position: relative;
  height: 100vh;
  padding: 0 1rem;
  overflow: hidden;
  //background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  background-image: v-bind('randomBg');

  & > .login-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
  }
}


.login-left {
  width: 25%;
  min-width: 300px;
  max-width: 500px;
  height: 500px;
  user-select: none;
  background-size: 100%;

  .login-logo {
    font-size: 60px;
    letter-spacing: 12px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  // 暂无设计logo!
  .login-logo--deprecated {
    font-size: 60px;
    letter-spacing: 12px;
    background-image: v-bind('randomBg');
    /* stylelint-disable-next-line */
    //filter: invert(100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.login-right {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 500px;
  margin-top: 16px;

  :deep(.form-captcha .el-form-item__content) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
}

.login-footer {
  position: absolute;
  bottom: 10px;
  font-size: 6px;
  color: transparent;
  user-select: none;
  background: linear-gradient(to left, #0250c5 0%, #d43f8d 100%);
  -webkit-background-clip: text;
}

// 表单主体样式！
.login-form {
  position: relative;
  align-self: flex-start;
  width: 450px;
  height: 380px;
  padding: 1rem 2rem 2rem;
  overflow: hidden;
  background: white;
  border-radius: 1rem;
  box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);

  & > .login-title {
    display: inline-block;
    height: 32px;
    color: #333;
    margin: 8px;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
  }

  // 输入框样式
  .login-input {
    height: $input-height;
    font-size: 16px;
    line-height: $input-height;
    --el-input-bg-color: #f8f5f5;
  }

  // 登录按钮 使用绝对定位让动画效果正常点
  .login-btn {
    position: absolute;
    bottom: 2rem;
    max-width: 386px;
    width: 86%;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 16px;
  }

  :deep(.el-form-item__content) {
    flex-wrap: nowrap;
  }
}


@media screen and (max-width: $sm-width) {
  .login-left {
    display: none;
  }

  .login-right {
    align-self: flex-start;
    justify-content: center;
    width: 100%;
  }

  .login-form {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
</style>
