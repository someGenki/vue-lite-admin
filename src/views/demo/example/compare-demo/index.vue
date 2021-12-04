<template>
  <div>
    <app-explain title="简易图片对比">
      <p>利用input[type='range']控制上册元素宽度 </p>
    </app-explain>
    <compare-box style="margin: 20px">
      <template #lower>
        <img
          width="300"
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/338ad5584e4cdb714b0ec31f5ca2cf63666086e0_full.jpg"
        />
      </template>
      <template #upper>
        <img
          width="300"
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/59/59ba431118bb016a6d67736b67f38c309e71275a_full.jpg"
        />
      </template>
    </compare-box>
  </div>
</template>

<script>
import CompareBox from '/src/components/CompareBox/index.vue'

export default {
  name: 'CompareDemo',
  components: { CompareBox },
  setup() {},
}
</script>

<style scoped></style>
