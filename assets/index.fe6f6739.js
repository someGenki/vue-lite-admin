import{c0 as f}from"./vendor.6c9568b9.js";import{_ as u}from"./index.23672c53.js";import{d as x,a4 as o,o as h,c as v,X as e,Q as d,a as s,V as i,az as k,aA as T}from"./@vue.18c62693.js";import"./element-plus.16ed0819.js";import"./@element-plus.d6268c5a.js";import"./@popperjs.36402333.js";const V={name:"TextEditor",components:{MdEditor:f},setup(){const t=x("Hello,world!");function n(){console.log(t.value)}return{mdText:t,printMdText:n}}},g=t=>(k("data-v-44daf00f"),t=t(),T(),t),b=g(()=>s("p",null,"\u63A8\u8350md-editor-v3",-1)),C=i(" md-editor-v3 "),E=i("@2.0.1"),I={class:"md-editor-container"},w=i("print origin text to console");function y(t,n,B,a,M,N){const _=o("app-explain"),p=o("app-link"),c=o("el-tag"),r=o("md-editor"),l=o("el-button");return h(),v("div",null,[e(_,{title:"\u6587\u672C\u7F16\u8F91\u5668"},{default:d(()=>[b]),_:1}),s("h2",null,[e(p,{sharp:"",to:"https://github.com/imzbf/md-editor-v3"},{default:d(()=>[C]),_:1}),e(c,{type:"info"},{default:d(()=>[E]),_:1})]),s("div",I,[e(r,{"no-prettier":"","no-katex":"","no-mermaid":"",modelValue:a.mdText,"onUpdate:modelValue":n[0]||(n[0]=m=>a.mdText=m)},null,8,["modelValue"])]),e(l,{onClick:a.printMdText},{default:d(()=>[w]),_:1},8,["onClick"])])}const X=u(V,[["render",y],["__scopeId","data-v-44daf00f"]]);export{X as default};