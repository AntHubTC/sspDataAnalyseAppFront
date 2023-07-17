import service from "./request"

export const getTreeData = ():Promise<any>=>{
    return service.post("/treeData", {
        "premisesId": "507465185988968546"
    });
}

// todo:: 引入mockjs来进行接口数据模拟
