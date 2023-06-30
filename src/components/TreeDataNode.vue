<template>
  <div class="tree-data-node" :class="{'right-align': direction == 'right'}">
      <tree-data-node-panel :dataModel="modelValue" v-if="direction === 'left'"></tree-data-node-panel>
      <div v-if="!modelValue.hideChild">
        <div v-for="(item, index) in modelValue.items" :key="item.id">
            <tree-data-node v-model="modelValue.items[index]" :direction="direction"></tree-data-node>
        </div>
      </div>
      <tree-data-node-panel :dataModel="modelValue" v-if="direction === 'right'"></tree-data-node-panel>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { DataNode } from '@/types/types'

export default {
    props: {
        /**
         * 节点数据
         */
        modelValue: {
            type: Object as PropType<DataNode>,
            required: true
        },
        direction: {
            type: String
        }
    },
    emits: ['update:modelValue'],
    data () {
        return {
        }
    },
    computed: {
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
.tree-data-node
    display: flex
    margin: 20px 0
    &.right-align
        justify-content: end
</style>