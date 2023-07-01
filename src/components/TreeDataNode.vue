<template>
    <div class="tree-data-node" :class="treeDataNodeClass">
        <tree-data-node-panel v-if="direction === 'left'"
            :dataModel="modelValue" :direction="direction"
            @toggleShow="nodeToggleShow"
            ></tree-data-node-panel>
        <div v-if="!modelValue.hideChild">
            <div v-for="(item, index) in modelValue.items" :key="item.id">
                <tree-data-node v-model="modelValue.items[index]" :direction="direction"></tree-data-node>
            </div>
        </div>
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
.tree-data-node
    display: flex
    margin: 20px 0
    &.right-direction
        justify-content: end
    .v-enter-active,.v-leave-active {
        transition: opacity 0.5s ease;
    }
    .v-enter-from,.v-leave-to {
        opacity: 0;
    }
</style>