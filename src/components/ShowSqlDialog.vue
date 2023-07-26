<template>
    <el-dialog v-model="centerDialogVisible" title="最终关系SQL语句生成" center class="export-datagram-dialog">
        <div>
            <div>
                SSP部分SQL： 
                <el-tooltip class="box-item" effect="dark" content="这个按钮用于复制SSP的SQL" placement="right" >
                    <el-button size="small" icon="CopyDocument" @click="copySql('#copySspSqlBtn', sspSqlContent)" id="copySspSqlBtn"/>
                </el-tooltip>
            </div>
            <div class="sql-content">
                <pre>{{ sspSqlContent }}</pre>
            </div>
            <div style="margin-top: 10px;">
                融媒部分SQL：
                <el-tooltip class="box-item" effect="dark" content="这个按钮用于复制融媒的SQL" placement="right" >
                    <el-button size="small" icon="CopyDocument" @click="copySql('#copyRmSqlBtn', rmSqlContent)" id="copyRmSqlBtn"/>
                </el-tooltip>
            </div>
            <div class="sql-content">
                <pre>{{ rmSqlContent }}</pre>
            </div>
        </div>
        <template #footer>

        <span class="dialog-footer">
        </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { ElLoading, ElMessage } from 'element-plus';
import clipboard from 'clipboard'

import type { DataNode } from '@/commons/types';

export default {
    components: {
        clipboard
    },
    data () {
        return {
            centerDialogVisible: false,
            loadingInstance: null,
            sspSqlContent: "",
            rmSqlContent: ""
        }
    },
    computed: {
    },
    methods: {
        copySql(this:any, btnSelector: string, sql: string) {
            // 创建出来的的剪贴板对象,通过id来创建剪贴对象，也可以通过class来获取剪贴对象
            let clipboardBean = new clipboard(btnSelector, {
                text: function (trigger) {
                    // 返回的就是复制的内容，可以在返回前面对数据进行增强等...
                    return sql;
                }
            });
            clipboardBean.on('success', (e) => {
                this.$message({message:"复制成功", type: "success"})
                // 复制完成后销毁clipboard对象，预防下一次调用会多次提示
                clipboardBean.destroy()
            });
            clipboardBean.on('error', (e) => {
                this.$message({message:"复制失败", type: "error"})
                // 复制完成后销毁clipboard对象，预防下一次调用会多次提示
                clipboardBean.destroy()
            });
        },
        /**
         * 递归树节点数据执行excFun函数执行操作
         * 
         * @param node 树节点
         * @param execFun 功能函数
         */
        recursionTreeDataFun(node:DataNode|null, execFun: Function) {
        if (null === node) {
            return;
        }
        for (let cnode of node.items) {
            execFun(node, cnode);
            this.recursionTreeDataFun(cnode, execFun);
        }
        },
        getNodePath(node:DataNode):string {
            let paths = [];
            do {
                if (node.depth == 4) {
                    paths.push(node.data.eleNum);
                } else {
                    paths.push(node.title);
                }

                node = node.parent;
            } while(node);

            return "-- " + paths.reverse().join(" / ") + "\r\n";
        },
        showSql(stageData:any[]) {
            debugger
            this.sspSqlContent = "";
            this.rmSqlContent = "";
            this.openDialog();
            // this.toggleLoading(true);

            this.$nextTick(() => {
                let finalSSPSQL = "use ssp3;\r\n";
                let finalRmSQL = "use common-crm;\r\n";
                for (let stageDataItem of stageData) {
                    // 生成ssp的sql
                    this.recursionTreeDataFun(stageDataItem.leftData, (parentNode:DataNode, childNode:DataNode) => {
                        if (childNode.depth === 2) {
                            // 楼栋
                            finalSSPSQL += this.getNodePath(childNode);
                            finalSSPSQL += `update \`ssp3\`.\`build\` set premises_id = ${parentNode.id}`;
                        } else if (childNode.depth === 3) {
                            // 单元
                            finalSSPSQL += this.getNodePath(childNode);
                            finalSSPSQL += `update \`ssp3\`.\`unit\` set premises_id = ${parentNode.parent.id}, build_id=${parentNode.id}`;
                        } else if (childNode.depth === 4) {
                            // 电梯
                            finalSSPSQL += this.getNodePath(childNode);
                            finalSSPSQL += `update \`ssp3\`.\`elevator\` set premises_id = ${parentNode.parent.parent.id}, build_id=${parentNode.parent.id}, unit_id=${parentNode.id}`;
                        } else if (childNode.depth === 5) {
                            // 点位
                            finalSSPSQL += this.getNodePath(childNode);
                            finalSSPSQL += `update \`ssp3\`.\`point\` set premises_id = ${parentNode.parent.parent.parent.id}, build_id=${parentNode.parent.parent.id}, unit_id=${parentNode.parent.id}, ele_id=${parentNode.id}`;
                        }
                        finalSSPSQL += ` where id=${childNode.id};\r\n`;
                        });
                    // 生成融媒的sql
                    this.recursionTreeDataFun(stageDataItem.rightData, (parentNode:DataNode, childNode:DataNode) => {
                        if (childNode.depth === 2) {
                            // 楼栋
                            finalRmSQL += this.getNodePath(childNode);
                            finalRmSQL += `update \`common-crm\`.\`resource_building\` set project_id = "${parentNode.id}"`;
                        } else if (childNode.depth === 3) {
                            // 单元
                            finalRmSQL += this.getNodePath(childNode);
                            finalRmSQL += `update \`common-crm\`.\`resource_unit\` set building_id="${parentNode.id}"`;
                        } else if (childNode.depth === 4) {
                            // 电梯
                            finalRmSQL += this.getNodePath(childNode);
                            finalRmSQL += `update \`common-crm\`.\`resource_elevator\` set building_id="${parentNode.parent.id}", unit_id="${parentNode.id}"`;
                        } else if (childNode.depth === 5) {
                            // 点位
                            finalRmSQL += this.getNodePath(childNode);
                            finalRmSQL += `update \`common-crm\`.\`resource_media\` set building_id="${parentNode.parent.parent.id}", unit_id="${parentNode.parent.id}", elevator_id="${parentNode.id}"`;
                        }
                        finalRmSQL += ` where id="${childNode.id}";\r\n`;
                    });

                }
                this.sspSqlContent = finalSSPSQL;
                this.rmSqlContent = finalRmSQL;
                
                // this.toggleLoading(false);
            });
        },
        // 遇到了el-dialog不能在这个组件上使用v-loading的问题，改为其它方式实现的
        toggleLoading(loading: boolean) {
            if (loading) {
                this.loadingInstance = ElLoading.service({
                    lock: true,
                    text: '正在生成SQL中……',
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
        }
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
.export-datagram-dialog
    display: block
    .sql-content
        margin-top: 5px
        padding: 8px
        border: 1px solid #979797
        height: 200px;
        overflow-y: auto;
</style>