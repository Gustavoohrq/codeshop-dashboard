import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import axiosInstance from "@/app/services/api";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials, req) {
                const response = await axiosInstance.post('/login', { email: credentials?.email, password: credentials?.password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const user = response.data
                if (user && response.status === 200) {
                    return user
                } else {
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user?.access_token as string;
                const decodedToken = jwt.decode(user?.access_token);
                token.user = decodedToken;
            }
            return token;
        },
        async session({ session, token }) {
            session = token as any
            return session
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
