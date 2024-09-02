import connect from "@/utils/db"
import { NextResponse, NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        await connect()
        return new NextResponse("数据库连接成功", { status: 200 })
    } catch (err) {
        return new NextResponse("数据库错误", { status: 500 })
    }
}