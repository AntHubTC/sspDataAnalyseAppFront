<template>
  <div class="data-fix-workspace">
    <div>
      <el-radio-group v-model="direction">
        <el-radio-button label="left">左侧</el-radio-button>
        <el-radio-button label="right">右侧</el-radio-button>
      </el-radio-group>
    </div>
    <tree-data-node v-model="leftData" :direction="direction"></tree-data-node>
  </div>
</template>

<script lang="ts">
import type { DataNode } from '@/types/types'

interface ComponentData {
  direction: string,
  leftData: DataNode;
}

export default {
    data():ComponentData {

        let leftData:DataNode = JSON.parse(JSON.stringify({
          id: "123",
          title: "楼盘名称",
          nodeType: "premises",
          data: {
          },
          items: [
            {
              id: "1231",
              title: "楼栋名称1",
              nodeType: "build",
              data: {
              },
              items: [
                {
                  id: "12311",
                  title: "单元名称1",
                  nodeType: "unit",
                  data: {
                  },
                  items: [
                    {
                      id: "123111",
                      title: "电梯名称1",
                      nodeType: "ele",
                      data: {
                      },
                      items: [
                          {
                            id: "246892580208377898",
                            title: "SJZ-A01-073-WZ01-03",
                            nodeType: "ele",
                            data: {
                            },
                            items: [
                            ]
                          },
                          {
                            id: "252717542219448379",
                            title: "SJZ-B01-073-WZ01-01",
                            nodeType: "ele",
                            data: {
                            },
                            items: [
                            ]
                          }
                      ]
                    },
                    {
                      id: "123122",
                      title: "电梯名称2",
                      nodeType: "ele",
                      data: {
                      },
                      items: [
                      ]
                    }
                  ]
                },
                {
                  id: "12312",
                  title: "单元名称2",
                  nodeType: "unit",
                  data: {
                  },
                  items: [
                  ]
                }
              ]
            },
            {
              id: "1232",
              title: "楼栋名称2",
              nodeType: "build",
              data: {
              },
              items: [
              ]
            },
            {
              id: "1233",
              title: "楼栋名称3",
              nodeType: "build",
              data: {
              },
              items: [
              ]
            }
          ]
        }));

        return {
            leftData,
            direction: 'left'
        }
    },
    mounted() {
    }
};
</script>

<style lang="stylus" scoped>
.data-fix-workspace
  width: 100%;
  height: 100%;
  padding: 15px
</style>