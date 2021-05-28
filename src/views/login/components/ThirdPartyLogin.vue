<template>
  <p style="text-align: center">支持以下第三方登录</p>
  <ul class="third-party-list">
    <li id="tp-qq">
      <app-icon size="26" icon="QQ"/>
      QQ
    </li>
    <li id="tp-wechat">
     <app-icon size="26" icon="wechat"/>
      Wechat
    </li>
    <li id="tp-github">
      <app-icon size="26" icon="github"/>
      github
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ThirdPartyLogin',
  setup() {
    // 打开新窗口 请求第三方登录 （详情了解 OAuth2协议和第三方登录）
    // QQ:https://wiki.connect.qq.com/
    // Wechat: https://open.weixin.qq.com/cgi-bin/frame?t=home/web_tmpl&lang=zh_CN
  },
}
</script>

<style lang="scss" scoped>
.third-party-list {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  margin-top: 20px;
  li {
    cursor: pointer;
    display: flex;
    align-items: center;
    :first-child{
      margin-right: 10px;
    }
    &:hover {
      color: $primary-color;
    }
  }
}
</style>
