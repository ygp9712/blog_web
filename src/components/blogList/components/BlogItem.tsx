import React from 'react';
import style from './BlogItem.module.css';
import { Space, Tag } from 'antd';
const BlogItem = () => {
  return (
    <div className={style.blog_item}>
      <div className={style.item_left}>
            <div className={style.blog_title}>
                这里是文章标题这里是文章标题
            </div>
            <div className={style.blog_label}>
                分类: <Tag color="green">汽修厂</Tag>
            </div>
            <div className={style.blog_desc}>
                这里是文章描述
            </div>
      </div>
      <div className={style.item_right}>
          <img className={style.item_img} src="/test.jpg" alt="" />
      </div>
    </div>
  )
}

export default BlogItem