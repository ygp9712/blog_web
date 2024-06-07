import React from 'react'
import styles from './page.module.css'
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

const BlogDetailPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <main className={`${styles.page_main} common_bg`}>
            123456
          </main>

          <div className={`${styles.page_side}`}>
            <Link href={'/blog'}>
              <div className={`${styles.page_return} common_bg`}>
                <LeftOutlined />
                <span style={{marginLeft: '10px'}}>返回列表</span>
              </div>
            </Link>
              
          </div>
      </div>
      
    </div>
  )
}

export default BlogDetailPage