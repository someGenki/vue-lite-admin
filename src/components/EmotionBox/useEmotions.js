import emotionList from './emotion-list'

export function useProcessEmotion(str) {
  return str.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, (words) => {
    let word = words.replace(/\[|\]/gi, '')
    let index = emotionList.weChatList.indexOf(word)
    if (index !== -1) {
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`
    } else {
      return words
    }
  })
}

export function useEmotions(type) {
  if (type === 'wechat') {
    let arr = []
    emotionList.weChatList.map((item, index) =>
      arr.push({
        name: `[${item}]`,
        url: `<img title="${item}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`,
      })
    )
    return arr
  } else if (type === 'kaomoji') {
    return emotionList.kaomojiList
  } else return null
}
