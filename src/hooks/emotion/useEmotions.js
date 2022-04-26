import emotionList from './emotion-list'

const wxReg = /\[wx_([\u4E00-\u9FA5]{1,3})]/g

export function processWx(str, klass = 'wx-emoji') {
  return str?.replace(wxReg, (_, word) => {
    const index = emotionList.weChatList.indexOf(word)
    return index !== -1
      ? `<img class="${klass}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" alt="">`
      : _
  })
}

/**
 * emotions中的热门😃来自 [EMOJIAll](https://www.emojiall.com/zh-hans/top-daily/zh-hans)
 */
const emotions = {
  wx: {
    list: emotionList.weChatList,
    name: '微信表情',
    process: (text, index) => ({
      text: `[wx_${text}]`,
      html: `<img title="[wx_${text}]" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif"/>`,
    }),
    getFirst: null,
  },
  emoji: {
    name: '热门😃',
    list: emotionList.emojiList,
    process: (s) => ({ text: s, html: s }),
  },
  kaomoji: {
    name: '颜文字',
    list: emotionList.kaomojiList,
    process: (s) => ({ text: s, html: s }),
  },
}

function getTabs(emotions) {
  return Object.keys(emotions).map((key) => ({
    key: key,
    name: emotions[key].name,
    first: emotions[key].process(emotions[key].list[0], 0).html,
  }))
}

export function useEmotion() {
  return { processWx, emotions, emotionTabs: getTabs(emotions) }
}
