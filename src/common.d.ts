// page.module.less.d.ts
declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
  }

interface IBlogItem {
  title: string,
  cover: string,
  add_time: date,
  author: string,
  status: number,
  type: any,
  desc?: string,
  url?: string
}