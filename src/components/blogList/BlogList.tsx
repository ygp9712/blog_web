import React from 'react';
import style from './BlogList.module.css';
import BlogItem from './components/BlogItem';
import { Pagination } from 'antd';
const BlogList = () => {
    let list = [
        {

        },
        {

        }
    ]
  return (
    <div className={style.list_container}>
        {
            list && list.map(item => (
                <BlogItem></BlogItem>
            ))
        }
        <Pagination defaultCurrent={1} total={50} />
    </div>
  )
}

export default BlogList