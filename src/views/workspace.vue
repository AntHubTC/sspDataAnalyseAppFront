<template>
  <div class="data-fix-workspace">
    <div class="tool-box-group">
      <!-- <div>
        <el-radio-group v-model="direction">
          <el-radio-button label="left">左侧</el-radio-button>
          <el-radio-button label="right">右侧</el-radio-button>
        </el-radio-group>
      </div> -->
      <div>
        <el-button-group>
          <el-button type="primary">
            <i class="el-icon"><el-icon-right></el-icon-right></i>楼盘
          </el-button>
          <el-button type="primary">
            <i class="el-icon"><el-icon-right></el-icon-right></i>楼栋
          </el-button>
          <el-button type="primary">
            <i class="el-icon"><el-icon-right></el-icon-right></i>单元
          </el-button>
          <el-button type="primary">
            <i class="el-icon"><el-icon-right></el-icon-right></i>电梯
          </el-button>
          <el-button type="primary">
            <i class="el-icon"><el-icon-right></el-icon-right></i>点位
          </el-button>
        </el-button-group>
      </div>
      <div class="tool-box">
        <div class="tool-btn" @click.prevent="zoomIn"><i class="el-icon"><el-icon-plus></el-icon-plus></i></div>
        <div class="tool-btn" @click.prevent="zoomOut"><i class="el-icon"><el-icon-minus></el-icon-minus></i></div>
      </div>
    </div>
    <div class="main-workspace" :style="mainWorkspaceStyle">
      <div class="workspace-column-box">
        <div class="workspace-column">
          <tree-data-node v-model="leftData" :direction="direction"></tree-data-node>
        </div>
        <div class="workspace-column">
          <tree-data-node v-model="leftData" direction="right"></tree-data-node>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { DataNode } from '@/types/types'

interface ComponentData {
  direction: string,
  leftData: DataNode,
  scale: number
}

export default {
    data() : ComponentData {

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
              hideChild: true,
              data: {
              },
              items: [
                {
                  id: "1231233",
                  title: "单元名称asdfasd",
                  nodeType: "unit",
                  data: {
                  },
                  items: [
                  ]
                },
                {
                  id: "1231233",
                  title: "单元名称2rffas",
                  nodeType: "unit",
                  data: {
                  },
                  items: [
                  ]
                }
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
            direction: 'left',
            scale: 0.6
        }
    },
    computed: {
      mainWorkspaceStyle() {
        return {
          "transform": `scale(${this.scale})`,
          "transform-origin": "0 0 0"
        }
      }
    },
    methods: {
      /**
       * 放大
       */
      zoomIn () {
        this.scale = this.scale + 0.1;
      },
      /**
       * 缩小
       */
      zoomOut () {
        this.scale = this.scale - 0.1;
      }
    },
    mounted() {
    },
};
</script>

<style lang="stylus" scoped>
.data-fix-workspace
  position absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  overflow: auto
  padding: 15px
  .tool-box-group
    position relative
    z-index 1000
  .tool-box
    position: fixed
    top: 20px
    right 40px
    border: solid 1px gray
    padding: 3px
    background-color: gray
    .tool-btn
      width: 40px
      display: inline-block
      font-size: 22px
      text-align: center
      font-weight: bolder
      background-color: white
      margin-right: 3px
      &:hover
        color: #409eff
        background-color: #F0F0F0
      &:last-child
        margin-right: 0
  .workspace-column-box
    display: flex
    .workspace-column
      flex-shrink: 0
      white-space: nowrap
      padding: 20px
      min-width 50%
</style>