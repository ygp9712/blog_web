import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'
import BlogList from '@/components/blogList/BlogList'
const home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <main className={`${styles.page_main} common_bg`}>
            <BlogList></BlogList>
          </main>

          <div className={`${styles.page_side}`}>
            
          </div>
      </div>
      
    </div>
  )
}

export default home