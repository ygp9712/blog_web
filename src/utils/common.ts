import { getImage } from './api'

/**
 * @description 根据图片id获取base64
 * @param {*} id 图片id
 * @returns {Promise<string>} 返回一个包含Base64图片数据的Promise
 */
export function getPic(id:string):Promise<string> {
    return new Promise((resolve, reject) => {
      getImage({ id }).then(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string); // 将图片Base64传递给Promise的resolve
        };
        reader.onerror = error => {
          reject(error); // 如果读取失败，传递错误给Promise的reject
        };
        reader.readAsDataURL(res);
      }).catch(error => {
        reject(error); // 如果获取图片失败，传递错误给Promise的reject
      });
    });
}