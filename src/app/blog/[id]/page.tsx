'use client';
import React, { useEffect, useRef, useState } from 'react'
import ReactDOMServer  from  'react-dom/server'
import styles from './page.module.css'
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {getBlogDetail} from '../api'
import { UserOutlined, FolderOpenOutlined, CalendarOutlined } from '@ant-design/icons';
import { blogTypeParams } from '@/enum/params';
import CodeBlock from '@/components/CodeBlock/CodeBlock';
import { cloneByJson, parseTime } from '@/utils/common';
import { Affix } from 'antd';

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
  left: number
  top: number
}

interface HeadingsRef {
  [key: string]: HTMLElement | null;
}

const BlogDetailPage = (params: IParams) => {
  const [preBlog, setPreBlog] = useState<null | {title: string, _id: string}>(null);
  const [nextBlog, setNextBlog] = useState<null | {title: string, _id: string}>(null);
  const [toggle, setToggle] = useState<Boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HeadingsRef>({});
  const now = useRef<number>()
  const [data, setData] = useState<IBlogItem>();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [nowShow, setNowShow] = useState<number>(0);
  const handleDetail = (id:string) => {
    getBlogDetail({id}).then(res => {
      setPreBlog(res.Response.Result.data.previousBlog);
      setNextBlog(res.Response.Result.data.nextBlog);
      let temp = res.Response.Result.data.currentBlog;
      let result = '';
      temp.content.replace(
        /<div class="ql-code-block">([\s\S]*?)<\/div>/g,
        (match: any, code: string) => {
            console.log('match', match)
            // 将 HTML 实体转换回正常字符，例如 &lt; -> <, &gt; -> >
            const decodedCode = code
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            result += (decodedCode +`
`); // 换行符导致的回车
            // return ReactDOMServer.renderToString(
            //     <CodeBlock language="js" code={decodedCode}></CodeBlock>
            // );
        }
    );
    temp.content = temp.content.replace(
        /<div class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g,
        (match: any, code: string) => {
            console.log('result', result);
            return ReactDOMServer.renderToString(
              <CodeBlock language="js" code={result}></CodeBlock>
          );
        }
    );
    setTimeout(() => {
      updateHeading(); // 替换code-block后重新计算一次top
    }, 0)
      console.log('详情', temp);
      let date = new Date(temp.add_time);
      temp.add_time = date.getFullYear()+'-'+(date.getMonth()+1).toString().padStart(2, '0')+'-'+(date.getDate()).toString().padStart(2, '0')
      setData(cloneByJson(temp));
    })
  }

  const scrollToHeading = (index: number) => {
    const target = headings[index]
    if (target) {
      // console.log(target)
      window.scrollTo({
        top: target.top,
        behavior: 'smooth'
      })
    }
  };


  const handleScroll = () => {
    if (data && contentRef.current) {
      const h1Doms = contentRef.current.querySelectorAll('h1,h2');
      h1Doms.forEach((chapter, index) => {
        const element = chapter;
        // 获取元素在可视区域中的位置
        if(element) {
          const rect = element.getBoundingClientRect();  
          // 判断是否在可视区域内 
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            // console.log('index', index)
            now.current = index;
            setNowShow(index);
            // console.log('now', now);
            // console.log('nowShow', nowShow);
          }
        }
      })
    }
  }

  const updateHeading = () => {
    if (data && contentRef.current) {
      const h1Doms = contentRef.current.querySelectorAll('h1,h2');
      let temp:Heading[] = [];
      h1Doms.forEach((heading: any, index) => {
        const rect = heading.getBoundingClientRect();
        console.log('rect', rect.top)
        headingsRef.current[index] = heading;
        temp.push({
          index,
          text: heading.innerText,
          tag: heading.tagName,
          left: rect.left,
          top: rect.top,
        })
      });
      setHeadings(temp);
    }
    
  }

  useEffect(() => {
    handleDetail(params.params.id);
  }, [])

  useEffect(() => {
    // 处理目录导航
    if (data && contentRef.current) {
      // 获取所有的图片元素
      const imgDoms = contentRef.current.querySelectorAll('img');
      // 图片计数器
      let loadedImagesCount = 0;
      // updateHeading();
      
      // 图片加载处理
      const onImageLoad = () => {
        loadedImagesCount++;
        if (loadedImagesCount === imgDoms.length) { // 如果已加载的图片等于全部图片则更新
          updateHeading();
        }
      };

      // 为每个图片添加加载事件监听
      imgDoms.forEach((img: HTMLImageElement) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener('load', onImageLoad);
          img.addEventListener('error', onImageLoad);
        }
      });

      // 如果没有图片，直接更新
      if (imgDoms.length === 0) {
        updateHeading();
      }

      window.addEventListener('scroll', () =>  handleScroll.bind(this)());
      return () => {
        imgDoms.forEach((img: HTMLImageElement) => {
          img.removeEventListener('load', onImageLoad);
          img.removeEventListener('error', onImageLoad);
        });
        window.removeEventListener('scroll', () => handleScroll.bind(this)());
      }
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

            <p className={styles.edit_time}>最后更新于：{data && parseTime(new Date(data.updatedAt))}</p>
          </article>

          <Affix offsetTop={100}>
            <div className={`${styles.page_side}`}>
              <Link href={'/blog'}>
                <div className={`${styles.page_return} common_bg`}>
                  <LeftOutlined />
                  <span style={{marginLeft: '10px'}}>返回列表</span>
                </div>
              </Link>
              <div className={`${styles.page_navigate} common_bg`}>
                <p className={styles.heading_title}>目录</p>
                {
                  headings && headings.map(item => (
                    item.tag === 'H1' ?
                    <div onClick={() => scrollToHeading(item.index)} key={item.index} className={`${styles.heading_h1} ${styles.heading_item} ${nowShow == item.index ? 'active' : ''} hover`} >{item.text}</div>
                    :
                    <div onClick={() => scrollToHeading(item.index)} key={item.index} className={`${styles.heading_h2} ${styles.heading_item} ${nowShow == item.index ? 'active' : ''} hover`} >{item.text}</div>
                  ))
                }
              </div>

            </div>
          </Affix>
          
      </div>
      <div className={styles.page_body} style={{ minHeight: '60px', height: '60px' }}>
        <div className={`${styles.blog_pagination}`}>
          {
            nextBlog && 
            <Link href={`/blog/${nextBlog._id}`}>
              <div className={`${styles.blog_prev} common_bg singleEllip`}>
                  <span>上一篇：</span>
                  <span>{nextBlog.title}</span>
              </div>
            </Link>
            
          }
          {
            preBlog &&
            <Link href={`/blog/${preBlog._id}`}>
              <div className={`${styles.blog_next} common_bg singleEllip`}>
                    <span>下一篇：</span>
                  <span>{preBlog.title}</span>
              </div>
            </Link>
            
          }
          
        </div>
                
      </div>
      
    </div>
  )
}

export default BlogDetailPage