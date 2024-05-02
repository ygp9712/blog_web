"use client"
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import {navRoutes, routeType} from '../../router'
import DarkModeToggle from '../darkModeToggle/DarkModeToggle'
import { useSession } from 'next-auth/react'
import { Button } from 'antd'
const Navbar = () => {
  const session = useSession();
  console.log('session', session)
  return (
    <div className={styles.container}>
        <div className={styles.logo}>logo</div>
        <div className={styles.links}>
            <DarkModeToggle />
            {
                navRoutes.map((route :routeType) => (
                    <Link key={route.id} href={route.url}>{route.title}</Link>
                ))
            }
            {
              session.status == 'authenticated' && (
                <Button type="primary">注销</Button>
              )
            }
        </div>

        
    </div>
  )
}

export default Navbar