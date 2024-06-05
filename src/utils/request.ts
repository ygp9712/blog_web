const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class FetchError extends Error {
    info: any;
    status: number;

    constructor(message: string, info: any, status: number) {
        super(message);
        this.info = info;
        this.status = status;
    }
}

interface FetchOptions extends RequestInit {
    body?: any; // 可以接受任意类型的请求体
    responseType?: 'json' | 'blob'; // 添加 responseType
}

export async function request(requestUrl: String, options: FetchOptions = {}):Promise<any> {
  const url = `${API_BASE_URL}${requestUrl}`;
  const init: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const response = await fetch(url, init);



  if (!response.ok) {
    const info = await response.json();
    const error = new FetchError('请求错误。', info, response.status);
    throw error;
  }

  let jsonResponse;

  if (options.responseType === 'blob') {
    jsonResponse = await response.blob(); // 返回blob流
  } else {
    try {
      jsonResponse = await response.json(); // 返回标准json
    } catch (err) {
      throw new Error('转化JSON失败');
    }
  }


  if (!response.ok || (options.responseType !== 'blob' && jsonResponse.Response?.ErrCode !== '0')) {
    const errorMessage = jsonResponse.Response?.ErrMessage || '接口请求失败';
    // message.error(errorMessage);
    throw new FetchError(errorMessage, jsonResponse, response.status);
  }

  return jsonResponse;
}

export default request;