<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-left">
        <h1>准备摆个LOGO</h1>
        <h2>其次是个图片，跟vben类似</h2>
      </div>
      <div class="login-right">
        <el-form
          :model="form"
          :rules="loginRules"
          ref="loginFormRef"
          class="login-form"
        >
          <h1 style="margin-left: 4px; text-align: left">登录</h1>
          <p>这在个地方说点什么东西吧</p>
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

          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 22px;
            "
          >
            <input
              placeholder="验证码"
              class="login-input"
              style="width: 50%; height: 48px"
              type="text"
              value="aaaa"
            />
            <img
              style="width: 120px; height: 44px"
              src="http://www.webxml.com.cn/WebServices/ValidateCodeWebService.asmx/cnValidateImage?byString=aaaa"
              alt="验证码"
            />
          </div>
          <el-button
            style="width: 100%"
            type="primary"
            @click.prevent="handleLogin"
            >登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import useLogin from './useLogin'
// https://element-plus.gitee.io/#/zh-CN/component/form
export default {
  name: 'login',
  setup() {
    // 测试用，根据page参数来显示对应的登录页1
    const pageNo = ref(useRoute().query.page || '1')

    const changeLoginStyle = () => {
      if (pageNo.value === '1') pageNo.value = '2'
      else pageNo.value = '1'
    }
    const showPassword = ref(false)

    function showPasswordToggle() {
      showPassword.value = !showPassword.value
    }

    return {
      pageNo,
      showPasswordToggle,
      showPassword,
      changeLoginStyle,
      ...useLogin(),
    }
  },
}
</script>

<style lang="scss" scoped>
$bg-input: #f1f2f3;
$bg-button: #cfd3d7;

.admin-login {
  position: relative;
  height: 100vh;
  padding: 0 1rem;
  overflow: hidden;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  // TODO 响应式
}

.login-left {
  width: 25%;
  min-width: 300px;
  max-width: 500px;
  height: 500px;
  background-size: 100%;
  //background-image: url('https://mixkit.imgix.net/art/preview/mixkit-i-love-you-hand-gesture-419-original-large.png?q=80&auto=format%2Ccompress');
}

.login-right {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 500px;
}

.login-form {
  align-self: center;
  //height: 450px;
  width: 450px;
  padding: 0 2rem 3rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);
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
  height: 44px;
  padding: 12px;
  font-size: 1.2rem;
  //text-align: center; // 让光标和内容居中
  background-color: $bg-input;
  border: none;
  border-radius: 4px;
  outline: none;
  caret-color: var(--primary-color, #02bf6f);

  &::placeholder {
    //color: #a1a1a1;
    text-align: center;
    transition: 0.25s;
  }

  &:focus::placeholder {
    opacity: 0;
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
