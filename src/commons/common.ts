import type { DataNodeLevel } from '@/commons/types'

// 数据节点层级项
let dataNodeLevelItems:DataNodeLevel[] = [
    { levelCnName: "楼盘", levelName: "premises", level: 1 },
    { levelCnName: "楼栋",  levelName: "build", level: 2 },
    { levelCnName: "单元",  levelName: "unit", level: 3 },
    { levelCnName: "电梯",  levelName: "ele", level: 4 },
    { levelCnName: "点位",  levelName: "point", level: 5 }
]

// 资源层级
let DataLevel = {}
dataNodeLevelItems.forEach(item => DataLevel[item.levelName] = item.level)

export { dataNodeLevelItems, DataLevel }