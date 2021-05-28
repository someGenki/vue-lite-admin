<template>
<div class="clearfix">
  <div class="about-me">
    <img class="avatar-me" :src="DioAvatar" alt="avatar" />
    <p class="name-me">
      禾几元
      <app-icon icon="el-icon-male" />
    </p>
    <p style="text-align: center">禾+几=秃 😭😭😭</p>
    <ul class="about-me-detail">
      <li v-for="(item,index) in introduce" :key="index">
        <app-icon :icon="item.i" />
        {{ item.t }}
      </li>
    </ul>
    <el-divider content-position="left">标签</el-divider>
    <el-tag type="info" v-for="t in myTags" :key="t" v-text="t" />
    <el-divider content-position="left">技能</el-divider>
    <ul class="about-me-skills">
      <li>
        替身技能：浪费时间
        <app-icon icon="el-icon-time" />
      </li>
      <li>掌握Java语言，有SpringBoot项目(玩具)开发经验</li>
      <li>对JVM有基本的了解，包括内存结构以及JMM和GC</li>
      <li>了解Redis、Mysql、Mybatis、Maven等后端相关技术</li>
      <li>Linux会一些，比如配置环境、部署项目、编写简易脚本</li>
      <li>前端三大js框架只会vue， --TODO--</li>
      <li>其他技术如Git，Nginx，Docker也会，但不是特别会</li>
    </ul>
  </div>
  <div class="detail-info">
    <el-tabs type="border-card">
      <el-tab-pane label="文章">文章</el-tab-pane>
      <el-tab-pane label="项目">项目</el-tab-pane>
      <el-tab-pane label="其他">其他</el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import DioAvatar from '/src/assets/dio.jpg'
export default {
  name: 'Profile',
  setup() {
    const introduce = [
      { i: 'el-icon-user', t: '模仿专家' },
      { i: 'el-icon-school', t: '二本带学就读' },
      { i: 'el-icon-house', t: '来自福建厦门' },
      { i: 'el-icon-monitor', t: '联想小新Pro16' },
      { i: 'el-icon-message', t: '1159140147@qq.com' },
    ]

    const myTags = [
      'Jo厨!',
      '不算是二次元',
      '前后端都会点',
      '很想找工作',
      '喜欢折腾',
      '轻微代码洁癖',
      '22届应届生',
      'LOL娱乐模式玩家',
      'Steam天天在线',
    ]

    return {
      DioAvatar,
      introduce,
      myTags,
    }
  },
}
</script>

<style lang="scss" scoped>
$card-gap: 20px;
.about-me {
  float: left;
  width: 35%;
  max-width: 500px;
  margin-right: $card-gap;
  padding: 20px;
  background-color: white;
}

.detail-info {
  overflow: hidden;
  background-color: white;
  //创建bfc 使其不与浮动盒子区域重叠，因此会重新计算宽度。也可以用Flex布局配合flex:1;
}

.avatar-me {
  display: block;
  margin: 0 auto 20px;
  width: 100px;
  border-radius: 50%;
}

.name-me {
  text-align: center;
  font-weight: bold;
  > i {
    font-weight: bold;
    color: #5284ad;
  }
}

.about-me-detail {
  list-style: none;
  padding-left: 0;
  color: $primary-text-color;
  > li {
    margin-bottom: 10px;
    > i {
      margin-right: 10px;
    }
  }
}
.about-me-skills {
  color: $primary-text-color;
  > li {
    margin-bottom: 10px;
  }
}
.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

@media screen and (max-width: $sm-width) {
  .about-me {
    width: 100%;
    max-width: $sm-width;
    margin-bottom: $card-gap;
  }
  .detail-info {
    width: 100%;
  }
}
</style>
