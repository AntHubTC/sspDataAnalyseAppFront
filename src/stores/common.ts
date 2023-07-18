import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * pinia文档
 * https://pinia.web3doc.top/introduction.html
 */

/**
 * 拖动存储对象
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
