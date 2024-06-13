'use client';
import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {getBlogDetail} from '../api'
import { UserOutlined, FolderOpenOutlined, CalendarOutlined } from '@ant-design/icons';
import { blogTypeParams } from '@/enum/params';

interface IParams {
  params: {
    id: string 
  }
  searchParams: {}
}

interface Heading {
  index: number;
  text: string;
  tag: 'H1' | 'H2'
}

interface HeadingsRef {
  [key: string]: HTMLElement | null;
}

const BlogDetailPage = (params: IParams) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HeadingsRef>({});
  const [data, setData] = useState<IBlogItem>();
  const [headings, setHeadings] = useState<Heading[]>([]);

  const handleDetail = (id:string) => {
    getBlogDetail({id}).then(res => {
      let temp = res.Response.Result.data;
      console.log('详情', temp);
      let date = new Date(temp.add_time);
      temp.add_time = date.getFullYear()+'-'+(date.getMonth()+1).toString().padStart(2, '0')+'-'+(date.getDate()).toString().padStart(2, '0')
      setData(temp);
    })
  }

  const scrollToHeading = (index: number) => {
    if (headingsRef.current[index]) {
      console.log(headingsRef.current[index])
      
      headingsRef.current[index]?.scrollIntoView({ block: "end" });
    }
  };


  useEffect(() => {
    handleDetail(params.params.id);
  }, [])

  useEffect(() => {
    if (data && contentRef.current) {
      const h1Doms = contentRef.current.querySelectorAll('h1,h2');
      let temp:Heading[] = [];
      h1Doms.forEach((heading: any, index) => {
        headingsRef.current[index] = heading;
        temp.push({
          index,
          text: heading.innerText,
          tag: heading.tagName
        })
      });
      setHeadings(temp);
      console.log('headingsRef', headingsRef);

    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <article className={`${styles.page_main} common_bg`}>
            <div className={styles.blog_title}>{data && data.title}</div>
            <div className={styles.blog_tags}>
              <span><UserOutlined /> {data && data.author}</span>
              <span><CalendarOutlined /> {data && data.add_time}</span>
              <span><FolderOpenOutlined /> {data &&  blogTypeParams[data.type]}</span>
            </div>
            {
              data &&<div ref={contentRef} className={styles.blog_content} dangerouslySetInnerHTML={{__html: data.content}}></div>
            }
          </article>

          <div className={`${styles.page_side}`}>
            <Link href={'/blog'}>
              <div className={`${styles.page_return} common_bg`}>
                <LeftOutlined />
                <span style={{marginLeft: '10px'}}>返回列表</span>
              </div>
            </Link>
            <div className={`${styles.page_navigate} common_bg`}>
              {
                headings && headings.map(item => (
                  item.tag === 'H1' ?
                  <div onClick={() => scrollToHeading(item.index)} key={item.index} className={`${styles.heading_h1} ${styles.heading_item} hover`} >{item.text}</div>
                  :
                  <div onClick={() => scrollToHeading(item.index)} key={item.index} className={`${styles.heading_h2} ${styles.heading_item} hover`} >{item.text}</div>
                ))
              }
            </div>

          </div>
      </div>
      
    </div>
  )
}

export default BlogDetailPage