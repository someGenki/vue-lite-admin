import {reactive, toRaw} from 'vue'
import {useRouter} from 'vue-router'
import {ElNotification} from 'element-plus'
import {useUserStore} from '/src/store/user'

const loginFormObj = {
  username: 'jojo2',
  password: 'jojo2',
  code: '4396',
}

const getParams = (fullPath) => {
  let index
  if (fullPath && (index = fullPath.indexOf('?')) > -1) {
    const usp = new URLSearchParams(fullPath.substring(index))
    return Object.fromEntries(usp.entries())
  }
}


const getRandomCode = () => {
  return Math.floor(Math.random() * 9000 + 1000) + ''
}

export function useLogin() {
  const user = useUserStore()
  const router = useRouter()
  const route = router.currentRoute.value
  const code = getRandomCode()
  loginFormObj.code = code
  const loginForm = reactive(loginFormObj)
  const loginRules = {
    username: [{required: true, message: '用户名不能为空'}],
    password: [{required: true, message: '密码不能为空'}],
    code: [
      {
        validator: (rule, value, cb) => {
          if (!value) {
            cb(new Error('请输入验证码'))
          } else if (value !== code) {
            cb(new Error('验证码不一致'))
          } else {
            cb()
          }
        },
        trigger: 'blur',
      },
    ],
  }
  // 表单验证通过时，调用store中的登录方法
  const loginPassed = () => {
    return user['login'](toRaw(loginForm))
      .then(() => new Promise((res) => setTimeout(() => res(), 120)))
      .then(
        (data) => {
          router.push({
            path: route.query.redirect || '/',
            query: getParams(route.query.redirect) || {},
          })
          ElNotification({
            type: 'success',
            duration: 1500,
            message: '登录成功！',
          })
        },
        (reason) => {
          console.log(reason)
          ElNotification({
            type: 'error',
            offset: 80,
            message: '登录失败 ' + reason,
          })
        }
      )
  }

  return {loginForm, loginRules, code, loginPassed}
}
