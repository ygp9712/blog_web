import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db"
import User from "@/models/User"
import { UserType } from '../../../../@types/index';

const bcryptjs = require('bcryptjs')


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "用户名" },
                password: { label: "password", type: "password" }
            },
            async authorize (credentials, req) {
                await connect();

                try {
                    const user: any = await User.findOne({ username: credentials?.username });
                    if(user) {
                       
                        const isPasswordCorrect = await bcryptjs.compare(
                            credentials?.password,
                            user.password
                        )
                        console.log('对比原来', user.password);
                        console.log('输入', credentials?.password);
                        console.log('对比结果', isPasswordCorrect)
                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error('password error');
                        }
                    } else {
                        throw new Error("cant find")
                    }
                    
                } catch (err) {
                    console.log('err错误', err)
                    throw new Error(err+'');
                }
            }
        })
    ],
    pages: {
        error: "/dashboard/login",
    },
})

export {
    handler as GET,
    handler as POST
}