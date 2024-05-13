import { Backend_URL } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password'
                }
            },

            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null

                const { email, password } = credentials;

                const res = await fetch(`${Backend_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (res.status === 401) {
                    console.log(res.statusText)

                    return null
                }

                const user = await res.json()
                return user
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user }

            return token
        },

        async session({ token, session }) {
            session.user = token.user;
            session.backendToken = token.backendToken

            return session;
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as POST, handler as GET };