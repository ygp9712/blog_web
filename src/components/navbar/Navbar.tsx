"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import {navRoutes, routeType} from '../../router'
import DarkModeToggle from '../darkModeToggle/DarkModeToggle'
import { useSession } from 'next-auth/react'
import { Button } from 'antd'
import { usePathname } from 'next/navigation'
import {
  MenuOutlined
} from '@ant-design/icons';

const Navbar = () => {
  const [showModal, setShowModal] = useState<Boolean>(false)
  // const session = useSession();
  const pathname = usePathname();

  const handleHideModal = () => {
    setShowModal(false)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  // console.log('session', session)
  // console.log('navRoutes', navRoutes)
  // console.log('pathname', pathname);
  return (
    <div className={styles.container}>
        <div className={styles.logo}>Magnolia</div>
        <div className={styles.links}>
            {
                navRoutes.map((route :routeType) => (
                    <Link className={`${route.url.pathname == pathname ? 'common_bg' : ''}`} key={route.id} href={route.url}>{route.title}</Link>
                ))
            }
            {
              // session.status == 'authenticated' && (
              //   <Button type="primary">注销</Button>
              // )
            }
        </div>
        <div className={styles.extra}>
          <DarkModeToggle />
        </div>
        
        <div className={styles.mobile}>
          <div onClick={() => handleShowModal()} className={styles.menuBtn}>
            <MenuOutlined />
          </div>
        </div>
        <div className={`${styles.navModal} ${showModal ? '' : styles.hideModal}`}>
          <div onClick={() => handleHideModal()} className={`${styles.modalBody}`}>
            <div className={`${styles.modalNav}`}>
              <div className={`${styles.navList} common_bg`}>
                {
                    navRoutes.map((route :routeType) => (
                        <Link className={`${route.url.pathname == pathname ? 'activeColor' : ''}`} key={route.id} href={route.url}>{route.title}</Link>
                    ))
                }
              </div>
              <div className={`${styles.navTool} common_bg`}>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar