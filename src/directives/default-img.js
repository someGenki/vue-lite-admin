import defaultAvatar from '/src/assets/images/dio.jpg'
import defaultBackground from '/src/assets/images/cute.jpg'
import { getStrColor } from '../utils/process'

/**
 * 项目难点标记：检测图片存在，如果不存在则用用户的昵称的首字符作为头像,绘制svg
 * 检测图片是否存在
 * @param url
 */
const imageIsExist = function (url) {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = url
    img.onload = () => {
      if (img.complete === true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = () => {
      resolve(false)
      img = null
    }
  })
}

function genSvgImg(text, color, size = 36) {
  text = text.substring(0, 1)
  color = encodeURIComponent(color)
  return `data:image/svg+xml;utf8,
<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" fill='%23f1f1f1'>${text}</text>
</svg>`
}

/**
 * 当图片加载失败时，显示默认图片
 * 参数可选：'avatar' | 'background' | string
 * <img :src="xxxx" v-default-img.avatar />
 */
export default async function defaultImg(el, binding) {
  // 需要显示默认图片(当图片原本的src属性有错时)的类型
  const { value, modifiers } = binding
  // 图片原本的src
  const realURL = el.src
  // 当原本图片不存在时，根据参数返回不同的图片url
  const exist = await imageIsExist(realURL)
  if (exist) return // 图片可正常加载，不做任何处理
  if (value) {
    el.setAttribute('src', genSvgImg(value, getStrColor(value)))
  } else if (modifiers.avatar) {
    el.setAttribute('src', defaultAvatar)
  } else if (modifiers.background) {
    el.setAttribute('src', defaultBackground)
  } else {
    el.remove() // 什么都不加 v-default-img 时 移除图片
  }
}
