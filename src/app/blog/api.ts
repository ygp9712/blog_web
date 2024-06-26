import request from "@/utils/request";

interface blogListType {
    title?: string,
    type?: string,
    page: number | string,
    pagesize?: number,
} 
// export const getBlogList = async (params:blogListType) => {
//     try {
//         return await request('api/blog', {
//             body: params, 
//         })
//     } catch (err) {
//         //   alert('请求出错！请稍后重新刷新')
//         return err
//     }
// } 
export const getBlogList = (params: blogListType) => {
    return request('api/blog', {
        method: 'POST', 
        body: params
    });
};

interface blogDetailType {
    id: string,
} 

export const getBlogDetail = (params: blogDetailType) => {
    return request('api/blog/detail', {
        method: 'POST', 
        body: params
    });
};

export const getStats = () => {
    return request('api/stats', {
        method: 'GET'
    });
};