<template>
  <div class="clearfix">
    <div class="about-me">
      <img class="avatar-me" :src="DioAvatar" alt="avatar" />
      <p class="name-me">
        禾几元
        <app-icon icon="el-icon-male" />
      </p>
      <p style="text-align: center">禾+几=秃......</p>
      <ul class="about-me-detail">
        <li v-for="(item, index) in myIntroduce" :key="index">
          <app-icon :icon="item.i" />
          {{ item.t }}
        </li>
      </ul>
      <el-divider content-position="left">标签</el-divider>
      <el-tag type="info" v-for="t in myTags" :key="t" v-text="t" />
      <el-divider content-position="left">技能</el-divider>
      <ul class="about-me-skills">
        <li v-for="skill in mySkills">{{ skill }}</li>
      </ul>
    </div>
    <div class="detail-info">
      <el-tabs type="border-card">
        <el-tab-pane label="文章">
          <div class="detail-info__article">
            <a
              v-for="item in myArticle"
              target="_blank"
              :href="item.link"
              style="display: flex; margin-bottom: 20px"
            >
              <img height="60" width="160" :src="item.logo" alt="" />
              <div class="article-text">
                <p>{{ item.title }}</p>
                <span>{{ item.desc }}</span>
              </div>
            </a>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目">项目</el-tab-pane>
        <el-tab-pane label="其他">其他</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DioAvatar from '/src/assets/dio.jpg'
import cnblogsLogo from './cnblogs-logo.svg'
import juejinLogo from './juejin-logo.svg'
export default {
  name: 'Profile',
  setup() {
    const myIntroduce = [
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

    const mySkills = [
      '熟练掌握HTML、CSS和JavaScript等前端技术',
      '熟练使用ES6的相关特性并了解过ES7~ES11的新增特性',
      '熟练使用Vue.js搭配流行组件库Element、Antdv开发项目',
      '熟悉常见的数据结构与算法、设计模式和代码命名规范',
      '了解浏览器运行原理和HTTP(S)协议的通信过程',
      '掌握Linux系统的基本使用，能快速配置环境、部署项目和编写简易脚本',
      '熟悉Webpack、Vite等构建工具以及了解Git，Nginx和Docker的使用',
      '后端掌握Java语言，有足够的Mysql使用和Springboot项目编写经验',
      '对JVM有基本的了解，包括内存结构以及JMM和GC',
      '了解Redis、Mybatis、Maven、消息队列等后端相关技术',
    ]

    const myArticle = [
      {
        link: 'https://www.cnblogs.com/hejiyuan/',
        logo: cnblogsLogo,
        title: '博客园---累计40+篇文章',
        desc: '博客喜欢发在博客园，博客园SEO做的好哇',
      },
      {
        link: 'https://juejin.cn/user/2348212570294990',
        logo: juejinLogo,
        title: '掘金-一个帮助开发者成长的社区',
        desc: '最常在掘金看文章',
      },
    ]

    return {
      cnblogsLogo,
      juejinLogo,
      DioAvatar,
      myIntroduce,
      myArticle,
      mySkills,
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
  .article-text {
    > p {
      font-weight: bold;
      margin: 6px 16px;
    }
    > span {
      font-size: 0.9rem;
      margin: 0 16px;
    }
  }
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
  padding-left: 18px;
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
  .article-text > span {
    display: none;
  }
}
</style>
