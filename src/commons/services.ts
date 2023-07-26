import service from "./request"

export const getTreeData = (premisesId: string):Promise<any>=>{
    return service.post("/treeData", {
        "premisesId": premisesId
    });
}

/**
 * 获取用户当前配置
 * @returns 用户当前配置
 */
export const getUserConfig = ():Promise<any>=>{
    return service.get("/getUserConfig");
}

/**
 * 测试用户配置是否正确
 * @param userConfig 用户配置
 * @returns 
 */
export const testUserConfig = (userConfig:any):Promise<any>=>{
    return service.post("/testConfig", userConfig);
}

/**
 * 设置用户配置
 * @param userConfig 用户配置
 * @returns 
 */
export const setUserConfig = (userConfig:any):Promise<any>=>{
    return service.post("/setUserConfig", userConfig);
}

// todo:: 引入mockjs来进行接口数据模拟
