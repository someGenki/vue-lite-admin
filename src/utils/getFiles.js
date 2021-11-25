const fs = require('fs')

const { readdirSync } = fs

export function getFilesWithFullPath(dir, fileType = 'js', exclude = []) {
  function recursive(dir) {
    const res = []
    const dirents = readdirSync(dir, { withFileTypes: true })
    for (const dirent of dirents) {
      // 是目录则递归遍历目录
      if (dirent.isDirectory()) {
        res.push(...recursive(dir + dirent.name + '/'))
      } else {
        // 排除指定文件,先排除不满足的文件后缀，再根据 exclude 数组排除
        if (dirent.name.endsWith(fileType)) {
          if (exclude.some((value) => dirent.name.indexOf(value) > -1)) continue
        } else {
          continue
        }
        res.push(dir + '/' + dirent.name)
      }
    }
    return res
  }

  return recursive(dir)
}

// test
//console.log(getFiles(process.cwd() + '/', 'js', ['_utils', 'test']))
