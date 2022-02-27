<template>
  <div>
    <app-explain title="页面水印">
      <p>基于SVG实现的轻量级水印功能(安全性低)</p>
      <el-input
        style="width: 120px; margin-right: 10px"
        v-model="content"
        placeholder="水印内容"
      />
      <el-button type="primary" @click="waterMark(content)">添加水印</el-button>
      <el-button type="warning" @click="delWaterMark()">移除水印</el-button>
    </app-explain>
  </div>
</template>

<script setup>
import { usePageFn } from '/src/hooks/usePageFn'
import { ref } from 'vue'

const { waterMark, delWaterMark } = usePageFn()
const content = ref('水印')
</script>
