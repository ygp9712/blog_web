// page.module.less.d.ts
declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
  }

interface IBlogItem {
  _id: string
  title: string,
  cover: string,
  add_time: date,
  author: string,
  status: number,
  type: any,
  desc?: string,
  url?: string
  content: string
}

// 作品
 interface IWorkItemType {
  add_time: Date;
  tech: string;
  status: string;
  cover: string;
  title: string;
  _id: string;
  url?: string;
  codeUrl: string;
}

interface IStats {
  month: number
  monthCount: number
  types: {_id: any, count: number}[]
  year: number
  yearCount: number
}