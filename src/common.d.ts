// page.module.less.d.ts
declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
  }

interface IBlogItem {
  title: String,
  cover: String,
  add_time: Date,
  author: String,
  status: Number,
  type: String
}