import React from 'react';
import style from './me.module.css';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
interface IParams {
  stats: IStats
}
const me = (params: IParams) => {
  return (
    <div className={`${style.container} common_bg`}>
        <Avatar size={80} icon={<UserOutlined />} />
        <p className={style.name}>Magnolia</p>
        <div className={style.count}>
          <div className={style.count_item}>
            <p>今年文章</p>
            <p>{params.stats.yearCount}</p>
          </div>
          <div className={style.count_item}>
            <p>本月文章</p>
            <p>{params.stats.monthCount}</p>
          </div>
        </div>
    </div>
  )
}

export default me