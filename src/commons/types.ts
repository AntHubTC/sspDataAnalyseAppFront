import { type Connection } from "jsplumb";

/**
 * 数据节点层级
 */
export interface DataNodeLevel {
    /**
     * 层级中文名称
     */
    levelCnName: string,
    /**
     * 层级英文名称
     */
    levelName: string,
    /**
     * 层级
     */
    level: number
}

/**
 * 数据节点
 */
export interface DataNode {
    /**
     * 节点id
     */
    id: string,
    /**
     * 节点名称
     */
    title: String,
    /**
     * 节点类型  楼盘 楼栋 单元 电梯 点位
     */
    nodeType: "premises" | "build" | "unit" | "ele" | "point",
    /**
     * 节点附带的数据
     */
    data: any,
    /**
     * 子节点
     */
    items: DataNode[],
    /**
     * 隐藏子节点
     */
    hideChild: boolean,
    /**
     * 父节点
     */
    parent: DataNode,
    /**
     * 连接线
     */
    connectionLines?: Connection[],
    /**
     * 节点数据分组，一颗树一个分组
     */
    group: string,
    /**
     * 节点层级深度
     */
    depth: number,
    /**
     * 加载状态 空。未加载 1.已加载
     */
    loadStatus?: number
}