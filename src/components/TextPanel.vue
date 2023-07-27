<template>
    <el-dialog v-model="centerDialogVisible" title="文本记录工具" width="20%" center class="text-panel" draggable
        :modal="true" :close-on-press-escape="true" :close-on-click-modal="true">
        <div>
            <el-input
                v-model="textarea"
                :rows="20"
                type="textarea"
                placeholder="存放文本的地方"
            />
        </div>
        <template #footer>

        <span class="dialog-footer">
            <el-button type="primary" @click="save">确定</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import ClipboardJS from 'clipboard'

export default {
    data () {
        return {
            centerDialogVisible: false,
            textarea: ""
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
        save (this:any) {
            ClipboardJS.copy(this.textarea);
            this.$message({ message: "拷贝成功", type: "success" });
        }
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
.text-panel
    display: block
</style>