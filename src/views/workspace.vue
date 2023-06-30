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
          <el-button type="primary"><i class="el-icon"><el-icon-right></el-icon-right></i>楼盘</el-button>
          <el-button type="primary"><i class="el-icon"><el-icon-right></el-icon-right></i>楼栋</el-button>
          <el-button type="primary"><i class="el-icon"><el-icon-right></el-icon-right></i>单元</el-button>
          <el-button type="primary"><i class="el-icon"><el-icon-right></el-icon-right></i>电梯</el-button>
          <el-button type="primary"><i class="el-icon"><el-icon-right></el-icon-right></i>点位</el-button>
        </el-button-group>
      </div>
      <div class="tool-box">
        <el-button-group>
          <el-button type="primary" @click.prevent="zoomIn"><i class="el-icon"><el-icon-plus></el-icon-plus></i>放大</el-button>
          <el-button type="primary" @click.prevent="zoomOut"><i class="el-icon"><el-icon-minus></el-icon-minus></i>缩小</el-button>
          <el-button type="primary" @click.prevent="expandCollapseAll(false)"><i class="el-icon"><el-icon-plus></el-icon-plus></i>展开</el-button>
          <el-button type="primary" @click.prevent="expandCollapseAll(true)"><i class="el-icon"><el-icon-minus></el-icon-minus></i>收缩</el-button>
        </el-button-group>
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

/**
 * 组件数据模型
 */
interface ComponentData {
  /**
   * 树节点朝向 left左 right右
   */
  direction: string,
  /**
   * 左树数据
   */
  leftData: DataNode,
  /**
   * 右树数据
   */
  rightData: DataNode,
  /**
   * 放大缩小比例
   */
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
            leftData: leftData,
            rightData: leftData,
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
        if (parseFloat(new Number(this.scale).toFixed(1)) < 2) {
          this.scale = this.scale + 0.1;
        }
      },
      /**
       * 缩小
       */
      zoomOut () {
        if (parseFloat(new Number(this.scale).toFixed(1)) > 0.1) {
          this.scale = this.scale - 0.1;
        }
      },
      /**
       * 展开收缩所有节点
       * @param hideChild false展开  true收缩
       */
      expandCollapseAll (hideChild:boolean) {
        let recursionFun = (node:DataNode) => {
          node.hideChild = hideChild;
          for (let cnode of node.items) {
            recursionFun(cnode);
          }
        }
        recursionFun(this.leftData);
        recursionFun(this.rightData);
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
  .workspace-column-box
    display: flex
    .workspace-column
      flex-shrink: 0
      white-space: nowrap
      padding: 20px
      min-width 50%
</style>