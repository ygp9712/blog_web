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

/**
 * @description 通过JSON.stringify、JSON.parse对对象进行克隆
 * @param {Object} 克隆前的对象
 * @returns 克隆后的对象
 */
export function cloneByJson(obj: object) {
  return JSON.parse(JSON.stringify(obj))
}


/**
 * @description 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {number} delay 延迟时间(毫秒)
 * @returns {Function} 返回防抖后的函数
 */
export function debounce(func: Function, delay: number): Function {
  let timer: NodeJS.Timeout | null = null;
  return function(this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 时间规范化
 * @param {(Date|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: string | number | Date, cFormat?: string): string | null {
  if (arguments.length === 0 || !time) {
      return null
  }
  const format = cFormat || `{y}/{m}/{d}  {h}:{i}:{s}`;
  type FormatObjKey = 'y' | 'm' | 'd' | 'h' | 'i' | 's' | 'a';
  let date
  if (typeof time === 'object') {
      date = time
  } else {
      if ((typeof time === 'string')) {
          if ((/^[0-9]+$/.test(time))) {
              // support "1548221490638"
              time = parseInt(time)
          } else {
              // support safari
              // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
              time = time.replace(new RegExp(/-/gm), '/')
          }
      }

      if ((typeof time === 'number') && (time.toString().length === 10)) {
          time = time * 1000
      }

      date = new Date(time)
  }

  const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key: FormatObjKey) => {
      const value = formatObj[key]
          // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
      return value.toString().padStart(2, '0')
  })
  return time_str
}