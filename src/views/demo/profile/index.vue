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
      '熟练掌握HTML、CSS和JavaScript，熟悉TypeScript',
      '熟练使用Vue.js框架且了解React框架和React Hooks的使用',
      '在工作中能够灵活的使用ES6语法进行开发，并熟练使用异步编程',
      '熟悉Nodejs和浏览器的运行、渲染原理以及HTTP(S)协议的通信过程',
      '熟悉常见的数据结构与算法、设计模式、函数式编程和代码格式规范',
      '熟悉Webpack、Vite等构建工具以及了解Git，Nginx和Docker的使用',
      '后端开发熟悉Java语言，有Mysql使用和Springboot项目相关编写经验',
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

@media screen and (max-width: $sm-width) {
  .about-me {
    width: 100% !important;
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

.about-me {
  float: left;
  width: 35%;
  max-width: 500px;
  padding: 20px;
  margin-right: $card-gap;
  background-color: white;
}

.detail-info {
  overflow: hidden;
  background-color: white;
  //创建bfc 使其不与浮动盒子区域重叠，因此会重新计算宽度。也可以用Flex布局配合flex:1;
  .article-text {
    > p {
      margin: 6px 16px;
      font-weight: bold;
    }

    > span {
      margin: 0 16px;
      font-size: 0.9rem;
    }
  }
}

.avatar-me {
  display: block;
  width: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
}

.name-me {
  font-weight: bold;
  text-align: center;

  > i {
    font-weight: bold;
    color: #5284ad;
  }
}

.about-me-detail {
  padding-left: 0;
  color: var(--primary-text-color,$primary-text-color);
  list-style: none;

  > li {
    margin-bottom: 10px;

    > i {
      margin-right: 10px;
    }
  }
}

.about-me-skills {
  padding-left: 18px;
  color: var(--primary-text-color,$primary-text-color);

  > li {
    margin-bottom: 10px;
  }
}

.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
