"use client"
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import {navRoutes, routeType} from '../../router'
import DarkModeToggle from '../darkModeToggle/DarkModeToggle'
import { useSession } from 'next-auth/react'
import { Button } from 'antd'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  // console.log('session', session)
  console.log('navRoutes', navRoutes)
  console.log('pathname', pathname);
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
              session.status == 'authenticated' && (
                <Button type="primary">注销</Button>
              )
            }
        </div>
        <div className={styles.extra}>
          <DarkModeToggle />
        </div>
        
    </div>
  )
}

export default Navbar