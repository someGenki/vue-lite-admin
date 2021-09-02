<template>
  <!-- 默认登录页flex布局，竖向排列，水平居中-->
  <el-form
    :model="form"
    :rules="loginRules"
    ref="loginFormRef"
    class="login-form"
  >
    <div class="header-container"><h2>Vue Admin Template</h2></div>

    <div class="body-container">
      <el-form-item required size="small" prop="username">
        <input
          class="login-input"
          required
          v-model="form.username"
          placeholder="用户名/邮箱"
        />
      </el-form-item>

      <el-form-item required prop="password">
        <input
          class="login-input"
          :type="showPassword ? '' : 'password'"
          required
          v-model="form.password"
          placeholder="请输入密码"
        />
        <i
          @click="showPasswordToggle"
          :class="{ slash: showPassword }"
          class="el-icon-view password-see"
        />
      </el-form-item>

      <button
        class="login-button"
        :class="{ enable: loginBtnEnable }"
        @click.prevent="handleLogin"
      >
        <i class="el-icon-right" />
      </button>
    </div>

    <div class="footer-container"><h1></h1></div>
  </el-form>
</template>

<script>
import { ref } from 'vue'
import useLogin from './useLogin'
// https://element-plus.gitee.io/#/zh-CN/component/form
// 设计来自的qq的登录界面
export default {
  name: 'login01',
  setup() {
    const showPassword = ref(false)
    function showPasswordToggle() {
      showPassword.value = !showPassword.value
    }

    return {
      showPasswordToggle,
      showPassword,
      ...useLogin() /* 表单操作相关逻辑 */,
    }
  },
}
</script>

<style lang="scss" scoped>
$bg-input: #f1f2f3;
$bg-button: #cfd3d7;

$login-btn-size: 64px;

.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.login-button {
  width: $login-btn-size;
  height: $login-btn-size;
  font-size: 2rem;
  font-weight: bolder;
  line-height: $login-btn-size;
  color: white;
  cursor: pointer;
  background-color: $bg-button;
  border: none;
  border-radius: 50%;
  outline: none;
  transition: 0.5s;

  &.enable {
    background: linear-gradient(#1768ff, #a7bfe8);
  }
}


.body-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

// 密码可见图标 el-view
.password-see {
  position: absolute;
  top: 12px;
  right: 14px;
  font-size: 1.4rem;
  color: #666;
  cursor: pointer;
}
// 给图标画一条斜线
.password-see.slash::after {
  position: absolute;
  right: 10px;
  width: 2px;
  height: 22px;
  content: '';
  background-color: #666;
  transform: rotate(45deg);
}
// 原生输入框样式
.login-input {
  position: relative;
  width: 100%;
  height: 48px;
  padding: 10px 30px;
  font-size: 1.3rem;
  text-align: center; // 让光标和内容居中
  background-color: $bg-input;
  border: none;
  border-radius: 1000px;
  outline: none;
  caret-color: var(--primary-color,#02bf6f);;

  &::placeholder {
    color: #a1a1a1;
    text-align: center;
    transition: 0.25s;
  }

  &:focus::placeholder {
    opacity: 0;
  }
}
</style>
