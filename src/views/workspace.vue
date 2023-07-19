<template>
  <div class="data-fix-workspace" ref="baseEl">
    <div class="tool-box-group" id="step1">
      <div class="level-button-group">
        <el-button-group>
          <el-button type="primary" v-for="dataNodeLevelItem in dataNodeLevelItems" :key="'dataNodeLevel' + dataNodeLevelItem.level"
            :style="currentDataNodeLevel < dataNodeLevelItem.level ? {'opacity': 0.5} : {}"
            @click="dataNodeLevelItemClick(dataNodeLevelItem)"><i class="el-icon"><el-icon-right></el-icon-right></i>{{dataNodeLevelItem.levelCnName }}</el-button>
        </el-button-group>
      </div>
      <div class="tool-box">
        <el-button-group>
          <el-button type="primary" @click.prevent="exportDiagram"><i class="el-icon"><el-icon-download></el-icon-download></i>PNG</el-button>
          <el-button type="primary" @click.prevent="toggleFullScreen"><i class="el-icon"><el-icon-plus></el-icon-plus></i>全屏</el-button>
          <el-button type="primary" @click.prevent="zoomIn"><i class="el-icon"><el-icon-plus></el-icon-plus></i>放大</el-button>
          <el-button type="primary" @click.prevent="zoomOut"><i class="el-icon"><el-icon-minus></el-icon-minus></i>缩小</el-button>
          <el-button type="primary" @click.prevent="expandCollapseAll(false)"><i class="el-icon"><el-icon-plus></el-icon-plus></i>展开</el-button>
          <el-button type="primary" @click.prevent="expandCollapseAll(true)"><i class="el-icon"><el-icon-minus></el-icon-minus></i>收缩</el-button>
          <el-button type="primary" @click.prevent="help"><i class="el-icon"><el-icon-help></el-icon-help></i>帮助</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="main-workspace" :style="mainWorkspaceStyle" ref="mainWorkSpace">
      <div class="workspace-column-box">
        <div class="workspace-column left-column"  v-if="leftData">
          <tree-data-node v-model="leftData" :direction="direction"></tree-data-node>
        </div>
        <div class="workspace-column right-column" v-if="rightData">
          <tree-data-node v-model="rightData" direction="right"></tree-data-node>
        </div>
      </div>
    </div>

    <export-dialog ref="exportDialog" @exportPNG="exportPNG" @exportPDF="exportPDF"></export-dialog>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { events } from '../bus'
import screenfull from 'screenfull'
import key from 'keymaster'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { jsPlumb, jsPlumbInstance, type ConnectParams, type EndpointOptions, type Connection } from "jsplumb";
import type { DataNode, DataNodeLevel } from '@/commons/types';
import { dataNodeLevelItems, DataLevel } from '@/commons/common';
import { useFixDataTreeStore } from '@/stores/common'
import { getTreeData } from '@/commons/services';
import { de } from 'element-plus/es/locale';
import ExportDialog from '../components/ExportDialog.vue'
import initIntroJs from './workspaceIntro'


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
  components: { ExportDialog },
    data() : ComponentData {
        // let lineList:LineConnectParams[] = this.generateLines(leftData, rightData);

        // 创建jsPlumb实例
        let jsPlumbInstance = jsPlumb.getInstance();
        // 导入准备好的jsPlumb配置
        jsPlumbInstance.importDefaults({
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
            });
        jsPlumbInstance.setZoom(0.8);

        return {
            leftData: null,
            rightData: null,
            lineList: null,
            direction: 'left',
            scale: 0.8,
            jsPlumbInstance: jsPlumbInstance, // jsPlumb实例
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
      },
      /**
       * 当前数据节点层级
       */
      currentDataNodeLevel() {
        return useFixDataTreeStore().getCurrentLevel();
      }
    },
    methods: {
      init ():void {
        getTreeData().then((res: { right: any; left: any; }) => {
          this.leftData = res.left;
          this.rightData = res.right;
          // 数据初始转换
          this.dataInitConvert(this.leftData);
          this.dataInitConvert(this.rightData);
        })
      },
      /**
       * 数据基础初始化
       * 
       * @param dataNode 树节点
       */
      dataInitConvert(dataNode:DataNode):DataNode {
        if (null == dataNode) {
          return;
        }
        dataNode.group = "group_" + dataNode.id;
        dataNode.depth = 1;
        // 为子节点设置父节点parent，方便后续子节点访问父节点
        this.recursionTreeDataFun(dataNode, (parentNode:DataNode, childNode:DataNode) => {
          childNode.parent = parentNode;
          childNode.group = parentNode.group;
          childNode.depth = parentNode.depth + 1;
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
       * 切换全屏模式
       */
      toggleFullScreen() {
            // 如果不允许进入全屏，发出不允许提示（为了优化用）
            if (!screenfull.isEnabled) {
              this.$message("您的浏览器不能全屏");
              return false;
            }
            screenfull.toggle();
            // returning false stops the event and prevents default browser events
            return false;
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
      /**
       * 数据节点层级项被点击
       */
      dataNodeLevelItemClick(dataNodeLevelItem:DataNodeLevel):void {
        useFixDataTreeStore().setCurrentLevel(dataNodeLevelItem.level);
        let execFun = (parentNode:DataNode, childNode:DataNode) => {
          // 隐藏子级别，非子级不隐藏(下面未注释的代码更为通用，不论多少层级)
          // parentNode.hideChild = dataNodeLevelItem.level - 1 < DataLevel[parentNode.nodeType];
          parentNode.hideChild = dataNodeLevelItem.level < parentNode.depth + 1;
        }
        this.recursionTreeDataFun(this.leftData, execFun);
        this.recursionTreeDataFun(this.rightData, execFun);
      },
      /**
       * 所有数据节点是否都已经加载完毕
       */
      isAllNodeLoaded() {
        let loadObj = { isLoaded: true }
        loadObj.isLoaded = loadObj.isLoaded && !!this.leftData.loadStatus;
        loadObj.isLoaded = loadObj.isLoaded && !!this.rightData.loadStatus;
        let execFun = (parentNode:DataNode, childNode:DataNode) => {
          loadObj.isLoaded = loadObj.isLoaded && !!childNode.loadStatus;
        }
        this.recursionTreeDataFun(this.leftData, execFun);
        this.recursionTreeDataFun(this.rightData, execFun);

        return loadObj.isLoaded
      },
      /**
       * 将屏数据关系图转换到canvas
       */
      screenToCanvas(callback) {
        /* 
          经过多次尝试，结果导出结果只有可视区域内容，滚动条外都导出不了，网上找了很久发现是这样的：
            html2canvas截图成功的一个标准就是，外层div的高度跟里面需要截图的内容的高度一致就能完整的截图，（比如
            需要截图的外层div是800的高度有滚动条，里面的需要截图的内容是1800的高度，截图的时候就把1800的高度给需要截图的那个div就能完整截图）
            https://blog.csdn.net/xiakekeali/article/details/126049126
        */
        const mainWorkSpaceEl = this.$refs.mainWorkSpace as HTMLElement;
        const baseEl = this.$refs.baseEl as HTMLElement;
        const scrollHeight = baseEl.scrollHeight;
        const oriHeight = baseEl.style.height;
        baseEl.style.height = scrollHeight + "px";

        html2canvas(mainWorkSpaceEl, {
          allowTaint: true,
          useCORS: false, // 如果导出内容涉及到跨域资源（如图片），需要设置为true
          logging: false,
          height: baseEl.scrollHeight,
          width: baseEl.scrollWidth,
          scale: 2,
          y: 20
        }).then(function(canvas) {
          baseEl.style.height = oriHeight;
          callback && callback(canvas);
        });
      },
      exportDiagram (this:{$refs:any}) {
        this.$refs.exportDialog.openDialog();
      },
      /**
       * 导出pdf图片
       */
      async exportPDF(this:{$refs:any, screenToCanvas:Function}) {
        this.screenToCanvas((canvas:HTMLCanvasElement) => {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            let a4Height = 841.89;
            let a4Width = 595.28;
            let per = (contentWidth / a4Width) * 0.75; //这个主要是为了防止宽度不够的
            //一页pdf显示html页面生成的canvas高度;
            let pageHeight = (contentWidth / a4Width) * a4Height;
            //未生成pdf的html页面高度
            let leftHeight = contentHeight;
            //一页pdf显示html页面生成的canvas高度;
            var a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height);
            //页面偏移
            let position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            let imgWidth = a4Width;
            let imgHeight = (a4Width / contentWidth) * contentHeight;
            let pageData = canvas.toDataURL("image/jpeg", 1.0);
            let pdf = new JsPDF("p", "pt", [a4Width, a4Height]); //不分页    
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(
                        pageData,
                        "JPEG",
                        0,
                        position,
                        imgWidth,
                        imgHeight
                    );
                    leftHeight -= pageHeight;
                    position -= a4Height;
                    //避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }

            pdf.save('title');

            this.$refs.exportDialog.closeDialog();
          });
      },
      /**
       * 导出图片
       */
      async exportPNG (this:{$refs:any, screenToCanvas:Function}) {
        this.screenToCanvas((canvas:HTMLCanvasElement) => {
          // 创建一个新的图片元素
          var img = new Image();
          img.src = canvas.toDataURL("image/png");
          
          // 创建一个下载链接
          var link = document.createElement("a");
          link.href = img.src;
          link.download = "screenshot.png";
          
          // 触发点击事件以下载图片
          link.click();
          link.remove();

          this.$refs.exportDialog.closeDialog();
        });
      },
      /**
       * 帮助按钮
       */
      help () {
        initIntroJs();
      }
    },
    mounted() {
      key('[', this.zoomOut);
      key(']', this.zoomIn);
      // 没有替换掉浏览器的默认F11
      // key('F11', this.toggleFullScreen);

      let execFun = () => {
        if (this.isAllNodeLoaded()) {
          this.jsPlumbInstance.ready(() => {
            // 连线
            // this.drawLines();
          })
        } else {
          this.$nextTick(execFun)
        }
      }
      this.$nextTick(execFun)

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
    },
    unmounted () {
      key.unbind('[]',']');
    },
    created () {
      this.init();
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
  padding: 55px 15px
  .tool-box-group
    position relative
    z-index 100
    .level-button-group
      position: fixed
      top: 20px
      left 40px
      .el-button
        text-align center
        margin-right 30px
        position relative
      .el-button:hover,.el-button:focus
        background-color: #409EFF
      .el-button::before
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-top: 16px solid #409EFF;
        border-bottom: 16px solid #409EFF;
        border-left: 32px solid transparent;
        position absolute
        left -30px
        z-index 100
        pointer-events: none;
      .el-button::after
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-top: 16px solid transparent;
        border-bottom: 16px solid transparent;
        // border-left: 32px solid #409EFF;
        border-left: 32px solid #409EFF;
        position absolute
        left 71px
        z-index 103
        // pointer-events: none;
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
    &.left-column
      border-right 1px dashed gray
</style>