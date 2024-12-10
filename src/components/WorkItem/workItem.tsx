import React, { useEffect, useState } from 'react';
import styles from './workItem.module.css';
import { Space, Tag } from 'antd';
import { blogTypeParams } from '@/enum/params';
import { typeColorOption } from '@/enum/option';
import { getPic, parseTime } from '@/utils/common';
import { GithubOutlined, PlayCircleOutlined } from '@ant-design/icons';

import Link from 'next/link';
interface IProps {
  data: IWorkItemType
}



const WorkItem = (props: IProps) => {
  const work = props.data

  const [img,setImg] = useState('')
 
 const goHref = (href: string) => {
    if (href) return window.open(href);
    
 }
 
 
 
  useEffect(() => {
    if (work.cover) {
      getPic(work.cover).then(url => {
          setImg(url)
      })
    }
    
  }, [props])
  return (
    <div className={styles.work_item}>
        <img className={styles.work_cover} src={img} alt="" />
        <p className={`${styles.work_title} doubleEllip`}>{props.data.title}</p>
        <div className={styles.work_layer}>
          <div className={styles.layer_item} onClick={() => goHref(work.codeUrl)}>
            <div className={styles.layer_icon}>
              <GithubOutlined />
            </div>
            <div className={styles.layer_name}>
              作品源码
            </div>
          </div>
          <div className={`${styles.layer_item} ${work.showUrl && work.showUrl.length >= 0 ? '' : styles.layer_disabled}`}>
            <div onClick={() => {work.showUrl && work.showUrl.length >= 0 ? goHref(work.showUrl) : null}} className={styles.layer_icon}>
              <PlayCircleOutlined />
            </div>
            <div className={styles.layer_name}>
              演示地址
            </div>
          </div>
        </div>
    </div>
  )
}

export default WorkItem