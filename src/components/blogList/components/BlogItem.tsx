import React, { useEffect, useState } from 'react';
import style from './BlogItem.module.css';
import { Space, Tag } from 'antd';
import { blogTypeParams } from '@/enum/params';
import { typeColorOption } from '@/enum/option';
import { getPic } from '@/utils/common';
import Link from 'next/link';
interface IProps {
  data: IBlogItem
}



const BlogItem = (props: IProps) => {
  const blog = props.data

  const [img,setImg] = useState('')
  useEffect(() => {
    if (blog.cover) {
      console.log('触发了');
      getPic(blog.cover).then(url => {
        if(url) {
          setImg(url)
        }
      })
    }
    
  }, [props])
  return (
    <Link href={`/blog/${blog._id}`}>
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
        <div style={{backgroundImage: img ? `url(${img})` : `linear-gradient(#999, #999)`}} className={style.item_right}>
            {/* {
              img && 
              (
                  <img className={style.item_img} src={img} alt="" />
              )
            } */}
            {/* {
              !img && 
              <div className={`${style.item_img} ${style.default_img}`}>
                <i style={{fontSize: '40px'}} className="iconfont icon-tupian"></i>
              </div>
            } */}
        </div>
      </div>
    </Link>
  )
}

export default BlogItem