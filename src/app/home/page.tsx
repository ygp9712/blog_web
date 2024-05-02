import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'
const home = () => {
  return (
    <div className={styles.container}>
      <Image width={300} height={500} src="https://images.pexels.com/photos/20291106/pexels-photo-20291106.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
      <div className={styles.title}>测试</div>
    </div>
  )
}

export default home