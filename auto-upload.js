const [user, ip, path] = ['root', '47.100.95.40', '/www/html/vite']
// 需要win10、配置密钥可以免输入密码
try {
  require('child_process').execSync(`scp -r ./dist/* ${user}@${ip}:${path}`)
  console.log('upload success!')
} catch (err) {
  console.log(err)
}
