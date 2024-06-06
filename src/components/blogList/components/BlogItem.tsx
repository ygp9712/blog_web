import React, { useEffect, useState } from 'react';
import style from './BlogItem.module.css';
import { Space, Tag } from 'antd';
import { blogTypeParams } from '@/enum/params';
import { typeColorOption } from '@/enum/option';
import { getPic } from '@/utils/common';
interface IProps {
  data: IBlogItem
}



const BlogItem = (props: IProps) => {
  const blog = props.data

  const [img,setImg] = useState('')
  useEffect(() => {
    if (blog.cover) {
      getPic(blog.cover).then(url => {
          setImg(url)
      })
    }
    
  }, [props])
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
            img && 
            (
                <img className={style.item_img} src={img} alt="" />
            )
          }
          {
            !img && 
            <div className={`${style.item_img} ${style.default_img}`}>
              <i style={{fontSize: '40px'}} className="iconfont icon-tupian"></i>
            </div>
          }
      </div>
    </div>
  )
}

export default BlogItem