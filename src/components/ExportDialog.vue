<template>
    <el-dialog v-model="centerDialogVisible" title="数据图导出" width="30%" center class="export-datagram-dialog">
        <div>
            <div>要导出哪些呢?</div>
            <div>
                <el-radio-group v-model="dataRange" class="ml-4">
                    <el-radio :label="1" size="large">全部</el-radio>
                    <el-radio :label="2" size="large">SSP部分</el-radio>
                    <el-radio :label="3" size="large">融媒部分</el-radio>
                </el-radio-group>
            </div>
            <span>您想导出哪种格式的图呢？这里支持PNG和PDF，请选择你想要导出的格式</span>
        </div>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="exportPNG">PNG</el-button>
            <el-button type="primary" @click="exportPDF">PDF</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { ElLoading, ElMessage } from 'element-plus';

export default {
    data () {
        return {
            centerDialogVisible: false,
            loadingInstance: null,
            dataRange: 1 // 默认全部
        }
    },
    computed: {
    },
    methods: {
        // 遇到了el-dialog不能在这个组件上使用v-loading的问题，改为其它方式实现的
        toggleLoading(loading: boolean) {
            if (loading) {
                this.loadingInstance = ElLoading.service({
                    lock: true,
                    text: '正在导出中……',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            } else {
                this.loadingInstance.close();
                this.loadingInstance = null;
            }
        },
        openDialog () {
            this.centerDialogVisible = true;
        },
        closeDialog () {
            this.toggleLoading(false)
            this.centerDialogVisible = false;
        },
        exportPNG () {
            this.toggleLoading(true)
            this.$emit('exportPNG', this.dataRange);
        },
        exportPDF () {
            this.toggleLoading(true)
            this.$emit('exportPDF', this.dataRange);
        }
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
.export-datagram-dialog
    display: block
</style>