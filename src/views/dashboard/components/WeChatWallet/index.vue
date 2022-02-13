<template>
  <div class="wechat-wallet" @click="showQrCode = !showQrCode">
    <div v-if="!showQrCode">
      <p class="icon-wrapper">
        <app-icon color="#eee" size="48" icon="el-icon-wallet-filled" />
      </p>
      <p class="wechat-wallet-title">钱包</p>
      <p class="wechat-wallet-money">￥37.63</p>
    </div>
    <transition name="show-qrcode">
      <div v-if="showQrCode">
        <img
          style="display: block; height: 150px; margin: auto"
          src="./wechat-receiving.jpg"
          alt="收款码"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'WeChatWallet',
  setup() {
    const showQrCode = ref(false)

    return { showQrCode }
  },
}
</script>

<style lang="scss" scoped>
$theme-color: #29ac66;
$card-height: 160px;

.wechat-wallet {
  position: relative;
  height: $card-height;
  padding: 10px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  background-color: $theme-color;
  border-radius: 8px;

  /* ---------- */
  p {
    text-align: center;
  }
}

.wechat-wallet-title {
  margin-bottom: 0;
  color: white;
}

.wechat-wallet-money {
  margin-top: 5px;
  color: #7fdeac;
}

.show-qrcode-enter-active,
.show-qrcode-leave-active {
  opacity: 0;
  transition: all 0.5s;
}

/* 定义元素离开的动画效果 */
.show-qrcode-enter-to {
  opacity: 100;
  transform: scale(1.05);
}
</style>
