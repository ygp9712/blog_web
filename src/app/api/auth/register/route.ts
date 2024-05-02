import User from "@/models/User";
import connect from "@/utils/db"
import { NextResponse, NextRequest } from "next/server"

export const POST = async (request: NextRequest) => {
    const { username , email, password, phone } = await request.json();

    await connect();

    const newUser = new User({
        username,
        email,
        password,
        phone
    })

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