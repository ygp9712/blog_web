import React from 'react'
import styles from './page.module.css'
import Loading from '@/components/loading/Loading'
const loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.page_body}>
          <main className={`${styles.page_main} common_bg`}>
              <Loading></Loading>
          </main>
      </div>
      
    </div>
  )
}

export default loading