import emotionList from './emotion-list'

// 将原生表情文本变成img表情  [呲牙] => <img src="..."/>
export function processEmotionText(str) {
  return str.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, (words) => {
    let word = words.replace(/\[|\]/gi, '')
    let index = emotionList.weChatList.indexOf(word)
    return index !== -1
      ? `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`
      : words
  })
}

export function useEmotions(type) {
  if (type === 'wechat') {
    return emotionList.weChatList.map((item, index) => {
      return {
        name: `[${item}]`,
        url: `<img title="${item}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`,
      }
    })
  } else if (type === 'kaomoji') {
    return emotionList.kaomojiList
  } else return null
}
