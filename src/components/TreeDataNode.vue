<template>
  <div class="tree-data-node" :class="{'right-align': direction == 'right'}">
      <div class="node-container" v-if="direction === 'left'">
        <div class="data-node-item" :class="dataNodeItemDynamicClass">
          <div class="node-name">id:{{ modelValue.id }}</div>
          <div class="node-name">{{ modelValue.title }}</div>
        </div>
      </div>
      <div>
        <div v-for="(item, index) in modelValue.items" :key="item.id">
            <tree-data-node v-model="modelValue.items[index]" :direction="direction"></tree-data-node>
        </div>
      </div>
      <div class="node-container" v-if="direction === 'right'">
        <div class="data-node-item" :class="dataNodeItemDynamicClass">
          <div class="node-name">id:{{ modelValue.id }}</div>
          <div class="node-name">{{ modelValue.title }}</div>
        </div>
      </div>
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
        dataNodeItemDynamicClass () {
            return {
                "premises-item": this.modelValue.nodeType === 'premises',
                "build-item": this.modelValue.nodeType === 'build',
                "unit-item": this.modelValue.nodeType === 'unit',
                "ele-item": this.modelValue.nodeType === 'ele',
                "point-item": this.modelValue.nodeType === 'point'
            }
        }
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
    .node-container
        display: flex;
        align-items: center;
        padding: 0 10px;
        .data-node-item
            width: 200px
            border: 1px solid black
            padding: 6px
        .premises-item
            background-color: #FFE6CC
        .build-item
            background-color: #F8CECC
        .unit-item
            background-color: #E1D5E7
        .ele-item
            background-color: #D5E8D4
        .point-item
            background-color: #C0E1FB
</style>