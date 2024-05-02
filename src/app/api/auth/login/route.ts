import User from "@/models/User";
import connect from "@/utils/db"
import { NextResponse, NextRequest } from "next/server"

const bcryptjs = require('bcryptjs')

export const POST = async (request: NextRequest) => {

    const { username , email, password, phone } = await request.json();

    await connect();

    const newUser = new User({
        username,
        email,
        password,
        phone
    })

    /**
     * 校验 - 使用同步方法
     * bcryptjs.compareSync(data, encrypted)
     *    - data        要比较的数据, 使用登录时传递过来的密码
     *    - encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
     */
    const isOk = bcryptjs.compareSync(password, '$2a$10$P8x85FYSpm8xYTLKL/52R.6MhKtCwmiICN2A7tqLDh6rDEsrHtV1W')
    console.log(isOk)

    try {
        await newUser.save();
        await connect();
        return new NextResponse("用户已经创建", {
            status: 201
        })
    } catch (err) {
        return new NextResponse("数据库错误"+err, { 
            status: 500 
        })
    }
}