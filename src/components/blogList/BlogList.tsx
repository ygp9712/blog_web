import React from 'react';
import style from './BlogList.module.css';
import BlogItem from './components/BlogItem';
import { Pagination } from 'antd';

interface IParams {
    data: IBlogItem[]
}

const BlogList = (params: IParams) => {
    const { data } = params
    console.log('paramgs', params)
  return (
    <div className={style.list_container}>
        {
            data && data.map((item, index) => (
                <BlogItem key={index}></BlogItem>
            ))
        }
        <div className={style.list_page}>
            <Pagination  defaultCurrent={1} total={50} />
        </div>
    </div>
  )
}

export default BlogList