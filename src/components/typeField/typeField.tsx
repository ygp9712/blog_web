import React from 'react';
import style from './typeField.module.css';
import { Space, Tag } from 'antd';
const TypeField = () => {
  return (
    <div className={`${style.container} common_bg`}>
      <p>文章分类：</p>
      <div className={style.type_container}>
        <Space wrap={true}>
          <Tag>分类一</Tag>
          <Tag>分类二</Tag>
          <Tag>分类三</Tag>
          <Tag>分类三</Tag>
          <Tag>分类三</Tag>
          <Tag>分类三</Tag>
        </Space>
      </div>
    </div>
  )
}

export default TypeField