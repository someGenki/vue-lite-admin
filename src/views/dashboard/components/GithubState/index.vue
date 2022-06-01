<template>
  <div class="github-state">
    <div class="github-logo">
      <app-icon icon="github" color="#ffffff" size="32" />
      <div>
        <span style="margin-bottom: 3px; font-weight: bold">Github</span>
        <span style="font-size: 0.8rem">资料卡</span>
      </div>
    </div>
    <div class="github-star">
      <app-icon icon="el-icon-star" color="#ffffff" />
      <span>{{ star }}</span>
    </div>
    <div class="github-cat">
      <img :src="cat" alt="github-cat" />
    </div>
    <a class="github-link" target="_blank" href="https://github.com/someGenki">
      github.com/someGenki
    </a>
  </div>
</template>

<script>
import cat from './githubCat.svg'
// 猫猫图标来自Github/profile页面...
export default {
  name: 'GithubState',
  data() {
    return { star: 59, cat }
  },
}
</script>

<style lang="scss" scoped>
$theme-color: #161b22;
$card-height: 160px;

.github-state {
  position: relative;
  height: $card-height;
  padding: 10px;
  background-color: $theme-color;
  border-radius: 8px;
}

.github-logo {
  display: flex;
  align-items: center;

  > div {
    display: inline-flex;
    flex-direction: column;
    margin-left: 10px;
    color: white;
  }
}

.github-cat {
  position: absolute;
  right: 6px;
  bottom: 0;
}

.github-link {
  position: absolute;
  bottom: 8px;
  left: 10px;
  padding: 1px;
  font-size: 0.8rem;
  color: #eee;

  &:hover {
    border-bottom: 1px solid #eee;
  }
}

.github-star {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.2rem;
  color: #eee;

  span {
    margin-left: 6px;
  }
}
</style>
