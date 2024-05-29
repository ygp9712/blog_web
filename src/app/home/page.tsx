"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import BlogList from '@/components/blogList/BlogList'
import Me from '@/components/me/me'
import TypeField from '@/components/typeField/typeField'
import { getBlogList } from './api'


const home =  () => {
  const [blogList, setBlogList] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect( () => {
    let params = {
      page: 1
    }
    getBlogList(params).then(res => {
      console.log('返回', res);
      setBlogList(res.Response.Result.data);
      setPage(res.Response.Result.page);
      setTotal(res.Response.Result.total);
    });
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <main className={`${styles.page_main} common_bg`}>
            <BlogList data={blogList}></BlogList>
          </main>

          <div className={`${styles.page_side}`}>
            <Me></Me>
            <TypeField></TypeField>
          </div>
      </div>
      
    </div>
  )
}

export default home