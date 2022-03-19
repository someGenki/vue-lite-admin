// npm|yarn|pnpm|cnpm install 会先自动执行 package.json 中的 preinstall钩子(如果有)
// 可以用来限定使用的包管理器类型
if (!/yarn/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33m This project requires using yarn as the package manager ` +
      ` for scripts to work properly. \u001b[39m\n`
  )
  process.exit(1)
}