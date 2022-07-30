import{ap as Q,j as Y,o as r,c as g,a as f,W as w,J as Z,P as b,M as ee,T as D,a3 as S,B as z,e as W,a4 as p,u as s,$ as A,U as M,X as c,Q as m,E as V,Y as te,a5 as ne,az as R,aA as U,R as H,S as E,L as K,a7 as B,F as T,a0 as oe,d as ae,V as N,K as F,aB as se,ay as X,r as le}from"./@vue.18c62693.js";import{bW as ie,bX as ce}from"./vendor.6c9568b9.js";import{_ as x,u as C,a as re,r as L,b as de,c as ue}from"./index.23672c53.js";import{u as G}from"./usePageFn.b20846ed.js";import{_ as _e}from"./dio.f5d105ce.js";import"./element-plus.16ed0819.js";import"./@element-plus.d6268c5a.js";import"./@popperjs.36402333.js";function me(t,o=1e3){let e=null;return function(...l){e===null&&(t(...l),e=setTimeout(()=>e=null,o))}}const O=ie("style",{state:()=>({"primary-color":"#35A7FF","primary-color-tinge":"#75d2de","primary-text-color":"#000000a6","primary-text-color-tinge":"#00000070"}),getters:{elMenuStyle:t=>({text:"#dcdcdc",background:"transparent",activeText:t["primary-color"]})},actions:{injectCssVarToRoot(){const t=document.documentElement.style,o=Q(this.$state);Object.keys(o).forEach(e=>{t.setProperty(`--${e}`,o[e])})},changePrimaryColor(t){document.documentElement.style.setProperty("--primary-color",t)}}});const pe={name:"SettingItem",inheritAttrs:!1,props:{desc:{type:String,required:!0},modelValue:{type:[Boolean,String,Number]},comp:{type:String,default:"el-switch"},typeProp:{}},emits:["update:modelValue","change"],setup(t,{emit:o}){return{value:Y({get:()=>t.modelValue,set:l=>o("update:modelValue",l)})}}},fe={class:"setting-item"},he={style:{"font-size":"14px"}};function ve(t,o,e,l,i,n){return r(),g("div",fe,[f("span",he,w(e.desc),1),Z(t.$slots,"default",{},()=>[(r(),b(D(e.comp),ee(t.$attrs,{modelValue:l.value,"onUpdate:modelValue":o[0]||(o[0]=a=>l.value=a)}),null,16,["modelValue"]))],!0)])}const I=x(pe,[["render",ve],["__scopeId","data-v-043c6080"]]);const j=t=>(R("data-v-f73b6f3c"),t=t(),U(),t),ge={key:0,class:"settings-panel-content"},be={class:"settings-panel-header"},ye=j(()=>f("span",null,"\u9879\u76EE\u914D\u7F6E",-1)),xe={class:"settings-panel-body"},ke=j(()=>f("span",{style:{"font-size":"16px"}},"\u754C\u9762\u663E\u793A",-1)),$e=j(()=>f("span",{style:{"font-size":"16px"}},"\u754C\u9762\u529F\u80FD",-1)),we={__name:"index",setup(t){const{showLogo:o,showTabBar:e,fixedHeader:l,showSettings:i,sUnfoldWidth:n,menuAccordion:a,toggleSettings:d}=S(C()),u=O(),h=z(u,"primary-color"),_=z(u,"changePrimaryColor"),k=$=>{$.keyCode===27&&(i.value=!1)};return W(i,$=>{$===!0?document.addEventListener("keydown",k):document.removeEventListener("keydown",k)}),($,v)=>{const P=p("el-divider"),J=p("el-color-picker");return r(),b(ne,{to:"body"},[s(i)?(r(),g("div",{key:0,class:"mask-zIndex99",onClick:v[0]||(v[0]=A(y=>s(d)(!1),["stop","prevent","self"]))})):M("",!0),c(te,{name:"show-transform"},{default:m(()=>[s(i)?(r(),g("div",ge,[f("div",be,[ye,f("button",{onClick:v[1]||(v[1]=y=>s(d)(!1)),class:"close-btn",textContent:"\u274C"})]),f("div",xe,[c(P,null,{default:m(()=>[ke]),_:1}),c(I,{modelValue:s(l),"onUpdate:modelValue":v[2]||(v[2]=y=>V(l)?l.value=y:null),type:"el-switch",desc:"\u56FA\u5B9A\u5934\u90E8"},null,8,["modelValue"]),c(I,{modelValue:s(o),"onUpdate:modelValue":v[3]||(v[3]=y=>V(o)?o.value=y:null),type:"el-switch",desc:"\u4FA7\u8FB9\u680FLogo"},null,8,["modelValue"]),c(I,{modelValue:s(e),"onUpdate:modelValue":v[4]||(v[4]=y=>V(e)?e.value=y:null),comp:"el-switch",desc:"\u6807\u7B7E\u680F\u5BFC\u822A"},null,8,["modelValue"]),c(I,{modelValue:s(n),"onUpdate:modelValue":v[5]||(v[5]=y=>V(n)?n.value=y:null),step:5,min:160,max:260,comp:"el-input-number",desc:"\u4FA7\u8FB9\u680F\u5BBD\u5EA6",size:"small"},null,8,["modelValue"]),c(I,{desc:"\u4E3B\u9898\u989C\u8272"},{default:m(()=>[c(J,{modelValue:s(h),"onUpdate:modelValue":v[6]||(v[6]=y=>V(h)?h.value=y:null),onChange:s(_)},null,8,["modelValue","onChange"])]),_:1}),c(P,null,{default:m(()=>[$e]),_:1}),c(I,{modelValue:s(a),"onUpdate:modelValue":v[7]||(v[7]=y=>V(a)?a.value=y:null),comp:"el-switch",desc:"\u83DC\u5355\u624B\u98CE\u7434\u6A21\u5F0F"},null,8,["modelValue"])])])):M("",!0)]),_:1})])}}},Se=x(we,[["__scopeId","data-v-f73b6f3c"]]),Ce="/vue-lite-admin/assets/logo2.c8486c4e.ico";const Ve={name:"SidebarLogo",props:{toPath:{default:"/"},isCollapse:{default:!1},textColor:{default:"#dcdcdc"},title:{default:"Admin-Template"},backgroundColor:{default:"#2f343d"}}},Ie=t=>(R("data-v-c2d25267"),t=t(),U(),t),Te=Ie(()=>f("img",{width:"32",height:"32",src:Ce,alt:"logo"},null,-1));function Be(t,o,e,l,i,n){const a=p("router-link");return r(),b(a,{to:e.toPath,class:"MutableLogo-wrapper",style:K({backgroundColor:e.backgroundColor,color:e.textColor})},{default:m(()=>[Te,H(f("h4",{style:{"margin-left":"6px"}},w(e.title),513),[[E,e.isCollapse]])]),_:1},8,["to","style"])}const Pe=x(Ve,[["render",Be],["__scopeId","data-v-c2d25267"]]),Le={name:"SidebarItem",props:{item:{type:Object,required:!0}},setup(t){const o=t.item,e=ce();return{realPath:!ze(o.path)&&o.name?e.resolve({name:o.name}).path:o.path}}};function ze(t){return/^(https?:|mailto:|tel:)/.test(t)}const Me={style:{"margin-left":"4px"}},Ae={style:{"margin-left":"4px"}};function Re(t,o,e,l,i,n){const a=p("app-icon"),d=p("sidebar-item",!0),u=p("el-sub-menu"),h=p("el-menu-item"),_=p("app-link");return e.item.children&&e.item.children.length>0?(r(),b(u,{key:0,index:e.item.path},{title:m(()=>[c(a,{icon:e.item.icon||"el-icon-grid"},null,8,["icon"]),f("span",Me,w(e.item.title),1)]),default:m(()=>[(r(!0),g(T,null,B(e.item.children,k=>(r(),b(d,{key:k.path,item:k},null,8,["item"]))),128))]),_:1},8,["index"])):(r(),b(_,{key:1,to:l.realPath},{default:m(()=>[c(h,{index:l.realPath},{title:m(()=>[f("span",Ae,w(e.item.title),1)]),default:m(()=>[c(a,{icon:e.item.icon||"el-icon-menu"},null,8,["icon"])]),_:1},8,["index"])]),_:1},8,["to"]))}const Ue=x(Le,[["render",Re]]);function q(t){const o=[];function e(n){if(!n.meta&&n.children&&n.children.length===1){let a=n.children[0];if(a.meta&&a.meta.title)return a.path[0]!=="/"&&(a.path=n.path+"/"+a.path),a}return null}function l(n){return{title:n.meta.title,icon:n.meta.icon,path:n.path,name:n.name}}function i(n){let a=[];for(const d of n)if(!d.hidden)if(d.path==="/ex-link")a.push(l(d.children[0]));else if(d.children&&d.children.length>0){let u=i(d.children),h=l(d);u.length>0&&(h.children=u),a.push(h)}else a.push(l(d));return a}for(const n of t)if(!n.hidden){if(n.path==="/ex-link"){o.push(n.children[0]);continue}let a=e(n);if(a){o.push(a);continue}!a&&n.meta&&n.meta.title&&o.push(n)}return i(o)}const Fe={__name:"index",setup(t){const{elMenuStyle:o}=S(O()),{addRoutes:e}=S(re()),l=oe([]);l.push(...q(e.value)),W(e,_=>{l.length=0,l.push(...q(_))});const{showLogo:i,unfoldSidebar:n,sidebarWidth:a,menuAccordion:d}=S(C()),u=ae(!1);function h(){u.value=!u.value}return(_,k)=>{const $=p("el-menu"),v=p("el-button");return r(),g("aside",{class:F(["sidebar-container",{"starry-sky":u.value}]),style:K({width:s(a)})},[H(c(Pe,{backgroundColor:"transparent","is-collapse":s(n)},null,8,["is-collapse"]),[[E,s(i)]]),c($,{"collapse-transition":!1,uniqueOpened:s(d),collapse:!s(n),"default-active":_.$route.path,"text-color":s(o).text,"active-text-color":s(o).activeText,"background-color":s(o).background},{default:m(()=>[(r(!0),g(T,null,B(l,P=>(r(),b(Ue,{key:l.path,item:P},null,8,["item"]))),128))]),_:1},8,["uniqueOpened","collapse","default-active","text-color","active-text-color","background-color"]),c(v,{type:"primary",size:"small",onClick:h},{default:m(()=>[N(" \u6362\u80CC\u666F "+w(l.length),1)]),_:1})],6)}}},He=x(Fe,[["__scopeId","data-v-05e47e80"]]);const Ee={class:"app-main"},Ne={__name:"index",setup(t){const o=z(C(),"cachedViews");return(e,l)=>{const i=p("router-view");return r(),g("div",Ee,[c(i,null,{default:m(({Component:n})=>[(r(),b(se,{include:s(o)},[(r(),b(D(n)))],1032,["include"]))]),_:1})])}}},Oe=x(Ne,[["__scopeId","data-v-aeefb8b9"]]);function je(){const{visitedViews:t}=S(C());function o(e,l="self"){const i=t.value;for(let n=0,a=i.length;n<a;n++){const d=i[n];if(d.timeStamp===e.timeStamp){switch(l){case"self":if(i.splice(n,1),L.currentRoute.value.fullPath===d.fullPath){const u=i[n-1]||i[n];u?L.push(u.fullPath):L.push("/")}break;case"all":i.splice(0,a),L.push("/");break;case"left":i.splice(0,n);break;case"other":i.splice(0,i.length,d);break;case"right":i.splice(n+1,a);break}break}}}return{visitedViews:t,delTabBarItem:o}}const qe=["data-time"],De={__name:"TarBarItem",props:{item:Object,close:Function},setup(t){return(o,e)=>{const l=p("app-icon");return r(),g("div",{class:F(["TabBar-item",{active:o.$route.fullPath===t.item.fullPath,mark:t.item.mark}]),onMouseupCapture:e[2]||(e[2]=A(i=>t.close(t.item),["middle","stop"]))},[f("span",{"data-time":t.item.timeStamp,onClick:e[0]||(e[0]=i=>o.$router.replace(t.item))},w(t.item.title),9,qe),c(l,{onClick:e[1]||(e[1]=i=>t.close(t.item)),class:"tab-close",icon:"el-icon-close",size:"12"})],34)}}},We=x(De,[["__scopeId","data-v-921350d9"]]);const Ke={class:"TabBar"},Xe={__name:"index",setup(t){X(a=>({"623c5294":s(i)}));const{refreshPage:o}=G(),{delTabBarItem:e,visitedViews:l}=je(),i=z(C(),"mainPaddingLeft"),n=a=>{if(a.target.tagName==="SPAN"){a.preventDefault();const d=+a.target.dataset.time;l.value.filter(u=>u.timeStamp===d)[0]}};return(a,d)=>{const u=p("el-scrollbar"),h=p("app-icon");return r(),g("div",Ke,[c(u,null,{default:m(()=>[f("div",{class:"item-list",onContextmenu:n},[(r(!0),g(T,null,B(s(l),_=>(r(),b(We,{key:_.timeStamp,item:_,close:s(e)},null,8,["item","close"]))),128))],32)]),_:1}),f("span",{class:"TabBar-refresh",onClick:d[0]||(d[0]=(..._)=>s(o)&&s(o)(..._)),title:"refresh"},[c(h,{icon:"el-icon-refresh"})])])}}},Ge=x(Xe,[["__scopeId","data-v-ed7d5a52"]]);const Je={name:"AvatarMenu",props:{items:{type:Array,required:!0},avatar:{},nickname:{}}},Qe=["src"];function Ye(t,o,e,l,i,n){const a=p("app-link"),d=p("el-dropdown-item"),u=p("el-dropdown-menu"),h=p("el-dropdown");return r(),g(T,null,[c(h,null,{dropdown:m(()=>[c(u,null,{default:m(()=>[(r(!0),g(T,null,B(e.items,_=>(r(),b(d,{key:_.title,divided:_.divided,disabled:_.disabled,onClick:k=>typeof _.handle=="function"?_.handle():null},{default:m(()=>[c(a,{to:_.path},{default:m(()=>[N(w(_.title),1)]),_:2},1032,["to"])]),_:2},1032,["divided","disabled","onClick"]))),128))]),_:1})]),default:m(()=>[f("img",{class:"dropdown-avatar",src:e.avatar,alt:"avatar"},null,8,Qe)]),_:1}),H(f("p",{class:"menu-nickname"},w(e.nickname),513),[[E,e.nickname]])],64)}const Ze=x(Je,[["render",Ye],["__scopeId","data-v-8838c193"]]);const et={name:"Breadcrumb",props:["list"]};function tt(t,o,e,l,i,n){const a=p("el-breadcrumb-item"),d=p("el-breadcrumb");return r(),b(d,{class:"app-breadcrumb",separator:"/"},{default:m(()=>[(r(!0),g(T,null,B(e.list,u=>(r(),b(a,{to:{name:u.name}},{default:m(()=>[N(w(u.meta.title),1)]),_:2},1032,["to"]))),256))]),_:1})}const nt=x(et,[["render",tt],["__scopeId","data-v-96912de9"]]);const ot={name:"Hamburger",props:{unfold:{type:Boolean,require:!0}},emits:["toggleClick"]},at=t=>(R("data-v-3c18d87c"),t=t(),U(),t),st=at(()=>f("path",{d:"M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"},null,-1)),lt=[st];function it(t,o,e,l,i,n){return r(),g("div",{class:"hamburger-container",onClick:o[0]||(o[0]=a=>t.$emit("toggleClick"))},[(r(),g("svg",{class:F([{unfold:e.unfold},"hamburger"]),viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64"},lt,2))])}const ct=x(ot,[["render",it],["__scopeId","data-v-3c18d87c"]]);const rt=t=>(R("data-v-d1da8f52"),t=t(),U(),t),dt={class:"navbar",role:"navigation"},ut={class:"right-menu-area"},_t={class:"right-menu-action"},mt=rt(()=>f("p",null,"TODO \u6D88\u606F\u901A\u77E5",-1)),pt={__name:"index",setup(t){const{fullScreen:o}=G(),{unfoldSidebar:e,breadcrumbList:l,toggleSidebar:i,toggleSettings:n}=S(C()),a=le([{title:"\u4E2A\u4EBA\u4E2D\u5FC3",path:"/profile"},{title:"\u6D4B\u8BD5\u9875\u9762",path:"/test"},{title:"\u9879\u76EE\u5730\u5740",path:"https://github.com/someGenki/vue-lite-admin"},{title:"\u4E0D\u53EF\u70B9\u51FB",path:"/",disabled:!0},{title:"\u9000\u51FA\u767B\u5F55",handle:()=>{alert("\u60A8\u9009\u62E9\u4E86\u767B\u51FA"),de(),location.reload()}}]);return(d,u)=>{const h=p("app-icon"),_=p("el-badge"),k=p("el-popover");return r(),g("div",dt,[c(ct,{unfold:s(e),onToggleClick:s(i)},null,8,["unfold","onToggleClick"]),c(nt,{list:s(l)},null,8,["list"]),f("div",ut,[c(h,{class:"right-menu-action",icon:"el-icon-search"}),c(h,{onClick:s(o),class:"right-menu-action",icon:"el-icon-full-screen"},null,8,["onClick"]),c(k,{trigger:"click"},{reference:m(()=>[f("span",_t,[c(_,{"is-dot":""},{default:m(()=>[c(h,{icon:"el-icon-bell"})]),_:1})])]),default:m(()=>[mt]),_:1}),c(Ze,{nickname:"\u7BA1\u7406\u5458",items:s(a),avatar:s(_e)},null,8,["items","avatar"]),c(h,{size:"20",icon:"el-icon-setting",class:"right-menu-action",onClick:u[0]||(u[0]=A($=>s(n)(!0),["stop"]))})])])}}},ft=x(pt,[["__scopeId","data-v-d1da8f52"]]);const ht={class:"app-wrapper"},vt={class:"main-container"},gt={__name:"index",setup(t){X(k=>({"42c7d905":s(_),"4e04370c":s(h)}));const o=O(),e=C(),{isMobile:l,showTabBar:i,fixedHeader:n,toggleSidebar:a,unfoldSidebar:d,checkIsMobile:u,mainPaddingLeft:h,mainPaddingTopOnFixed:_}=S(e);return e.$subscribe((k,$)=>{ue(["showLogo","showTabBar","fixedHeader","sUnfoldWidth","menuAccordion","unfoldSidebar"],$)}),window.addEventListener("resize",me(u.value,200),{passive:!0}),o.injectCssVarToRoot(),(k,$)=>(r(),g("div",ht,[c(s(He)),s(l)&&s(d)?(r(),g("div",{key:0,class:"mask-zIndex99",onClick:$[0]||($[0]=A(v=>s(a)(!1),["self","stop"]))})):M("",!0),f("div",vt,[f("header",{class:F({"fixed-header":s(n)})},[c(s(ft)),s(i)?(r(),b(s(Ge),{key:0})):M("",!0)],2),c(s(Oe))]),c(s(Se))]))}},Vt=x(gt,[["__scopeId","data-v-12d88b42"]]);export{Vt as default};
