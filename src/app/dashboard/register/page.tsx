"use client";
import React, { FormEvent, useState } from 'react';
import style from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from 'antd';
import { UserType } from '@/@types';



const RegisterPage = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();
  const form = Form.useForm()[0];


  const onFinish = async (data: UserType) => {
    const { username, password, email, phone } = data
    // 引入 bcryptjs
    const bcryptjs = require('bcryptjs')
    /**
     * 加密处理 - 同步方法
     * bcryptjs.hashSync(data, salt)
     *    - data  要加密的数据
     *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
     */
    const hashPassword = bcryptjs.hashSync(password, 10)

    console.log('submit事件', data)
    try {
      const res = await fetch("/api/auth/register", {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password: hashPassword,
          phone
        })
      });

      res.status === 201 && router.push("/dashboard/login?success=SUCCESS")
    } catch (err) {
      setErr(true);
    }
  }

  const rules = {
    username: [
      { required: true, message: '请输入登录账号' }
    ],
    password: [
      { required: true, message: '请输入账户密码' }
    ],
    email: [
      { required: true, message: '请输入邮箱' }
    ],
    phone: [
      { required: true, message: '请输入电话' }
    ],
  }

  return (
    <div>
      <Form
        className={style.formClass}
        form={form}
        onFinish={onFinish}
      >
        <p>注册</p>
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
        <Form.Item
          name="email"
          rules={rules.email}
        >
          <Input
            placeholder="请输入邮箱"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={rules.phone}
        >
          <Input
            placeholder="请输入电话"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">确定</Button>
        <Link href={"/dashboard/login"}>
          <Button>返回</Button>
        </Link>
      </Form>
      {err && "发生了一些错误"}
    </div>
  )
}

export default RegisterPage