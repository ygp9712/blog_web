import React from 'react';
import style from './me.module.css';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const me = () => {
  return (
    <div className={`${style.container} common_bg`}>
        <Avatar size={80} icon={<UserOutlined />} />
        <p className={style.name}>Magnolia</p>
        <div className={style.count}>
          <div className={style.count_item}>
            <p>今年文章</p>
            <p>66</p>
          </div>
          <div className={style.count_item}>
            <p>本月文章</p>
            <p>6</p>
          </div>
        </div>
    </div>
  )
}

export default me