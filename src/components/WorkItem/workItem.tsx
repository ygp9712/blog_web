import React, { useEffect, useState } from 'react';
import styles from './workItem.module.css';
import { Space, Tag } from 'antd';
import { blogTypeParams } from '@/enum/params';
import { typeColorOption } from '@/enum/option';
import { getPic } from '@/utils/common';
import Link from 'next/link';
interface IProps {
  data: IWorkItemType
}



const WorkItem = (props: IProps) => {
  const work = props.data

  const [img,setImg] = useState('')
  useEffect(() => {
    if (work.cover) {
      getPic(work.cover).then(url => {
          setImg(url)
      })
    }
    
  }, [props])
  return (
    <div className={styles.work_item}>

    </div>
  )
}

export default WorkItem