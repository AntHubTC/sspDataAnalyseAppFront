<template>
    <div class="node-container" :class="nodeContainerDynamicClass" @contextmenu="contextmenuHandler">
        <!-- 必须给拖放区元素添加 dragover.prevent，才能使dragDrop事件正确执行 -->
        <div :id="`node_${dataModel.nodeType}_${dataModel.id}`" class="data-node-item" :class="dataNodeItemDynamicClass"
            draggable="true" @dragstart="dragStart" @dragover="dragover" @drop="drop" @click.prevent="nodeClick">
            <div class="node-tool" v-if="dataModel.items && dataModel.items.length && currentDataNodeLevel > dataModel.depth">
                <el-icon v-if="dataModel.hideChild" @click.prevent="hide"><folder-add /></el-icon>
                <el-icon v-else @click.prevent="show"><folder-remove/></el-icon>
            </div>
            <template v-if="direction == 'right'">
                <div class="node-name">id:{{ dataModel.id }}</div>
                <div class="node-name">名称:&nbsp;{{ dataModel.title }}</div>
                <div class="node-name">sspId:&nbsp;{{ dataModel.data.sspId || "无" }}</div>
                <div class="node-name" v-if="dataModel.depth == 4" >电梯编码:&nbsp;{{ dataModel.data.eleNum || '无'}}</div>
                <!-- 电梯冗余信息 -->
                <div v-if="dataModel.depth == 4" :class="nodeItemAnalyaseClass('build')"
                    >楼栋id:&nbsp;{{ dataModel.data.eleBuildId }}</div>
                <!-- 点位冗余信息 -->
                <div v-if="dataModel.depth == 5" :class="nodeItemAnalyaseClass('unit')"
                    >单元id:&nbsp;{{ dataModel.data.pointUnitId }}</div>
                <div v-if="dataModel.depth == 5" :class="nodeItemAnalyaseClass('build')"
                    >楼栋id:&nbsp;{{ dataModel.data.pointBuildId }}</div>
            </template>
            <template v-else>
                <div class="node-name">ID:&nbsp;{{ dataModel.id }}</div>
                <div class="node-name">名称:&nbsp;{{ dataModel.title || "用户未设置"}}</div>
                <div class="node-name" v-if="dataModel.depth == 5">终端类型:&nbsp;{{ dataModel.data.type == '1' ? "屏" : "框"}}</div>
                <div class="node-name" v-if="dataModel.depth == 4" >电梯编码:&nbsp;{{ dataModel.data.eleNum || '无'}}</div>
                <br v-if="dataModel.depth == 1 || dataModel.depth == 2"/>
                <!-- 单元冗余信息 -->
                <div v-if="dataModel.depth == 3" :class="nodeItemAnalyaseClass('premises')"
                    >楼盘id:&nbsp;{{ dataModel.data.unitPremisesId }}</div>
                <!-- 电梯冗余信息 -->
                <div v-if="dataModel.depth == 4" :class="nodeItemAnalyaseClass('build')"
                    >楼栋id:&nbsp;{{ dataModel.data.eleBuildId }}</div>
                <div v-if="dataModel.depth == 4" :class="nodeItemAnalyaseClass('premises')"
                    >楼盘id:&nbsp;{{ dataModel.data.elePremisesId }}</div>
                <!-- 点位冗余信息 -->
                <div v-if="dataModel.depth == 5" :class="nodeItemAnalyaseClass('unit')"
                    >单元id:&nbsp;{{ dataModel.data.pointUnitId }}</div>
                <div v-if="dataModel.depth == 5" :class="nodeItemAnalyaseClass('build')"
                    >楼栋id:&nbsp;{{ dataModel.data.pointBuildId }}</div>
                <div v-if="dataModel.depth == 5" :class="nodeItemAnalyaseClass('premises')"
                    >楼盘id:&nbsp;{{ dataModel.data.pointPremisesId }}</div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { DataNode } from '@/commons/types'
import { useDragStore } from '@/stores/dragStore'
import { useFixDataTreeStore } from '@/stores/common'
import { events } from '../bus'; 

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
    emits: ['toggleShow', 'nodeClick'],
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
        // 当前分析当前冗余项的数据是否存在异常
        nodeItemAnalyaseClass (targetProp:String) {
            let noIssue = false;
            if (this.direction == 'left') {
                // ssp侧
                if (this.dataModel.depth == 3) {
                    // 验证单元冗余的楼盘id (单元.楼盘id =？ 楼盘.id)
                    if (targetProp == 'premises') {
                        noIssue = this.dataModel.data.unitPremisesId == this.dataModel.parent.parent.id;
                    }
                } else if (this.dataModel.depth == 4) {
                    // 验证电梯冗余的楼盘id (电梯.楼盘id =？ 楼盘.id) && (电梯.楼栋id =？ 楼栋.id)
                    if (targetProp == 'premises') {
                        noIssue = this.dataModel.data.elePremisesId == this.dataModel.parent.parent.parent.id;
                    } else if (targetProp == 'build') {
                        noIssue = this.dataModel.data.eleBuildId == this.dataModel.parent.parent.id;
                    }
                } else if (this.dataModel.depth == 5) {
                    // 验证点位冗余的楼盘id (点位.楼盘id =？ 楼盘.id) && (点位.楼栋id =？ 楼栋.id) && (点位.单元id =？ 单元.id)
                    if (targetProp == 'premises') {
                        noIssue = this.dataModel.data.pointPremisesId == this.dataModel.parent.parent.parent.parent.id;
                    } else if (targetProp == 'build') {
                        noIssue = this.dataModel.data.pointBuildId == this.dataModel.parent.parent.parent.id;
                    } else if (targetProp == 'unit') {
                        noIssue = this.dataModel.data.pointUnitId == this.dataModel.parent.parent.id;
                    }
                }
            } else {
                // 融媒侧
                if (this.dataModel.depth == 4) {
                    // 验证电梯冗余的楼盘id (电梯.楼栋id =？ 楼栋.id)
                    if (targetProp == 'build') {
                        noIssue = this.dataModel.data.eleBuildId == this.dataModel.parent.parent.id;
                    }
                } else if (this.dataModel.depth == 5) {
                    // 验证点位冗余的楼盘id (点位.楼栋id =？ 楼栋.id) && (点位.单元id =？ 单元.id)
                    if (targetProp == 'build') {
                        noIssue = this.dataModel.data.pointBuildId == this.dataModel.parent.parent.parent.id;
                    } else if (targetProp == 'unit') {
                        noIssue = this.dataModel.data.pointUnitId == this.dataModel.parent.parent.id;
                    }
                }
            }

            return {
                "exist-error": !noIssue,
                "node-name": true
            }
        },
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
        },
        nodeClick () {
            // TODO:: 双击查看详情
            this.$emit('nodeClick', this.dataModel);
        },
        contextmenuHandler (e:MouseEvent) {
            e.preventDefault();
            events.emit("nodeContextMenu", {
                event: e,
                nodeData: this.dataModel
            })
        }
    },
    mounted() {
        // 已经加载
        this.dataModel.loadStatus = 1;
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
        min-width: 222px
        width: 222px
        // border: 1px solid black
        border: 1px solid #959595
        padding: 6px 12px
        position: relative
        overflow: hidden
        cursor grab
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
        .exist-error
            color: red
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