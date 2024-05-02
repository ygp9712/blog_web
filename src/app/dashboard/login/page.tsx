"use client";
import React, { FormEvent, useState, useEffect } from 'react';
import style from './page.module.css';
import Link from 'next/link';
import { Form, Input, Button, message } from 'antd';
import { UserType } from '@/@types';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const loginPage = ({searchParams}: any) => {
  const session = useSession();
  const router = useRouter();
  const [err, setErr] = useState(false);
  const form = Form.useForm()[0];

  const { error } = searchParams;
  
  useEffect(() => {
    if (error) {

      message.error(error);
    }
  }, []);


  console.log('SESSION', session)

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }


  

  const onFinish = async (data: UserType) => {
    const { username, password } = data
    // 引入 bcryptjs
    const bcryptjs = require('bcryptjs')
    /**
     * 加密处理 - 同步方法
     * bcryptjs.hashSync(data, salt)
     *    - data  要加密的数据
     *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
     */
    const hashPassword = bcryptjs.hashSync(password, 10)

    signIn("credentials", { username, password });
    
  }

  const rules = {
    username: [
      { required: true, message: '请输入登录账号' }
    ],
    password: [
      { required: true, message: '请输入账户密码' }
    ]
  }

  return (
    
    <div>
        <p style={{textAlign: 'center', margin: '20px 0'}}>登录</p>

      <Form
        className={style.formClass}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={rules.username}
        >
          <Input
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={rules.password}
        >
          <Input
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">确定</Button>
        
      </Form>
      <Link href={'/dashboard/register'}>
        <p className={style.register}>去注册</p>
      </Link>
      {err && "发生了一些错误"}
    </div>
  )
}

export default loginPage