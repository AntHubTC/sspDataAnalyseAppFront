<template>
    <el-dialog v-model="centerDialogVisible" title="数据图导出" width="30%" center class="export-datagram-dialog">
        <span>
            您想导出哪种格式的图呢？这里支持PNG和PDF，请选择你想要导出的格式
        </span>
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
            loadingInstance: null
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
            this.$emit('exportPNG');
        },
        exportPDF () {
            this.toggleLoading(true)
            this.$emit('exportPDF');
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