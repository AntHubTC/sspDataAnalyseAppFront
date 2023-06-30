<template>
  <div class="node-container">
        <div class="data-node-item" :class="dataNodeItemDynamicClass">
          <div class="node-name">id:{{ dataModel.id }}</div>
          <div class="node-name">{{ dataModel.title }}</div>
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
        dataModel: {
            type: Object as PropType<DataNode>,
            required: true
        }
    },
    emits: ['update:dataModel'],
    data () {
        return {
        }
    },
    computed: {
        dataNodeItemDynamicClass () {
            return {
                "premises-item": this.dataModel.nodeType === 'premises',
                "build-item": this.dataModel.nodeType === 'build',
                "unit-item": this.dataModel.nodeType === 'unit',
                "ele-item": this.dataModel.nodeType === 'ele',
                "point-item": this.dataModel.nodeType === 'point'
            }
        }
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
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