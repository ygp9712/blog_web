"use client";
import { IProps } from '@/@types'
import { notFound } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

type IParams = {
  id: String | null
}


const fetcher = (obj: any) => fetch(obj).then((res) => {
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw notFound();
  }

  return   res.json()
})



const exampleId: React.FC<IProps<IParams>>  =  ({ params }) => {
  const { data, error  } =  useSWR('https://jsonplaceholder.typicode.com/posts/' + params.id, fetcher);
  console.log('blog数据', data)
  
  if (error) return <div>Failed to load</div> // fetch失败时展示
  if (!data) return <div>Loading...</div> // loading时展示
  
  return (
    <div>
      <p><b>{params.id}、{data.title}</b></p>
      <p>{data.body}</p>
    </div>
  )
}

export default exampleId