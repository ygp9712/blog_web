"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import BlogList from '@/components/blogList/BlogList'
import Me from '@/components/me/me'
import TypeField from '@/components/typeField/typeField'
import { getBlogList, getStats } from './api'
import { getPic } from '@/utils/common';
import { cloneByJson } from '@/utils/common';

const BlogPage =  () => {
  const [blogList, setBlogList] = useState<IBlogItem[]>([]);
  const [stats, setStats] = useState<IStats>();
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const handleTagClick = (type: string) => {
    setType(type);
  }
  const handlePageChange = (page: number) => {
    setPage(page);
  }
  const handleList = () => {
    let params = {
      page,
      pageSize,
      type
    }
    console.log('查询参数', params)
    getBlogList(params).then(res => {
      console.log('返回', res);
      let copy = cloneByJson(res.Response.Result.data)
      setBlogList(copy);
      setTotal(res.Response.Result.total);
    });
    
  }
  useEffect( () => {
    // handleList();
    getStats().then(res => {
      setStats(res.Response.Result);
      console.log('统计', res)
    })
  }, []);

  useEffect(() => {
    handleList();
  }, [page, type]);

  useEffect(() => {
    setPage(1);
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <main className={`${styles.page_main} common_bg`}>
            <div className="hide_1200">
              {stats && <TypeField handleTagClick={handleTagClick} stats={stats}></TypeField>}
            </div>
            <BlogList  handlePageChange={handlePageChange} page={page} pageSize={pageSize} total={total}  data={blogList}></BlogList>
          </main>

          <div className={`${styles.page_side}`}>
            {stats && <Me stats={stats}></Me>}
            {stats && <TypeField handleTagClick={handleTagClick} stats={stats}></TypeField>}
            
          </div>
      </div>
      
    </div>
  )
}

export default BlogPage