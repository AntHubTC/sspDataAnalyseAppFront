<template>
    <div class="node-container" :class="nodeContainerDynamicClass">
        <!-- 必须给拖放区元素添加 dragover.prevent，才能使dragDrop事件正确执行 -->
        <div :id="`node_${dataModel.nodeType}_${dataModel.id}`" class="data-node-item" :class="dataNodeItemDynamicClass"
            draggable="true" @dragstart="dragStart" @dragover="dragover" @drop="drop">
            <div class="node-tool" v-if="dataModel.items && dataModel.items.length && currentDataNodeLevel > dataModel.depth">
                <el-icon v-if="dataModel.hideChild" @click.prevent="hide"><folder-add /></el-icon>
                <el-icon v-else @click.prevent="show"><folder-remove/></el-icon>
            </div>
            <div class="node-name">id:{{ dataModel.id }}</div>
            <div class="node-name">name:{{ dataModel.title }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { DataNode } from '@/commons/types'
import { useDragStore } from '@/stores/dragStore'
import { useFixDataTreeStore } from '@/stores/common'

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
        },
        /**
         * 当前数据节点层级
         */
        currentDataNodeLevel() {
            return useFixDataTreeStore().getCurrentLevel();
        }
    },
    methods: {
        show() {
            this.$emit("toggleShow", true);
        },
        hide() {
            this.$emit("toggleShow", false);
        },
        dragStart () {
            useDragStore().setDragData(this.dataModel)
        },
        dragover (event) {
            let fromDataNode:DataNode = useDragStore().getDragData(),
                toDataNode:DataNode = this.dataModel;

            // 拖动到不同树上的节点，不允许(同一颗树上的节点分组相同)
            if (fromDataNode.group != toDataNode.group) {
                return
            }
            // 拖动到当前节点的父节点，不允许
            if (fromDataNode.parent.id == toDataNode.id) {
                return
            }
            // 差异只差1级才运行拖放(下面未注释的代码更为通用，不论多少层级)
            // let diffLevel:number = DataLevel[fromDataNode.nodeType] - DataLevel[toDataNode.nodeType]
            let diffLevel:number = fromDataNode.depth - toDataNode.depth
            if (diffLevel != 1) {
                return
            }
            // 允许拖放
            event.preventDefault();
        },
        drop(event) {
            event.preventDefault();
            
            let fromDataNode:DataNode = useDragStore().getDragData()
            let toDataNode:DataNode = this.dataModel;

            // 将来源对象从它的父对象中移除
            let fromDataNodeIndex = fromDataNode.parent.items.indexOf(fromDataNode)
            if (fromDataNodeIndex > -1) {
                fromDataNode.parent.items.splice(fromDataNodeIndex, 1)
            }
            // 重新指定来源对象的父对象
            fromDataNode.parent = toDataNode;
            // 将来源对象添加到目标对象的子项
            toDataNode.items.push(fromDataNode)


            console.info("drop")
            console.info(fromDataNode)
            console.info(toDataNode)
        }
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
$point-bg-color=#D0E6FC
.node-container
    display: flex
    align-items: center
    outline: 1px solid #ffffff
    &.right-direction
        text-align: right
        .data-node-item
            .node-tool
                left: 0
                right inherit
    .data-node-item
        width: 200px
        border: 1px solid black
        padding: 6px 12px
        position: relative
        overflow: hidden
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