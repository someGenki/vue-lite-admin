/**把一个组件变成可拖拽的组件 前提:position: absolute; 不用。。 */
function drag(el, binding) {
  el.onmousedown = (e) => {
    let disx = e.pageX - el.offsetLeft
    let disy = e.pageY - el.offsetTop
    document.onmousemove = (e) => {
      moveElement(el, e, binding.value, disx, disy)
    }
    document.onmouseup = () =>
      (document.onmousemove = document.onmouseup = null)
  }
  el.ontouchstart = (e) => {
    const t = e.changedTouches[0]
    let disx = t.pageX - el.offsetLeft
    let disy = t.pageY - el.offsetTop
    document.ontouchmove = (e) => {
      e.stopPropagation()
      const t = e.changedTouches[0]
      moveElement(el, t, binding.value, disx, disy)
    }
    document.ontouchend = () =>
      (document.ontouchmove = document.ontouchend = null)
  }
}

function moveElement(el, event, direction, x, y) {
  if (direction === 'vertical') {
    el.style.top = event.pageY - y + 'px'
  } else if (direction === 'horizontal') {
    el.style.left = event.pageX - x + 'px'
  } else {
    el.style.left = event.pageX - x + 'px'
    el.style.top = event.pageY - y + 'px'
  }
}

export default drag
