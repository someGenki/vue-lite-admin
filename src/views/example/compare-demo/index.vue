<template>
  <div>
    <h2>图片对比组件</h2>
    <compare-box style="transform: scale(1.3);margin: 20px">
      <template #lower>
        <img
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/338ad5584e4cdb714b0ec31f5ca2cf63666086e0_full.jpg"
        />
      </template>
      <template #upper>
        <img
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/59/59ba431118bb016a6d67736b67f38c309e71275a_full.jpg"
        />
      </template>
    </compare-box>
    <h2>使用css:filter: contrast(0.5);</h2>
    <compare-box/>
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
