<template>
  <div>
    <el-descriptions title="项目信息" direction="vertical" border>
      <el-descriptions-item label="项目名">
        {{ pkg.name }}
      </el-descriptions-item>
      <el-descriptions-item label="版本号">
        <el-tag size="small">{{ pkg.version }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="最后编译时间">
        {{ lastBuildTime }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="运行时依赖" size="small" :column="4" border>
      <el-descriptions-item
        v-for="(val, key) in pkg.dependencies"
        width="120px"
        :label="key"
      >
        {{ val }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="开发时依赖" size="small" :column="4" border>
      <el-descriptions-item
        v-for="(val, key) in pkg.devDependencies"
        width="120px"
        :label="key"
      >
        {{ val }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'about',
  setup() {
    // 定义在vite.config.js中的全局常量，在启动/打包时生成
    // TODO 修改构建时间格式本地化
    const { pkg, lastBuildTime } = __APP_INFO__
    return { pkg, lastBuildTime }
  },
}
</script>

<style lang="scss" scoped>
.el-descriptions {
  margin-bottom: 20px;
}

// vue3样式穿透新写法
:deep(.el-descriptions__label.is-bordered-label) {
  font-size: 14px;
  color: var(--primary-text-color);
}
</style>
