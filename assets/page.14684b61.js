import{a as g,_ as k}from"./index.23672c53.js";import{d as y,a4 as m,ak as D,o as n,c as h,a as l,W as S,R as _,P as r,Q as a,U as u,n as T,V as i}from"./@vue.18c62693.js";import"./vendor.6c9568b9.js";import"./element-plus.16ed0819.js";import"./@element-plus.d6268c5a.js";import"./@popperjs.36402333.js";const A=g(),N=Array.prototype.concat.bind([]),x=(e,o)=>{const{value:s,modifiers:t}=o;!s||M(s)||(t.keep?(e.style.textDecoration="line-through",e.style.color="#d0d0d0",e.style.cursor="not-allowed",e.style.pointerEvents="none"):e.remove())};function M(e,o=!0){return e?R(N(e),A.roles):o}function R(e,o,s=!0){return s&&(e=e.map(t=>t.toUpperCase()),o=o.map(t=>t.toUpperCase())),e.some(t=>o.includes(t))}const C={name:"PagePermission",directives:{role:x},setup(){const e=g(),o=e.roles,s=y(!1);return{changeRole:f=>{e.changeRoles([f]),s.value=!0,T(()=>s.value=!1)},roles:o,tagsRefresh:s}}},I=l("h2",null,"\u6743\u9650\u9875\u9762",-1),E=l("h3",null,"v-role\u6307\u4EE4\u63A7\u5236\u5143\u7D20\u662F\u5426\u53EF\u89C1",-1),z={key:0,class:"tag-group"},B=i(" ADMIN"),P=i(" ADMIN(keep) "),U=i(" ['ADMIN','TEST'] "),V=i("TEST"),b=i("MAS"),w=l("h3",null,"\u5207\u6362\u89D2\u8272",-1),Q=i(" test "),W=i(" admin ");function j(e,o,s,t,f,q){const c=m("el-tag"),p=m("el-button"),d=D("role");return n(),h("div",null,[I,l("div",null,[l("p",null,"\u5F53\u524D\u6743\u9650\u7528\u6237\u62E5\u6709\u6743\u9650:"+S(t.roles),1)]),E,t.tagsRefresh?u("",!0):(n(),h("div",z,[_((n(),r(c,{effect:"dark",size:"large"},{default:a(()=>[B]),_:1})),[[d,"ADMIN"]]),_((n(),r(c,{effect:"dark",size:"large"},{default:a(()=>[P]),_:1})),[[d,"ADMIN",void 0,{keep:!0}]]),_((n(),r(c,{effect:"dark",size:"large"},{default:a(()=>[U]),_:1})),[[d,["ADMIN","TEST"]]]),_((n(),r(c,{effect:"dark",size:"large"},{default:a(()=>[V]),_:1})),[[d,"TEST"]]),_((n(),r(c,{effect:"dark",size:"large"},{default:a(()=>[b]),_:1})),[[d,"MAS"]])])),w,l("div",null,[t.roles.includes("test")?u("",!0):(n(),r(p,{key:0,onClick:o[0]||(o[0]=v=>t.changeRole("test"))},{default:a(()=>[Q]),_:1})),t.roles.includes("admin")?u("",!0):(n(),r(p,{key:1,onClick:o[1]||(o[1]=v=>t.changeRole("admin"))},{default:a(()=>[W]),_:1}))])])}const O=k(C,[["render",j]]);export{O as default};
