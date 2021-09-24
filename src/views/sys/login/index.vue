<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-left">
        <h1>准备摆个LOGO</h1>
        <h2>其次是个图片，跟vben类似</h2>
      </div>
      <div class="login-right">
        <el-form
          :model="loginFormData"
          :rules="loginRules"
          ref="loginFormRef"
          class="login-form"
        >
          <h1 style="margin-left: 4px; text-align: left">登录</h1>
          <p>这在个地方说点什么东西吧</p>

          <el-form-item required size="small" prop="username">
            <input
              required
              name="username"
              class="login-input"
              v-model="loginFormData.username"
              placeholder="用户名/邮箱"
            />
          </el-form-item>

          <el-form-item required prop="password">
            <input
              required
              name="password"
              class="login-input"
              :type="showPassword ? '' : 'password'"
              v-model="loginFormData.password"
              placeholder="请输入密码"
            />
            <i
              @click="toggleShowPasswd"
              :class="{ slash: showPassword }"
              class="el-icon-view password-see"
            />
          </el-form-item>

          <el-form-item class="form-captcha">
            <input
              placeholder="验证码"
              name="code"
              class="login-input"
              style="width: 60%; height: 44px; margin-right: 10px"
              type="text"
              v-model="loginFormData.code"
            />
            <img
              style="width: 120px; height: 42px"
              src="http://www.webxml.com.cn/WebServices/ValidateCodeWebService.asmx/cnValidateImage?byString=aaaa"
              alt="验证码"
            />
          </el-form-item>

          <el-button
            @click.prevent="handleLogin"
            :loading="btnLoading"
            style="width: 100%"
            type="primary"
            >登录
          </el-button>
        </el-form>
      </div>
      <div class="login-footer"> Powered by 禾几元</div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '/src/store/user'
import { ElMessage } from 'element-plus'

// https://element-plus.gitee.io/#/zh-CN/component/form

function useVarToggle(def = false) {
  let val = ref(def)
  const toggle = (bool) => {
    if (bool !== undefined && typeof bool === 'boolean') val.value = bool
    else val.value = !val.value
  }
  return [val, toggle]
}

export default {
  name: 'login',
  setup() {
    const router = useRouter()
    const [showPassword, toggleShowPasswd] = useVarToggle()
    const [btnLoading, toggleBtnLoading] = useVarToggle()
    const loginFormRef = ref(null)
    const loginFormData = reactive({
      username: 'admin',
      password: '123456',
      code: 'aaaa',
    })
    const loginRules = {
      // 表单验证规则 https://github.com/yiminghe/async-validator
      /* [详细模板 | another template]
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        const validateUsername = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The username can not be less than 6 digits'))
        } else { callback() }} */
      username: [{ required: true, message: '用户名不能为空' }],
      password: [{ required: true, message: '密码不能为空' }],
    }

    // 表单验证通过时，调用store中的登录方法(抽离)
    const formValidPassed = () => {
      useUserStore()
        .login(loginFormData)
        // 模拟延迟100ms
        .then(() => new Promise((res) => setTimeout(() => res(), 100)))
        .then(() => {
          router.push({ path: router.currentRoute.value.query.redirect || '/' })
          ElMessage.success({
            duration: 1000,
            type: 'success',
            message: '登录成功!',
          })
        })
        .finally(() => toggleBtnLoading(false))
    }

    // 登录按钮触发的函数
    const handleLogin = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          toggleBtnLoading(true)
          formValidPassed()
        } else {
          console.error('login fail in handleLogin')
          return false
        }
      })
    }

    return {
      loginRules,
      loginFormRef,
      loginFormData,
      showPassword,
      toggleShowPasswd,
      btnLoading,
      toggleBtnLoading,
      handleLogin,
    }
  },
}
</script>

<style lang="scss" scoped>
$bg-input: #f1f2f3; // 输入框背景颜色

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

.login-footer {
  position: absolute;
  bottom: 10px;
  user-select: none;
  font-size: 6px;
  background: linear-gradient(to left, #0250c5 0%, #d43f8d 100%);
  -webkit-background-clip: text;
  color: transparent;
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

:deep(.form-captcha .el-form-item__content) {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
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
