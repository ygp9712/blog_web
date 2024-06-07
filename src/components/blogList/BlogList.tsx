import React from 'react';
import style from './BlogList.module.css';
import BlogItem from './components/BlogItem';
import { Pagination } from 'antd';

interface IParams {
    data: IBlogItem[],
    page: number
    pageSize: number,
    total: number
    handlePageChange: (page: number) => void
}

const BlogList = (params: IParams) => {
    const { data, total, page, pageSize, handlePageChange } = params
    console.log('paramgs', params)
  return (
    <div className={style.list_container}>
        {
            data && data.map((item, index) => (
                    <BlogItem data={item} key={index}></BlogItem>
            ))
        }
        <div className={style.list_page}>
            <Pagination onChange={handlePageChange}  current={page} total={total} pageSize={pageSize} />
        </div>
    </div>
  )
}

export default BlogList