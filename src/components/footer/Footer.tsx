import React from 'react'
import styles from './footer.module.css'
import pic from '@/assets/image/police.png'
const Footer = () => {
  return (
    <div className={styles.container}>
      <p>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" rel="noreferrer" target="_blank">
            粤ICP备2025417835号-1
          </a>
        </p>
      <p>
        <img style={{width: '16px',
            verticalAlign: 'text-top',
            marginRight: '5px'}} src={pic.src} alt="公安备案图标" />
        <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002007050" rel="noreferrer" target="_blank">粤公网安备44030002007050号</a>
      </p>
      <p>Copyright © 2025 Magnolia的个人博客 All Rights Reserved</p>
    </div>
  )
}

export default Footer