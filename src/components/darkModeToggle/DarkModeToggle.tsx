"use client"
import React, { useContext } from 'react'
import styles from './DarkModeToggle.module.css'
import { ThemeContext } from '@/context/ThemeContext';

let bgColorToggle = false;


const DarkModeToggle = () => {
  const {toggle, mode} = useContext(ThemeContext);

  return (
    <div onClick={toggle} className={styles.container}>
        <div className={styles.icon}>🌙</div>
        <div className={styles.icon}>☀️</div>
        <div style={{
          left: mode == 'dark' ? '1px' : '23px'
        }} className={styles.ball}></div>
    </div>
  )
}

export default DarkModeToggle