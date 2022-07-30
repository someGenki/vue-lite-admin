import{r as l,u as p}from"./index.23672c53.js";const d="waterMark",u=Symbol(),f=`
    position:fixed;
    top:0; left:0; bottom:0; right:0;
    pointer-events:none;
    background-repeat:repeat;`,g={letterSpacing:4,width:400,height:100,stroke:"#000",opacity:.1,fontSize:16,rotate:-20};function b(i,s){const e=Object.assign(g,s),a=`<svg xmlns="http://www.w3.org/2000/svg" letter-spacing="${e.letterSpacing}" width="${e.width}" height="${e.height}"><text x="0px" dx="0px" y="32px" dy="16px" fill="none" font-weight="100"
        stroke="${e.stroke}"
        stroke-opacity="${e.opacity}"
        font-size="${e.fontSize}"
        transform="rotate(${e.rotate})"
      >${i}</text>
      </svg>`;return`url(data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(a)))})`}function w(){function i(){const r=l.currentRoute.value;p().removeCachedView(r),!(r.path.indexOf("/redirect")>-1)&&l.replace("/redirect")}function s(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}function e(r=document.body){const o=r.querySelector("#"+d);o&&(o[u]&&o[u].disconnect(),o.remove())}function a(r,o={},n=document.body,m=!1){e(n);const t=document.createElement("div");if(t.setAttribute("id",d),t.setAttribute("style",f),t.style.backgroundImage=b(r,o),n.appendChild(t),m===!0){const c=new MutationObserver(()=>{n.contains(t)||n.appendChild(t)});c.observe(n,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["style"]}),t[u]=c}}return{refreshPage:i,fullScreen:s,waterMark:a,delWaterMark:e}}export{w as u};
