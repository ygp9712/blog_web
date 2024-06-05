import request from "./request";
// 获取图片
interface IGetImageType {
    id?: string, // 图片id
}

export const getImage = (params: IGetImageType) => {
    const queryParams = new URLSearchParams(params as any).toString();
    return request(`images/get?${queryParams}`, {
        method: 'GET', 
        responseType: 'blob'
    });
};