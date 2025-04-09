import React from 'react';
import style from './typeField.module.css';
import { Space, Tag } from 'antd';
import { blogTypeParams } from '@/enum/params';
import { typeColorOption } from '@/enum/option';
interface IParams {
  stats: IStats,
  handleTagClick: (type: string) => void
}
const TypeField = (params : IParams) => {
  return (
    <div className={`${style.container} common_bg`}>
      <p>文章分类：</p>
      <div className={style.type_container}>
        <Space wrap={true}>
        <Tag  onClick={() => params.handleTagClick('')} style={{cursor: 'pointer'}}>全部</Tag>
          {
            params.stats.types.map(item => (
              <Tag key={item._id} onClick={() => params.handleTagClick(item._id)} style={{cursor: 'pointer'}} color={typeColorOption[Number(item._id % 10)].name}>{item.typeName}({item.count})</Tag>
            ))
          }
        </Space>
      </div>
    </div>
  )
}

export default TypeField