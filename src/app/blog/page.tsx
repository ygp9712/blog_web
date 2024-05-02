import React from 'react';
import styles from './page.module.css';
import { blogPostType } from '../../@types/index';
import Image from 'next/image';
import Link from 'next/link';

async function getData() {
  const res:any = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {revalidate: 10}, // 每十秒重新验证一次数据，
    // cache: "no-store" // 不会存储
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

 
  return res.json()
}

const blog = async () => {
  const data = await getData();
  console.log('返回', data);
  getData();
  return (
      <div className={styles.container}>
          <div className={styles.list}>
            {
              data.map((item: blogPostType) => 
                <Link href={`/blog/${item.id}`}>
                  <div className={styles.item} key={item.id}>
                    <div className={styles.pic_container}>
                      <Image className={styles.pic} width={400} height={250} src='https://images.pexels.com/photos/16603973/pexels-photo-16603973.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
                    </div>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.desc}>{item.body}</p>
                  </div>
                </Link>
                
              )
            }
          </div>
      </div>
  )
}

export default blog