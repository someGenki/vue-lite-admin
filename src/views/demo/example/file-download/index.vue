<template>
  <div class="file-download-demo">
    <h1>FileDownload</h1>
    <el-alert type="success" title="使用原生的download属性">
      <a download="dio" href='/src/assets/dio.jpg'>点我</a>
      下载Dio.jpg，适用于静态资源，兼容性一般
    </el-alert>
    <el-alert type="success" title="使用文件流下载,生产模式生效">
      <a download="dio" style="cursor: pointer" @click="blobDownload">点我</a>
      下载bb.txt
    </el-alert>
    <el-alert type="success" title="使用download.js库">
      download('后端数据流地址','文件名',"video/mp4");
    </el-alert>
  </div>
</template>

<script>
import request from '/src/utils/request'
export default {
  name: 'FileDownload',
  setup() {
    function blobDownload() {
      request({
        url: '/demo/download1',
        responseType: 'blob',
        method: 'get',
      })
        .then((res) => {
          // let blob = new Blob([res.data]) //
          let blob = res // 后端直接返回二进制流的情况(可以直接a标签直接代替)
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob) // 兼容IE
          } else {
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'bb.txt' // 下载后保存的文件名
            link.click() // 触发下载事件
            link.remove() // 下载完成移除元素
            window.URL.revokeObjectURL(link.href) // 释放内存
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return { blobDownload }
  },
}
</script>

<style lang="scss" scoped>
.box-card {
  display: inline-block;
  min-width: 300px;
  margin: 5px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-alert {
  margin-bottom: 10px;

  a {
    font-weight: bold;
  }
}
</style>
