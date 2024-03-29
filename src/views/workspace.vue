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
      <tool-box @changePremises="changePremises" @expandCollapseAll="expandCollapseAll"
            @zoomIn="zoomIn" @zoomOut="zoomOut" @toggleFullScreen="toggleFullScreen"
            @exportSQL="exportSQL" @exportDiagram="exportDiagram"
            @showRecordTextPanel="showRecordTextPanel" @help="help" @settings="showSettingDrawer"></tool-box>
    </div>
    <div class="main-workspace" :style="mainWorkspaceStyle" ref="mainWorkSpace">
      <template v-for="(stageDataItem, index) in data" :key="`stage_${index}`">
        <div class="workspace-column-box" v-loading="loading">
          <div class="workspace-column left-column"  v-if="stageDataItem.leftData" ref="leftWorkSpace">
            <tree-data-node v-model="stageDataItem.leftData" :direction="direction"></tree-data-node>
          </div>
          <div class="workspace-column right-column" v-if="stageDataItem.rightData && (nodeShowMode == 'all' || nodeShowMode == 'frame')" ref="rightWorkSpace">
            <tree-data-node v-model="stageDataItem.rightData" direction="right"></tree-data-node>
          </div>
        </div>
      </template>
    </div>

    <export-dialog ref="exportDialog" @exportPNG="exportPNG" @exportPDF="exportPDF"></export-dialog>
    <show-sql-dialog ref="showSqlDialog"></show-sql-dialog>
    <setting-premises-dialog ref="settingPremisesDialog" @settingPremisesId="changePremisesId"></setting-premises-dialog>
    <text-panel ref="textPanel"></text-panel>
    <setting-drawer ref="settingDrawer"></setting-drawer>

    <!-- https://www.npmjs.com/package/vue3-contextmenu -->
    <context-menu name="context-menu-1">
      <context-menu-submenu :label="'复制'" v-if="isSupportClipboard">
        <context-menu-item @itemClickHandle="copyId">ID</context-menu-item>
        <context-menu-item @itemClickHandle="copyTitle">名称</context-menu-item>
        <template v-if="currentContextMenuNode && currentContextMenuNode.group == 'rightGroup'">
          <context-menu-item @itemClickHandle="copySSPId">sspId</context-menu-item>
        </template>
        <context-menu-item @itemClickHandle="copyDetail">详细信息</context-menu-item>
      </context-menu-submenu>
      <context-menu-item @itemClickHandle="renameDataNode">重命名</context-menu-item>
    </context-menu>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, inject } from 'vue'
import { events } from '../bus'
import screenfull from 'screenfull'
import key from 'keymaster'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import ClipboardJS from 'clipboard'
import { jsPlumb, jsPlumbInstance, type ConnectParams, type EndpointOptions, type Connection } from "jsplumb";
import type { DataNode, DataNodeLevel } from '@/commons/types';
import { dataNodeLevelItems, DataLevel } from '@/commons/common';
import { useFixDataTreeStore, useDrawerSettingStore } from '@/stores/common'
import { getTreeData } from '@/commons/services';
import ExportDialog from '../components/ExportDialog.vue'
import initIntroJs from './workspaceIntro'

interface EndPointData {
  /**
   * 节点id
   */
  endPointId: string,
  /**
   * 节点层级类型
   */
  type: string,
  /**
   * 节点深度信息
   */
  depth: number
}

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

interface StageData {
      /**
     * 左树数据
     */
     leftData: DataNode | null,
    /**
     * 右树数据
     */
    rightData: DataNode | null,
}

/**
 * 组件数据模型
 */
interface ComponentData {
  /**
   * 当前楼盘id
   */
   premisesIds: string[],
  /**
   * 树节点朝向 left左 right右
   */
  direction: string,
  /**
   * 舞台数据
   */
  data: StageData[],
  /**
   * 端点数据列表
   */
  endPointList: EndPointData[][],
  /**
   * 连线数据列表
   */
  lineList: LineConnectParams[][],
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
  dataNodeLevelItems: DataNodeLevel[],
  /**
   * 加载状态
   */
  loading: boolean,
  /**
   * 当前右键点击的数据节点
   */
  currentContextMenuNode?: DataNode | null
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
            loading: true,
            premisesIds: ["593168", "593563"],
            data: [],
            endPointList: null,
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
            dataNodeLevelItems,
            currentContextMenuNode: null
        }
    },
    computed: {
      isSupportClipboard () {
        return ClipboardJS.isSupported();
      },
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
      },
      nodeShowMode() {
        return useDrawerSettingStore().getShowNodeMode();
      }
    },
    methods: {
      init ():void {
        this.loading = true;
        // 加载初始化树节点信息
        const getTreeDataTasks:Promise<any>[] = this.loadPremisesTreeNodeData();
        // 树节点加载成功后，开始计算出所有的线条信息
        Promise.all(getTreeDataTasks).then(() => {
          this.initEndpointAndLines();
          this.draw();
          this.loading = false;
        });
      },
            /**
       * 绘制线条
       */
       drawLines() {
        // this.$nextTick().then(() => {
        //   // 连线之前先把连线的关系清除
        //   this.jsPlumbInstance.reset();
        //   // 给每个节点添加锚点
        //   let addEndpoint:Function = (node:DataNode) => {
        //     if (this.isNodeHide(node)) {
        //       // 如果节点已经隐藏了就不需要添加锚点了
        //       return;
        //     }
        //     let id = `node_${node.nodeType}_${node.id}`;
        //     // this.jsPlumbInstance.draggable(id);
        //     this.jsPlumbInstance.addEndpoint(id, {
        //         // anchor: ['Bottom', 'Top', 'Left', 'Right'],
        //         anchor: ['Left', 'Right'],
        //         overlays: [
        //           ['Arrow', { width: 10, length: 8, location: 1, direction: 1, foldback: 0.623 }]
        //         ],
        //         maxConnections: -1
        //       }, this.commonLink)
        //   }
        //   this.recursionTreeDataFun(this.leftData, (parentNode:DataNode, childNode:DataNode) => {
        //     addEndpoint(childNode);
        //   });
        //   // 开始节点间的连线
        //   this.lineList.forEach((item:LineConnectParams) => {
        //     let connection:Connection = this.jsPlumbInstance.connect(item, this.jsPlumbConnectOptions);
        //     item.sourceDataNode.connectionLines = [connection];
        //   });
        //   // 重绘
        //   this.jsPlumbInstance.repaintEverything();
        // });
      },
      draw () {

      },
      /**
       * 初始化所有线条信息
       */
      initEndpointAndLines () {
        let lines:Array<LineConnectParams[]> = [[],[],[],[],[]];
        let endPointDatas:EndPointData[][] = [[],[],[],[],[]];

        // 生成端点功能函数
        let genEndPointFun: Function = (parentNode:DataNode, childNode:DataNode) => {
          if (childNode == null) {
            return null;
          }
          // 生成端点id
          const endPointId:string = childNode.group === 'leftGroup' ? `sspnode_${childNode.nodeType}_${childNode.data.sspId}` : `rmnode_${childNode.nodeType}_${childNode.id}`;
          // 端点，来源于当前层级左右侧对应的节点id
          const endPointData:EndPointData = {
              endPointId: endPointId,
              type: childNode.nodeType,
              depth: childNode.depth
          };
          endPointDatas[childNode.depth - 1].push(endPointData);
        }
        // 生成线条功能函数
        let genLineFun: Function = (parentNode:DataNode, childNode:DataNode) => {
          if (childNode == null) return;
          // 连线，来源于融媒端节点id和对应的sspId
          const line:LineConnectParams = {
              sourceDataNode: childNode,
              targetDataNode: null, // TODO:: 这里根据需要的时候再计算设置上
              source: `rmnode_${childNode.nodeType}_${childNode.id}`,
              target: `sspnode_${childNode.nodeType}_${childNode.data.sspId}`,
              overlays: [["Arrow", { width: 10, length: 10, location: 0.5 }]]
          };
          lines[childNode.depth - 1].push(line);
        }
        // 生成端点和线条功能函数
        let complexFun: Function = (parentNode:DataNode, childNode:DataNode) => {
          genEndPointFun(parentNode, childNode);
          genLineFun(parentNode, childNode);
        }

        for (let stageDataItem of this.data) {
          // 左侧数据处理（左侧只生成端点）
          genEndPointFun(null, stageDataItem.leftData);
          this.recursionTreeDataFun(stageDataItem.leftData, genEndPointFun);

          // 右侧数据处理（右侧生成端点和线条）
          complexFun(null, stageDataItem.rightData);
          this.recursionTreeDataFun(stageDataItem.rightData, complexFun);
        }

        this.endPointList = endPointDatas;
        this.lineList = lines;
      },
      /**
       * 加载初始化树节点信息
       */
      loadPremisesTreeNodeData ():Promise<any>[] {
        this.data = [];
        let getTreeDataTasks:Promise<any>[] = [];
        for (let premisesId of this.premisesIds) {
          getTreeDataTasks.push(getTreeData(premisesId).then((res: { right: DataNode, left: DataNode }) => {
            let leftData:DataNode = res.left;
            let rightData:DataNode = res.right;
            this.data.push({ leftData, rightData });
            // 数据初始转换
            this.dataInitConvert(leftData, "leftGroup");
            this.dataInitConvert(rightData, "rightGroup");
          }));
        }
        return getTreeDataTasks;
      },
      /**
       * 数据基础初始化
       * 
       * @param dataNode 树节点
       */
      dataInitConvert(dataNode:DataNode, group:string):DataNode {
        if (null == dataNode) {
          return;
        }
        dataNode.group = group || ("group_" + dataNode.id);
        dataNode.depth = 1;

        const currentShowLevel = useFixDataTreeStore().getCurrentLevel();
        this.recursionTreeDataFun(dataNode, (parentNode:DataNode, childNode:DataNode) => {
          // 为子节点设置父节点parent，方便后续子节点访问父节点
          childNode.parent = parentNode;
          childNode.group = parentNode.group;
          childNode.depth = parentNode.depth + 1;
          // 显示层级初始化
          parentNode.hideChild = currentShowLevel < parentNode.depth + 1;
        });

        return dataNode;
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
      toggleFullScreen(this:any) {
            // 如果不允许进入全屏，发出不允许提示（为了优化用）
            if (!screenfull.isEnabled) {
              this.$message({message: "您的浏览器不能全屏!", type: "error"});
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
        for (let stageDataItem of this.data) {
          recursionFun(stageDataItem.leftData);
          recursionFun(stageDataItem.rightData);
        }
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
       * 数据节点层级项被点击
       */
      dataNodeLevelItemClick(dataNodeLevelItem:DataNodeLevel):void {
        useFixDataTreeStore().setCurrentLevel(dataNodeLevelItem.level);
        let execFun = (parentNode:DataNode, childNode:DataNode) => {
          // 隐藏子级别，非子级不隐藏(下面未注释的代码更为通用，不论多少层级)
          // parentNode.hideChild = dataNodeLevelItem.level - 1 < DataLevel[parentNode.nodeType];
          parentNode.hideChild = dataNodeLevelItem.level < parentNode.depth + 1;
        }
        for (let stageDataItem of this.data) {
          this.recursionTreeDataFun(stageDataItem.leftData, execFun);
          this.recursionTreeDataFun(stageDataItem.rightData, execFun);
        }
      },
      /**
       * 所有数据节点是否都已经加载完毕
       */
      isAllNodeLoaded() {
        let loadObj = { isLoaded: true }
        let execFun = (parentNode:DataNode, childNode:DataNode) => {
          loadObj.isLoaded = loadObj.isLoaded && !!childNode.loadStatus;
        }
        for (let stageDataItem of this.data) {
          loadObj.isLoaded = loadObj.isLoaded && !!stageDataItem.leftData.loadStatus;
          loadObj.isLoaded = loadObj.isLoaded && !!stageDataItem.rightData.loadStatus;
          this.recursionTreeDataFun(stageDataItem.leftData, execFun);
          this.recursionTreeDataFun(stageDataItem.rightData, execFun);
        }
        return loadObj.isLoaded
      },
      /**
       * 将屏数据关系图转换到canvas
       */
      screenToCanvas(this:any, dataRange:number, callback: Function, failCallback: Function) {
        /* 
          经过多次尝试，结果导出结果只有可视区域内容，滚动条外都导出不了，网上找了很久发现是这样的：
            html2canvas截图成功的一个标准就是，外层div的高度跟里面需要截图的内容的高度一致就能完整的截图，（比如
            需要截图的外层div是800的高度有滚动条，里面的需要截图的内容是1800的高度，截图的时候就把1800的高度给需要截图的那个div就能完整截图）
            https://blog.csdn.net/xiakekeali/article/details/126049126
        */
        const baseEl = this.$refs.baseEl as HTMLElement;
        const scrollHeight = baseEl.scrollHeight;
        const oriHeight = baseEl.style.height;
        baseEl.style.height = scrollHeight + "px";

        let mainWorkSpaceEl = null;
        if (dataRange === 1) {
          mainWorkSpaceEl = this.$refs.mainWorkSpace as HTMLElement;
        } else if (dataRange === 2) {
          mainWorkSpaceEl = this.$refs.leftWorkSpace as HTMLElement;
        } else if (dataRange === 3) {
          mainWorkSpaceEl = this.$refs.rightWorkSpace as HTMLElement;
        }
        if (!mainWorkSpaceEl) {
          this.$message({message: "未找到要导出的工作空间节点信息,不能进行导出!", type: "error"});
          failCallback && failCallback();
          return;
        }

        let mainWorkSpaceElList = mainWorkSpaceEl instanceof Array ? mainWorkSpaceEl : [mainWorkSpaceEl];
        for (let elementEl of mainWorkSpaceElList) {
          html2canvas(elementEl, {
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
        }
      },
      /**
       * 显示导出图对话框
       * @param this 当前vue实例
       */
      exportDiagram (this:{$refs:any}) {
        this.$refs.exportDialog.openDialog();
      },
      /**
       * 导出pdf图片
       */
      async exportPDF(this:{$refs:any, screenToCanvas:Function}, dataRange:number) {
        this.screenToCanvas(dataRange, (canvas:HTMLCanvasElement) => {
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
          }, () => this.$refs.exportDialog.closeDialog());
      },
      /**
       * 导出图片
       */
      async exportPNG (this:{$refs:any, screenToCanvas:Function}, dataRange:number) {
        this.screenToCanvas(dataRange, (canvas:HTMLCanvasElement) => {
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
        }, () => this.$refs.exportDialog.closeDialog());
      },
      /**
       * 显示生成的sql对话框
       */
      exportSQL (this:any) {
        this.$refs.showSqlDialog.showSql(this.data);
      },
      /**
       * 帮助按钮
       */
      help () {
        initIntroJs();
      },
      renameDataNode () {
        alert("功能开发中，敬请期待！");
      },
      changePremises (this:any) {
        this.$refs.settingPremisesDialog.openDialog();
      },
      changePremisesId (premisesId:string) {
        this.premisesIds = premisesId.split(",");
        this.init();
      },
      showRecordTextPanel (this:any, e:KeyboardEvent) {
        if (!!e) {
          e.preventDefault();
        }
        this.$refs.textPanel.openDialog();
      },
      showSettingDrawer (this:any) {
        this.$refs.settingDrawer.showDrawer();
      },
      copyId (this:any, e:any) {
        ClipboardJS.copy(e.nodeData.id);
        this.$message({ message: "拷贝成功", type: "success" });
      },
      copyTitle (this:any, e:any) {
        ClipboardJS.copy(e.nodeData.title || '未设置');
        this.$message({ message: "拷贝成功", type: "success" });
      },
      copySSPId (this:any, e:any) {
        ClipboardJS.copy(e.nodeData.data.sspId || '无');
        this.$message({ message: "拷贝成功", type: "success" });
      },
      copyDetail (this:any, e:any) {
        ClipboardJS.copy(e.currentNodeTarget.innerText);
        this.$message({ message: "拷贝成功", type: "success" });
      }
    },
    mounted() {
      const emitContext = inject('emitContext') as (event: Event, dataNodeData: Record<string, unknown>) => void

      key('[', this.zoomOut);
      key(']', this.zoomIn);
      key('ctrl+1', this.showRecordTextPanel);

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

      events.on('nodeContextMenu', (arg:{event:any, nodeData:DataNode}) => {
        this.currentContextMenuNode = arg.nodeData;
        emitContext(event, { name: 'context-menu-1', nodeData: arg.nodeData, currentNodeTarget: event.currentTarget })
      });
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
      events.off('nodeContextMenu');
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