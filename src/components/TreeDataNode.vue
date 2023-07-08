<template>
    <div class="tree-data-node" :class="treeDataNodeClass">
        <tree-data-node-panel v-if="direction === 'left'"
            :dataModel="modelValue" :direction="direction"
            @toggleShow="nodeToggleShow"
            ></tree-data-node-panel>
            <transition>
                <div v-show="!modelValue.hideChild && modelValue.items.length" :class="{'node-item-box-z':!!modelValue.items}">
                    <div v-for="(item, index) in modelValue.items" :key="item.id" :class="{'node-item-z':!!modelValue.items}">
                        <tree-data-node v-model="modelValue.items[index]" :direction="direction"></tree-data-node>
                    </div>
                </div>
            </transition>
        <tree-data-node-panel v-if="direction === 'right'"
            :dataModel="modelValue" :direction="direction"
            @toggleShow="nodeToggleShow"
            ></tree-data-node-panel>
    </div>
</template>

<script lang="ts">
import { type PropType, getCurrentInstance } from 'vue'
import type { DataNode } from '@/commons/types'
import { events } from '../bus'

const instance:any = getCurrentInstance();

export default {
    props: {
        /**
         * 节点数据
         */
        modelValue: {
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
    emits: ['update:modelValue'],
    data () {
        return {
        }
    },
    computed: {
        treeDataNodeClass () {
            return {
                'left-direction': this.direction == 'left',
                'right-direction': this.direction == 'right'
            }
        }
    },
    methods: {
        /**
         * 节点切换显示
         * @param show 是否显示 true显示 false隐藏
         */
        nodeToggleShow (show:boolean) {
            this.modelValue.hideChild = show;
            events.emit('nodeToggleShow', this.modelValue);
        }
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
// 用到了很多css结构化伪类选择器
.tree-data-node
    display: flex
    &.right-direction
        justify-content: end
    .v-enter-active,.v-leave-active
        transition: opacity 0.5s ease;
    .v-enter-from,.v-leave-to
        opacity: 0;
    &.left-direction
        .node-item-box-z
            padding-left: 20px
            &::before
                left: 0
            .node-item-z
                padding-left: 20px
                &::before
                    left 0
                &::after
                    left: 0
                &:not(:first-child)::before
                    border-left: 1px solid #979797
                &:not(:last-child)::after
                    border-left: 1px solid #979797
    &.right-direction
        .node-item-box-z
            padding-right: 20px
            &::before
                right: 0
            &:not(:first-child)::before
                border-right: 1px solid #979797
            .node-item-z
                padding-right: 20px
                &::before
                    right 0                    
                &::after
                    right: 0
                &:not(:first-child)::before
                    border-right: 1px solid #979797
                &:not(:last-child)::after
                    border-right: 1px solid #979797
    .node-item-box-z
        position relative
        &:before
            content: ""
            position absolute
            top: 50%
            width: 20px
            height: 0
            border-top: 1px solid #979797
        .node-item-z
            padding-top: 20px
            padding-bottom: 20px
            position relative
            &::before
                content: ""
                position absolute
                top 0
                width: 19px
                height: 50%
                display: block
                user-select: none
            &::after
                content: ""
                position absolute
                top: 50%
                width: 19px
                height: 50%
                user-select: none
                border-top: 1px solid #979797
</style>