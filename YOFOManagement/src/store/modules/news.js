/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-11-15 09:51:45
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
import { getItem, setItem, removeItem } from '@/utils/storage' //getItem和setItem是封装的操作localStorage的方法
import { AesEncryption } from '@/utils/encrypt'
import { toRaw } from 'vue'

export default {
  namespaced: true,
  state: {
    // 检验是否存在
    num: 18,
  },
  mutations: {
    setNum(state, data) {
      let canda = ++data;
      state.num = canda;

      // 保存到localStorage
        setItem("numberone", canda)
    },
    redNum(state) {
      state.num = --state.num
      // 保存到localStorage
        setItem("numberone", state.num)
    },
  },
  actions: {},
}
