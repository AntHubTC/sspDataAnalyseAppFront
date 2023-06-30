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
    data: Object,
    /**
     * 子节点
     */
    items: DataNode[],
    /**
     * 隐藏子节点
     */
    hideChild: boolean
}