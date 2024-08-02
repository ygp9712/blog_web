import request from "@/utils/request";

interface workListType {
    page: number | string,
    pagesize?: number,
} 

export const getWorkList = (params: workListType) => {
    return request('api/work', {
        method: 'POST', 
        body: params
    });
};
