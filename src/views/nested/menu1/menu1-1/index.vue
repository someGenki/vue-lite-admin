<template>
  <div style="padding: 30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </el-alert>
  </div>
</template>
