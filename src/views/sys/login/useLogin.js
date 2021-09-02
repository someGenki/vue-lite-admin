import router from '/src/router'
import {  useUserStore } from '/src/store/user'
import { computed, reactive, ref } from 'vue'

// 登录表单校验
const loginRules = {
  /* [another template]
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    const validateUsername = (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('The username can not be less than 6 digits'))
    } else { callback() }}
 */
  username: [{ required: true, message: '用户名不能为空' }],
  password: [{ required: true, message: '密码不能为空' }],
}

// 表单数据
const form = reactive({
  username: 'admin',
  password: '123456',
})

// el-form的引用
let loginFormRef = ref(null)

// 登录按钮是否可点击
const loginBtnEnable = computed(() => {
  return form.username.length > 0 && form.password.length > 0
})

// 点击登录按钮调用的函数
function handleLogin() {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // 表单校验通过，发起ajax请求然后保存必要的token、roles最后路由跳转
      useUserStore().login(form).then(() => {
        router.push({
          path: router.currentRoute.value.query.redirect || '/',
        })
      })
    } else {
      console.log('login fail because ', valid)
      return false
    }
  })
}

export default function useLogin(config) {
  return { form, loginRules, loginBtnEnable, loginFormRef, handleLogin }
}
