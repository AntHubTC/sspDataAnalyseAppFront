<template>
  <div class="data-fix-workspace">
    <div class="tool-box-group">
      <div>
        <el-button-group>
          <el-button type="primary" v-for="dataNodeLevelItem in dataNodeLevelItems" :key="'dataNodeLevel' + dataNodeLevelItem.level"
            @click="dataNodeLevelItemClick(dataNodeLevelItem)"><i class="el-icon"><el-icon-right></el-icon-right></i>{{dataNodeLevelItem.levelCnName }}</el-button>
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
        <div class="workspace-column" v-if="leftData">
          <tree-data-node v-model="leftData" :direction="direction"></tree-data-node>
        </div>
        <div class="workspace-column" v-if="rightData">
          <tree-data-node v-model="rightData" direction="right"></tree-data-node>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { events } from '../bus'
import { jsPlumb, jsPlumbInstance, type ConnectParams, type EndpointOptions, type Connection } from "jsplumb";
import type { DataNode, DataNodeLevel } from '@/commons/types';
import { dataNodeLevelItems } from '@/commons/common'

interface LineConnectParams extends ConnectParams {
  /**
   * 源数据节点
   */
  sourceDataNode: DataNode,
  /**
   * 目标数据节点
   */
  targetDataNode: DataNode
}

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
  leftData: DataNode | null,
  /**
   * 右树数据
   */
  rightData: DataNode | null,
  /**
   * 连线
   */
  lineList: LineConnectParams[],
  /**
   * 放大缩小比例
   */
  scale: number,
  /**
   * jsplumb实例
   */
  jsPlumbInstance: jsPlumbInstance,
  /**
   * jsplumb默认配置信息
   */
  jsPlumbSetting: object,
  /**
   * jsplumb连线的配置
   */
  jsPlumbConnectOptions: object,
  /**
   * jsplumb线条配置
   */
  commonLink: EndpointOptions,
  /**
   * 数据节点层级
   */
  dataNodeLevelItems: DataNodeLevel[]
}

export default {
    data() : ComponentData {
        let leftData:DataNode = JSON.parse(JSON.stringify({
          id: "123",
          title: "楼盘名称",
          nodeType: "premises",
          group: "123",
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
                            nodeType: "point",
                            data: {
                            },
                            items: [
                            ]
                          },
                          {
                            id: "252717542219448379",
                            title: "SJZ-B01-073-WZ01-01",
                            nodeType: "point",
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
                  id: "1231234",
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
        let rightData:DataNode|null = JSON.parse(JSON.stringify(leftData));
        rightData.id = "456";
        rightData.group = "456";

        // 数据初始转换
        this.dataInitConvert(leftData);
        this.dataInitConvert(rightData);
        let lineList:LineConnectParams[] = this.generateLines(leftData, rightData);

        // 创建jsPlumb实例
        let jsPlumbInstance = jsPlumb.getInstance();
        jsPlumbInstance.setZoom(0.8);

        return {
            leftData: leftData,
            rightData: rightData,
            lineList: lineList,
            direction: 'left',
            scale: 0.8,
            jsPlumbInstance: jsPlumbInstance, // jsPlumb实例
            // jsPlumb默认配置
            jsPlumbSetting: {
              // 动态锚点、位置自适应
              // Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
              Anchors: ['Left', 'Right'],
              // 连线的样式 StateMachine、Flowchart，Bezier、Straight
              Connector: ['Bezier', { curviness: 40 }],
              // 鼠标是否拖动删除线
              ConnectionsDetachable: false,
              // 删除线的时候节点不删除
              DeleteEndpointsOnDetach: false,
              // 连线的两端端点类型：矩形 Rectangle；圆形Dot； eight: 矩形的高 ，idth: 矩形的宽
              Endpoints: [['Dot', { radius: 2, }], ['Dot', { radius: 2 }]],
              // 线端点的样式
              EndpointStyle: { fill: 'skyblue', outlineWidth: 1 },
              // 绘制连线
              PaintStyle: {
                stroke: '#000000',
                strokeWidth: 1,
                outlineStroke: 'transparent',
                // 设定线外边的宽，单位px
                outlineWidth: 10
              },
              // 绘制连线箭头
              Overlays: [// 箭头叠加
                ['Arrow', {
                  width: 10, // 箭头尾部的宽度
                  length: 8, // 从箭头的尾部到头部的距离
                  location: 1, // 位置，建议使用0～1之间
                  direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
                  foldback: 0.623 // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
                }]
              ],
              // 绘制图的模式 svg、canvas
              RenderMode: 'svg',
              DragOptions: { cursor: 'pointer', zIndex: 2000 },
              // 鼠标滑过线的样式
              HoverPaintStyle: { stroke: 'skyblue', strokeWidth: 3, cursor: 'pointer' },
            },
            // 连线的配置
            jsPlumbConnectOptions: {
              isSource: true,
              isTarget: true,
              // 动态锚点、提供了4个方向 Continuous、AutoDefault
              anchor: "Continuous",
              overlays: [['Arrow', { width: 8, length: 8, location: 1 }]] // overlay
            },
            commonLink: {
              isSource: true,
              isTarget: true,
              anchor: ["Perimeter", { shape: "Circle" }],
              connector: 'Bezier',
              endpoint: 'Dot',
              // 不限制节点的连线数量
              maxConnections: -1
            },
            dataNodeLevelItems
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
       * 数据基础初始化
       * 
       * @param dataNode 树节点
       */
      dataInitConvert(dataNode:DataNode):DataNode {
        // 为子节点设置父节点parent，方便后续子节点访问父节点
        this.recursionTreeDataFun(dataNode, (parentNode:DataNode, childNode:DataNode) => {
          childNode.parent = parentNode;
          childNode.group = parentNode.group;
        });

        return dataNode;
      },
      /**
       * 根据树数据节点信息生成线条连线
       * 
       * @param leftData 左树节点
       * @param rgithData 右树节点
       */
      generateLines(leftData:DataNode, rgithData:DataNode):LineConnectParams[] {
        let lines:LineConnectParams[] = [];

        let execFun: Function = (parentNode:DataNode, childNode:DataNode) => {
          if (this.isNodeHide(childNode)) {
            // 如果节点隐藏掉了，就不能显示线条了
            return;
          }
          let line:LineConnectParams = {
              sourceDataNode: childNode,
              targetDataNode: parentNode,
              source: `node_${childNode.nodeType}_${childNode.id}`,
              target: `node_${parentNode.nodeType}_${parentNode.id}`,
              overlays: [["Arrow", { width: 10, length: 10, location: 0.5 }]]
            }
            lines.push(line);
        }
        this.recursionTreeDataFun(leftData, execFun);
        // TODO::// 现在左右数据一样，不将注释打开
        // this.recursionTreeDataFun(rgithData, execFun);
        return lines;
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
      /**
       * 放大
       */
      zoomIn () {
        if (parseFloat(new Number(this.scale).toFixed(1)) < 2) {
          this.scale = this.scale + 0.1;
          this.jsPlumbInstance.setZoom(this.scale);
        }
      },
      /**
       * 缩小
       */
      zoomOut () {
        if (parseFloat(new Number(this.scale).toFixed(1)) > 0.1) {
          this.scale = this.scale - 0.1;
          this.jsPlumbInstance.setZoom(this.scale);
        }
      },
      /**
       * 展开收缩所有节点
       * @param hideChild false展开  true收缩
       */
      expandCollapseAll (hideChild:boolean) {
        let recursionFun = (node:DataNode|null) => {
          if (null == node) {
            return;
          }
          node.hideChild = hideChild;
          for (let cnode of node.items) {
            recursionFun(cnode);
          }
        }
        recursionFun(this.leftData);
        recursionFun(this.rightData);
      },
      /**
       * 当前节点是否隐藏？
       *   当前节点是否显示决定于当前节点是否显示和父节点是否显示
       * @param node 当前节点
       */
      isNodeHide(node:DataNode):boolean {
        while (node.parent) {
          if (node.parent.hideChild) {
            return true;
          }
          node = node.parent;
        }
        return false;
      },
      /**
       * 绘制线条
       */
      drawLines() {
        // 导入准备好的jsPlumb配置
        this.jsPlumbInstance.importDefaults(this.jsPlumbSetting);
        this.$nextTick().then(() => {
          // 连线之前先把连线的关系清除
          this.jsPlumbInstance.reset();
          // 给每个节点添加锚点
          let addEndpoint:Function = (node:DataNode) => {
            if (this.isNodeHide(node)) {
              // 如果节点已经隐藏了就不需要添加锚点了
              return;
            }
            let id = `node_${node.nodeType}_${node.id}`;
            // this.jsPlumbInstance.draggable(id);
            this.jsPlumbInstance.addEndpoint(id, {
                // anchor: ['Bottom', 'Top', 'Left', 'Right'],
                anchor: ['Left', 'Right'],
                overlays: [
                  ['Arrow', { width: 10, length: 8, location: 1, direction: 1, foldback: 0.623 }]
                ],
                maxConnections: -1
              }, this.commonLink)
          }
          this.recursionTreeDataFun(this.leftData, (parentNode:DataNode, childNode:DataNode) => {
            addEndpoint(childNode);
          });
          // 开始节点间的连线
          this.lineList.forEach((item:LineConnectParams) => {
            let connection:Connection = this.jsPlumbInstance.connect(item, this.jsPlumbConnectOptions);
            item.sourceDataNode.connectionLines = [connection];
          });
          // 重绘
          this.jsPlumbInstance.repaintEverything();
        });
      },
      customNextTick(execFun:Function):void {
        // setTimeout(execFun, 100);
        this.$nextTick(() => {execFun();});
      },
      dataNodeLevelItemClick(dataNodeLevelItem):void {

      }
    },
    mounted() {
      // let execFun = () => {
      //   this.jsPlumbInstance.ready(() => {
      //     // 连线
      //     this.drawLines();
      //   })
      // }
      // setTimeout(execFun, 100);
      // // execFun();

      // const instance:any = getCurrentInstance();
      // if (instance) {
      //   events.on('nodeToggleShow', (node:DataNode) => {
      //     console.info("重绘");
      //     if (node.hideChild) {
      //       node.items.map(cnode => {
      //         // 删除对应的线条
      //         cnode.connectionLines.map(connectionLine => {
      //           this.jsPlumbInstance.deleteConnection(connectionLine);
      //         })
      //         // 删除对应的锚点
      //         // this.jsPlumbInstance.deleteEndpoint
      //       })
      //     }
      //     this.customNextTick(() => {
      //       this.jsPlumbInstance.repaintEverything();
      //     })
      //   });
      // }
      // console.info(this.jsPlumbInstance);
    }
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
</style>@/commons/types