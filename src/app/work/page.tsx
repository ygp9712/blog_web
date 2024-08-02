"use client";
import React, {useState, useEffect} from 'react';
import styles from './page.module.css';
import { getWorkList } from './api'
import { cloneByJson, getPic } from '@/utils/common';
import WorkItem from '@/components/WorkItem/workItem';
const workList = () => {
  const [workList, setWorkList] = useState<IWorkItemType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const handleList = () => {
    let params = {
      page,
      pageSize
    }
    console.log('查询参数', params)
    getWorkList(params).then(res => {
      console.log('返回', res);
      let copy = cloneByJson(res.Response.Result.data)
      setWorkList(copy);
      setTotal(res.Response.Result.total);
    });
    
  }
  useEffect(() => {
    handleList();
  }, [page]);
  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <main className={`${styles.page_main} common_bg`}>
            <div className={styles.work_list}>
              {
                  workList && workList.map((item, index) => (
                     <WorkItem data={item} key={index}></WorkItem> 
                  ))
              }
            </div>
            
          </main>
      </div>
      
    </div>
  )
}

export default workList