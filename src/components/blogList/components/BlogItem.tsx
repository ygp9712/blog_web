import React from 'react';
import style from './BlogItem.module.css';
import { Space, Tag } from 'antd';
import { blogTypeParams } from '@/enum/params';
import { typeColorOption } from '@/enum/option';
interface IProps {
  data: IBlogItem
}

const BlogItem = (props: IProps) => {
  console.log('props', props)
  const blog = props.data
  return (
    <div className={style.blog_item}>
      <div className={style.item_left}>
            <div className={style.blog_title}>
                {blog.title}
            </div>
            <div className={style.blog_label}>
                分类: <Tag color={typeColorOption[Number(blog.type % 10)].name}>{blogTypeParams[blog.type]}</Tag>
            </div>
            <div className={style.blog_desc}>
                {blog.desc ? blog.desc : '暂无简介'}
            </div>
      </div>
      <div className={style.item_right}>
          {
            blog.url && 
            (
                <img className={style.item_img} src={blog.url} alt="" />
            )
          }
          {
            !blog.url && 
            <div className={`${style.item_img} ${style.default_img}`}>
              <i style={{fontSize: '40px'}} className="iconfont icon-tupian"></i>
            </div>
          }
      </div>
    </div>
  )
}

export default BlogItem