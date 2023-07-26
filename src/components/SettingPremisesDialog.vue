<template>
    <el-dialog v-model="centerDialogVisible" title="楼盘id设置" width="20%" center class="set-premisesId-dialog">
        <div>
            <span>楼盘id(多个用逗号分割):</span>
            <div>
                <el-input v-model="premisesId" placeholder="请填写正确的楼盘id" clearable/>
            </div>
        </div>
        <template #footer>
        <span class="dialog-footer">
            <el-button type="primary" @click="save">确定</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
export default {
    data () {
        return {
            centerDialogVisible: false,
            premisesId: "593563"
        }
    },
    computed: {
    },
    methods: {
        openDialog () {
            this.centerDialogVisible = true;
        },
        closeDialog () {
            this.centerDialogVisible = false;
        },
        save () {
            if (this.premisesId) {
                this.$emit("settingPremisesId", this.premisesId);
                this.closeDialog();
            }
        }
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
.set-premisesId-dialog
    display: block
</style>