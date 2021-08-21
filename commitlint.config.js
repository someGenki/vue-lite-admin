// git commit提交检查 git commit -m 'feat(login): remember user name'
// 如果使用git commit提交完，发现有东西还要该，且还未push。可以使用 git commit --amend -a进行附加
// TODO 学习如何规范化git commit 和 生成CHANGELOG
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增特性
        'fix', // 修补bug
        'perf', // 优化相关，比如提升性能或者使用体验
        'style', // 代码格式优化，如空格，缩进，逗号等
        'docs', // 文档变动
        'test', // 增加测试
        'refactor', // 代码重构
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'ci', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'chore', // 改变构建流程、或者增加依赖库、工具等
        'revert', // 回滚到上个版本
        'update', // 更新某个功能 文件
        'wip', // Work In Process 表示代码还在开发，暂时不能合入
        'types', // typescript类型添加、变动
        'release', // 发布新的版本
      ],
    ],
  },
}
