<template>
    <div class="settings">
        <div class="config-box">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <h2>使用配置</h2>
                    </div>
                </template>
                <el-form
                    ref="ruleFormRef"
                    :model="formData"
                    :rules="rules"
                    label-width="220px"
                    class="demo-ruleForm"
                    status-icon
                >
                    <el-form-item label="ssp archery token" prop="sspCookie">
                        <el-input v-model="formData.sspCookie" />
                    </el-form-item>
                    <el-form-item label="rongmei archery token" prop="rmCookie">
                        <el-input v-model="formData.rmCookie" />
                    </el-form-item>
                    <div class="check-status-bar" :class="checkStatus == 3 ? 'success' : (checkStatus == 4 ? 'fail' : '') "></div>
                    <div class="btn-box" v-show="checkStatus != 3">
                        <el-button type="primary" @click="verifyConfigClick" v-loading="checkStatus == 2">
                            验证配置
                        </el-button>
                    </div>
                    <div class="btn-box" v-show="checkStatus == 3">
                        <router-link to="/workspace">
                            <el-button type="primary">
                                进入
                            </el-button>
                        </router-link>
                    </div>
                </el-form>            
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { type FormInstance } from 'element-plus';
import { getUserConfig, testUserConfig, setUserConfig } from '@/commons/services';

interface FormDataInter {
    sspCookie?:string,
    rmCookie?:string
}

export default {
    data () {
        let formData:FormDataInter = {}

        return {
            formData: formData,
            rules: {
                "sspCookie": [
                    {
                        required: true,
                        message: 'ssp archery token不能为空!',
                        trigger: 'change',
                    }
                ],
                "rmCookie": [
                    {
                        required: true,
                        message: 'rongmei archery token不能为空!',
                        trigger: 'change',
                    }
                ]
            },
            checkStatus: 1 // 1.未验证 2.验证中 3.验证通过 4.验证失败
        }
    },
    methods: {
        /**
         * 验证配置按钮点击处理
         */
        async verifyConfigClick () {
            let formEl: FormInstance = this.$refs.ruleFormRef as FormInstance;
            if (!formEl) {
                return
            }
            this.checkStatus =  2;
            formEl.validate((valid, fields) => {
                if (!valid) {
                    // console.log('error submit!', fields)
                    this.checkStatus =  4;
                    return;
                }
                testUserConfig(this.formData)
                    .then(() => {
                        setUserConfig(this.formData)
                            .then(() => {
                                this.checkStatus =  3;
                            })
                            .catch(() => {
                                this.checkStatus =  4;
                            })
                    })
                    .catch(() => {
                        this.checkStatus =  4;
                    })
            })
        }
    },
    created () {
        getUserConfig()
            .then((data:any) => {
                this.formData = data;
            })
    }
};
</script>

<style lang="stylus" scoped>
.settings
    width: 100%
    height: 90vh; /* 可选，使容器铺满整个视口高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    .config-box
        width: 600px
        height: 500px
        margin: 0 auto
    .check-status-bar
        width: 100%;
        height: 4px
        margin-top 25px
        margin-bottom 10px
        &.fail
            background-color: red
        &.success
            background-color: green
    .btn-box
        text-align: right
</style>