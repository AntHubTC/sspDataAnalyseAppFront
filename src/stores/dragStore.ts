import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { DataNode } from '@/commons/types'

/**
 * pinia文档
 * https://pinia.web3doc.top/introduction.html
 */

/**
 * 拖动存储对象
 */
export const useDragStore = defineStore('dragStore', () => {
  const dragStore = ref<DataNode | null>(null)

  // const doubleCount = computed(() => count.value * 2)

  function setDragData(dataNode: DataNode) {
    dragStore.value = dataNode;
  }

  function getDragData() {
    return dragStore.value;
  }


  return { setDragData, getDragData }
})
