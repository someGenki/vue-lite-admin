// 不提前导出会报“ Cannot access 'xxx' before initialization”  参考了vben的做法
export const LAYOUT = () => import('/src/layout/index.vue')
