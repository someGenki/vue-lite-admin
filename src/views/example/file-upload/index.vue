<template>
  <div class="upload-demo">
    <div class="el-upload-demo">
      <h1>
        <a
          href="https://element-plus.gitee.io/#/zh-CN/component/upload"
          target="_blank"
        >
          EL-Upload上传
        </a>
      </h1>
      <p>
        element-plus自带组件，通过点击或者拖拽上传文件，更多细节
        <b>见源码</b>
      </p>
      <p>文档参数很多，最常用的回调函数:onSuccess、onError、beforeUpload</p>
      <p>请求细节:Request Method:Post、Content-Type: multipart/form-data;</p>
      <p>SpringBoot控制层参数接受文件的方式:(MultipartFile file)作为参数</p>
      <p>同时配置文件中spring.servlet.multipart.enabled属性需为true</p>
      <el-upload ref="upload1" style="max-width: 360px" v-bind="uploadAttr">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            tip:只能上传 jpg/png 文件，且不超过 500kb
          </div>
        </template>
      </el-upload>
      <p>
        当前action(请求路径)：
        <span>{{ action }}</span>
      </p>
    </div>
    <div class="custom-upload-demo">
      <h1>自定义上传功能</h1>
      <div>
        <input type="file" name="file" />
        👈不想要丑丑的原生上传组件，怎么办？
        <input
          hidden
          multiple
          type="file"
          ref="fileInput"
          name="image"
          @change="setImage"
          accept="image/*"
        />
      </div>
      <p>
        首先给原生的上传组件隐藏起来，添加ref引用，添加接受类型(支持表达式)，添加@change方法
      </p>
      <p>
        比如:&lt;input hidden type="file" ref="fileInput" @change="setImage"
        accept="image/*" /&gt;
      </p>
      <p>
        当需要
        <button @click="fileInput.click">弹出</button>
        选择文件的对话框，调用fileInput.click方法即可,选择文件完后会调用@change的方法
      </p>
      <p>
        @change方法的第一个参数event的target属性就是那个input，调用event.target.files即可获取选择的文件
      </p>
      <h2>附:FileReader的使用</h2>
      <pre>
  if (typeof FileReader === 'function'){
    const reader = new FileReader()
    reader.onload = (event) => {
      imgSrc.value = event.target.result
    }
    reader.readAsDataURL(file)
  } else {
    alert('不支持FileReader API')
  }
    </pre
      >
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'FileUpload',
  setup() {
    // 获取实例的引用，用于调用upload1.submit进行手动上传
    const upload1 = ref(null)
    const fileInput = ref(null)
    const action = 'http://localhost:8080/api/file/upload'
    const headers = {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjIxMTQ4NzQ1LCJleHAiOjE2MjE3NTM1NDV9.luk430AQx3BhiYhgyCx0qR5CvbUv3dN9H0rG1y2fgiMbnckFe5n1HknsNg4P6neSDK5gQEEXZxRGCbY4PVot9w',
    }

    const onSuccess = (response) => {
      // alert('上传成功')
      console.log(response)
    }
    /* function onSuccess() { console.log(this) } */

    const setImage = (e) => {
      const files = e.target.files
      console.log(files)
      alert(`你选择了${files.length}个文件，第一个文件名为${files[0].name}`)
    }

    /**
     * 把要el-upload要绑定的属性写成一个对象(还能加上注释!!)，同时避免el-upload标签属性太多
     * 回调函数用箭头函数更简洁的同时也确保this的执行(用普通函数this为Proxy包裹的el-upload的属性)
     *  <el-upload  v-bind="uploadAttr">...</el-upload>
     */
    const uploadAttr = {
      action, //	必选参数，上传的地址  string
      headers, // 设置上传的请求头部   object
      drag: true, // 是否启用拖拽上传
      multiple: true, // 是否支持多选文件

      // 上传成功的回调函数 function(response, file, fileList)
      // -> 可用于获取后端返回的文件链接，然后进行图片回显之类的操作
      // 如果要直接用上传的图片作为img的src，可以使用FileReader对象将图片转化为DataURL对象
      onSuccess,
      // 上传失败的回调函数
      onError: (err, file, fileList) => {
        alert(err)
      },
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      // -> 可用于判断文件的类型file.type === 'image/jpeg';和文件大小file.size<xxx;(后端别忘了再校验)
      beforeUpload: (file) => {
        console.log(file)
        console.log(
          'type:' + file.type,
          Math.round(((file.size / 1024) * 100) / 100) + 'KB'
        )
      },
      // 覆盖默认的上传行为，可以自定义上传的实现 TO.DO 了解自定义上传行为如何使用
      // httpRequest:()=>{}
    }

    return { uploadAttr, upload1, fileInput, action, setImage }
  },
}
</script>

<style lang="scss" scoped>
.upload-demo {
  display: flex;

  > * {
    background-color: white;
    position: relative;
    padding: 5px 20px;
    margin: 10px;
    flex: 1;
  }
}

@media screen and (max-width: $sm-width) {
  .upload-demo {
    flex-direction: column;
  }
}
</style>
