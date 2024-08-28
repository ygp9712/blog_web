import request from "@/utils/request";

interface aboutMeType {
    
} 

export const aboutMe = (params?: aboutMeType) => {
    return request('api/about/me', {
        method: 'POST', 
        body: params
    });
};