<template>
  <teleport to='body'>
    <div
      v-if='showSettings'
      class='mask-zIndex99'
      @click.stop.prevent.self='handleSettingsToggle(false)'
    />
    <transition name='show-transform'>
      <div v-if='showSettings' class='settings-panel-content'>
        <div class='settings-panel-header'>
          <span>项目配置</span>
          <button
            @click='handleSettingsToggle(false)'
            class='close-btn'
            v-text="'❌'"
          />
        </div>
        <div class='settings-panel-body'>
          <el-divider><span style='font-size: 16px'>界面显示</span></el-divider>
          <setting-item
            v-model='fixedHeader'
            type='el-switch'
            desc='固定头部'
          />
          <setting-item v-model='showLogo' type='el-switch' desc='侧边栏Logo' />
          <setting-item
            v-model='showTabBar'
            type='el-switch'
            desc='标签栏导航'
          />
          <setting-item
            v-model='sUnfoldWidth'
            :step='5'
            :min='160'
            :max='260'
            type='el-input-number'
            desc='侧边栏宽度'
            size='mini'
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
/*
vue3 teleport组件 https://v3.cn.vuejs.org/api/built-in-components.html#teleport
按键修饰符 https://v3.cn.vuejs.org/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6
 */
import useLayout from '../useLayout'
import { toRefs, watch } from 'vue'
import SettingItem from './SettingItem.vue'

export default {
  name: 'Settings',
  components: { SettingItem },
  setup() {
    const { handleSettingsToggle, state } = useLayout()

    const { showSettings, fixedHeader, sUnfoldWidth, showLogo, showTabBar } =
      toRefs(state)

    function closeSettings(e) {
      if (e.keyCode === 27) showSettings.value = false
    }

    // 当settings面板打开时，监听ESC按下事件，以此关闭settings面板
    watch(showSettings, (newVal) => {
      if (newVal === true) document.addEventListener('keydown', closeSettings)
      else document.removeEventListener('keydown', closeSettings)
    })

    return {
      handleSettingsToggle,
      showSettings,
      sUnfoldWidth,
      showTabBar,
      fixedHeader,
      showLogo,
    }
  },
}
</script>

<style lang='scss' scoped>
$setting-panel-width: 300px;

.settings-panel-content {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: $setting-panel-width;
  z-index: 2001;
  background-color: #fff;
  box-shadow: -2px 0 8px #7492b1f2;
}

.settings-panel-header {
  padding: 16px;
  position: relative;
  user-select: none;

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;

    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
  }
}

.settings-panel-body {
}

/* 过度动画 */
.show-transform-enter-active,
.show-transform-leave-active {
  opacity: 0;
  transition: all 0.4s;
}

.show-transform-enter-to {
  opacity: 1;
}

.show-transform-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
