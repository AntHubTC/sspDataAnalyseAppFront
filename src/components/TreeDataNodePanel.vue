<template>
    <div class="node-container" :class="nodeContainerDynamicClass">
        <div class="data-node-item" :class="dataNodeItemDynamicClass">
            <div class="node-tool" v-if="dataModel.items && dataModel.items.length">
                <el-icon v-if="dataModel.hideChild" @click.prevent="hide"><folder-add /></el-icon>
                <el-icon v-else @click.prevent="show"><folder-remove/></el-icon>
            </div>
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
        },
        /**
         * 方向 left right
         */
        direction: {
            type: String
        }
    },
    emits: ['toggleShow'],
    data () {
        return {
        }
    },
    computed: {
        nodeContainerDynamicClass () {
            return {
                'left-direction': this.direction == 'left',
                'right-direction': this.direction == 'right'
            }
        },
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
    methods: {
        show() {
            this.$emit("toggleShow", true);
        },
        hide() {
            this.$emit("toggleShow", false);
        },
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
$premises-bg-color=#FFE6CC
$build-bg-color=#F8CECC
$unit-bg-color=#E1D5E7
$ele-bg-color=#D5E8D4
$point-bg-color=#C0E1FB
.node-container
    display: flex;
    align-items: center;
    padding: 0 10px;
    &.right-direction
        text-align: right
        .data-node-item
            .node-tool
                left: 0
                right inherit
    .data-node-item
        width: 200px
        border: 1px solid black
        padding: 6px
        position: relative
        .node-tool
            z-index: 100
            position absolute
            top: 0
            right: 0
            font-size: 20px
            height: 20px
            line-height: 20px
            cursor pointer
            border: 1px solid transparent
            background-color: white
            &:hover
                border: 1px solid black
    .premises-item
        background-color: $premises-bg-color
    .build-item
        background-color: $build-bg-color
    .unit-item
        background-color: $unit-bg-color
    .ele-item
        background-color: $ele-bg-color
    .point-item
        background-color: $point-bg-color
</style>