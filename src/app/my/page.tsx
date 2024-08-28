"use client";
import React, { useEffect, useState } from 'react'
import ReactDOMServer  from  'react-dom/server'
import CodeBlock from '@/components/CodeBlock/CodeBlock';
import { cloneByJson } from '@/utils/common';
import styles from './page.module.css'
import {aboutMe} from './api'
const my = () => {
  const [data, setData] = useState<any>();

  const getMe = () => {
    aboutMe().then(res => {
      let temp = res.Response.Result.data;
      const replacedContent = temp.content.replace(
        /<div class="ql-code-block">([\s\S]*?)<\/div>/g,
        (match: any, code: string) => {
            // 将 HTML 实体转换回正常字符，例如 &lt; -> <, &gt; -> >
            const decodedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            
            return ReactDOMServer.renderToString(
                <CodeBlock language="js" code={decodedCode}></CodeBlock>
            );
        }
    );
      temp.content = replacedContent;
      console.log('获取', res);
      setData(cloneByJson(temp));
    })
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <main className={`${styles.page_main} common_bg`}>
            <div className={styles.my_card}>
                <div className={styles.my_avatar}></div>
            </div>

            <div className={styles.about_me} dangerouslySetInnerHTML={{__html: data?.content as Object}}></div>
          </main>
      </div>
      
    </div>
  )
}

export default my