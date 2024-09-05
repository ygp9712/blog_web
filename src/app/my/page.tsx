"use client";
import React, { useEffect, useState } from 'react'
import ReactDOMServer  from  'react-dom/server'
import CodeBlock from '@/components/CodeBlock/CodeBlock';
import { cloneByJson } from '@/utils/common';
import styles from './page.module.css'
import {aboutMe} from './api'
import {Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Loading from '@/components/loading/Loading';
const my = () => {
  const [data, setData] = useState<any>();

  const getMe = () => {
    aboutMe().then(res => {
      console.log('获取', res);

      let temp = res.Response.Result.data;
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
    //   temp.content = ReactDOMServer.renderToString(
    //     <CodeBlock language="js" code={result}></CodeBlock>
    // );
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
                <div className={styles.my_avatar}>
                  <Avatar size={120} icon={<UserOutlined />} />
                </div>
            </div>
            {
              !data && <Loading></Loading>
            }
            
            <div className={styles.about_me} dangerouslySetInnerHTML={{__html: data?.content as Object}}></div>
          </main>
      </div>
      
    </div>
  )
}

export default my