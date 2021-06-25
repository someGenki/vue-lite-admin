<template>
  <div class="wechat-wallet" @click="showQrCode = !showQrCode">
    <div v-if="!showQrCode">
      <p class="icon-wrapper"><i class="el-icon-s-finance" /></p>
      <p class="wechat-wallet-title">钱包</p>
      <p class="wechat-wallet-money">￥137.63</p>
    </div>
    <transition name="show-qrcode">
      <div v-if="showQrCode">
        <img
          style="margin: auto; height: 150px; display: block"
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
  height: $card-height;
  padding: 10px;
  border-radius: 8px;
  background-color: $theme-color;
  cursor: pointer;
  position: relative;
  user-select: none;
  overflow: hidden;
  /* ---------- */
  p {
    text-align: center;
  }
}
.icon-wrapper {
  margin: 0;
  color: #eee;
  font-size: 3rem;
}
.wechat-wallet-title {
  color: white;
  margin-bottom: 0;
}
.wechat-wallet-money {
  margin-top: 5px;
  color: #7fdeac;
}

.show-qrcode-enter-active,
.show-qrcode-leave-active {
  transition: all 0.5s;
  opacity: 0;
}

/* 定义元素离开的动画效果 */
.show-qrcode-enter-to {
  opacity: 100;
  transform: scale(1.05);
}
</style>
