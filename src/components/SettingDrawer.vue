<template>
    <div class="setting-drawer">
        <el-drawer
            v-model="drawerShow"
            title="设置"
            direction="rtl"
        >
            <el-form
                ref="ruleFormRef"
                :model="formData"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                status-icon
            >
                <el-form-item label="显示节点配置" prop="sspCookie">
                    <el-radio-group v-model="formData.showNodeMode">
                        <el-radio label="all">显示所有</el-radio>
                        <el-radio label="screen">显示屏</el-radio>
                        <el-radio label="frame">显示框</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script lang="ts">
import { useDrawerSettingStore } from '@/stores/common'

export default {
    data () {
        return {
            drawerShow: false,
            formData: {
                showNodeMode: "all"
            },
            rules: {
                "showNodeMode": [
                    {
                        required: true,
                        message: '显示节点配置不能为空!',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    watch: {
        "formData.showNodeMode" (newVal) {
            useDrawerSettingStore().setShowNodeMode(newVal);
        }
    },
    methods: {
        showDrawer () {
            this.drawerShow = true;
        }
    }
};
</script>

<style lang="stylus" scoped>
.setting-drawerx
    display: block
</style>