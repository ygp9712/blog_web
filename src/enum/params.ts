interface IParams<T> {
    [key: string | number]: string | number;
}

/**
 * @description 博客状态
 * @author 杨国鹏
 * usePath:
 * 
 * 
 * */
export const blogStatusParams: Object = {
    1: '显示',
    2: '隐藏'
}

/**
 * @description 博客分类
 * @author 杨国鹏
 * usePath:
 * 
 * 
 * */
export const blogTypeParams: IParams<string> = {
    1: '个人随笔',
    2: '技术分享',
    3: '学习笔记',
    4: '其他分类'
}
