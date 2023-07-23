<template>
    <el-dialog v-model="centerDialogVisible" title="最终关系SQL语句生成" center class="export-datagram-dialog">
        <div>
            <div>SSP部分SQL：</div>
            <div class="sql-content">
                <pre>{{ sspSqlContent }}</pre>
            </div>
            <div>融媒部分SQL：</div>
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


import type { DataNode } from '@/commons/types';

export default {
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
        showSql(leftData: DataNode, rightData: DataNode) {
            this.sspSqlContent = "";
            this.rmSqlContent = "";
            this.openDialog();
            // this.toggleLoading(true);

            this.$nextTick(() => {
                // 生成ssp的sql
                let finalSSPSQL = "use ssp3;\r\n";
                this.recursionTreeDataFun(leftData, (parentNode:DataNode, childNode:DataNode) => {
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
                this.sspSqlContent = finalSSPSQL;

                // 生成融媒的sql
                let finalRmSQL = "use common-crm;\r\n";
                this.recursionTreeDataFun(rightData, (parentNode:DataNode, childNode:DataNode) => {
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
        padding: 8px
        border: 1px solid #979797
        height: 200px;
        overflow-y: auto;
</style>