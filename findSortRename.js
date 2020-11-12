// 遍历查找重命名写真图片
const fs = require("fs")
const path = require('path')
const imagesizeof = require('image-size')

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    let pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback)
    } else {
      if (file.indexOf('jpg') > -1 && file !== 'cover.jpg') {
        callback(pathname)
      }
    }
  })
}
function PrefixZero(num, n) {
  return (Array(n).join(0) + num).slice(-n)
}
function copyAndPaste(sourcePath, targetPath, imageCount) {
  let targetFullPath = `${targetPath}/${imageCount}.jpg`
  fs.copyFile(sourcePath, targetFullPath, (err) => {
    if (err) console.log(err)
  })
  console.log(`${sourcePath}  ====>  ${targetFullPath}`)
}

let widthCount = 426
let heightCount = 2245
let sourceBasePath = 'F:/img/绯月樱临时'
let targetBasePath = 'F:/img/绯月樱'

travel(sourceBasePath, function (pathname) {
  let imageInfo = imagesizeof(pathname)
  let imageCount
  let targetPath
  if (imageInfo.width > imageInfo.height) {
    imageCount = PrefixZero(++widthCount, 5)
    targetPath = targetBasePath + '/width_bg'
  } else {
    imageCount = PrefixZero(++heightCount, 5)
    targetPath = targetBasePath + '/height_bg'
  }
  copyAndPaste(pathname, targetPath, imageCount)
})