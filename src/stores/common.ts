import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * pinia文档
 * https://pinia.web3doc.top/introduction.html
 */

/**
 * 当前显示树层级
 */
export const useFixDataTreeStore = defineStore('fixDataTreeStore', () => {
  const currentLevelStore = ref<number>(5)

  function setCurrentLevel(level: number) {
    currentLevelStore.value = level;
  }

  function getCurrentLevel() {
    return currentLevelStore.value;
  }

  return { setCurrentLevel, getCurrentLevel }
})

/**
 * 当前显示树层级
 */
export const useDrawerSettingStore = defineStore('drawerSettingStore', () => {
  const showNodeModeStore = ref<String>("all")

  function setShowNodeMode(val: String) {
    showNodeModeStore.value = val;
  }

  function getShowNodeMode() {
    return showNodeModeStore.value;
  }

  return { setShowNodeMode, getShowNodeMode }
})
