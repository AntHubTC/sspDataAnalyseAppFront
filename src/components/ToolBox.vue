<template>
    <div class="tool-box">
        <div>
            <el-button-group>
                <el-button type="primary" @click.prevent="notifyEvent('changePremises')"><i class="el-icon"><el-icon-Sort></el-icon-Sort></i>切换楼盘</el-button>
                <el-button type="primary" @click.prevent="notifyEvent('expandCollapseAll', false)"><i class="el-icon"><el-icon-plus></el-icon-plus></i>展开</el-button>
                <el-button type="primary" @click.prevent="notifyEvent('expandCollapseAll', true)"><i class="el-icon"><el-icon-minus></el-icon-minus></i>收缩</el-button>
                <el-button type="primary" @click.prevent="notifyEvent('zoomIn')"><i class="el-icon"><el-icon-plus></el-icon-plus></i>放大</el-button>
                <el-button type="primary" @click.prevent="notifyEvent('zoomOut')"><i class="el-icon"><el-icon-minus></el-icon-minus></i>缩小</el-button>
                <el-button type="primary" @click.prevent="notifyEvent('toggleFullScreen')"><i class="el-icon"><el-icon-plus></el-icon-plus></i>全屏</el-button>
                <el-button type="primary" @click.prevent="toggleToolBoxPanel">
                    <i class="el-icon">
                        <el-icon-ArrowDownBold v-show="!showLine2"></el-icon-ArrowDownBold>
                        <el-icon-ArrowUpBold v-show="showLine2"></el-icon-ArrowUpBold>
                    </i>
                </el-button>
            </el-button-group>
        </div>
        <Transition>
            <div style="border-top:0.5px solid transparent" v-if="showLine2">
                <el-button-group>
                    <el-button type="primary" @click.prevent="notifyEvent('exportSQL')"><i class="el-icon"><el-icon-download></el-icon-download></i>生成SQL</el-button>
                    <el-button type="primary" @click.prevent="notifyEvent('exportDiagram')"><i class="el-icon"><el-icon-download></el-icon-download></i>PNG</el-button>
                    <el-button type="primary" @click.prevent="notifyEvent('showRecordTextPanel')"><i class="el-icon"><el-icon-notebook></el-icon-notebook></i>记录本</el-button>
                    <el-button type="primary" @click.prevent="notifyEvent('help')"><i class="el-icon"><el-icon-help></el-icon-help></i>帮助</el-button>
                    <el-button type="primary" @click.prevent="notifyEvent('settings')"><i class="el-icon"><el-icon-setting></el-icon-setting></i>设置</el-button>
                </el-button-group>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">

export default {
    data () {
        return {
            centerDialogVisible: false,
            showLine2: false
        }
    },
    methods: {
        notifyEvent(eventName: string, ...args: any[]) {
            this.$emit(eventName, ...args)
        },
        toggleToolBoxPanel () {
            this.showLine2 = !this.showLine2;
        }
    }
};
</script>

<style lang="stylus" scoped>
.tool-box
    position: fixed
    top: 20px
    right 40px
    .v-enter-active,.v-leave-active
        transition: opacity 0.4s ease;
    .v-enter-from,.v-leave-to
        opacity: 0;
</style>