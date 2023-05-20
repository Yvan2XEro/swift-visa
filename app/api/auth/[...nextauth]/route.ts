import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null
                const {
                    email,
                    password,
                } = credentials


                const user = { id: "1", email: "admin@swift-visa.com", name: "Admin SV" }
                if (user.email === email && password === "secret") {
                    return user;
                } else {
                    console.log("check your credentials");
                    return null;
                }
            },
        }),
    ],
    jwt: {
        secret: "jwt-secret",
        maxAge: 90000,

    },
    callbacks: {
        jwt: async ({ token, user, account }) => {
            if (!!user && !!account) {
                return { ...user, ...account }
            }

            return token;
        },
        session: ({ session, token, user }) => {
            if (token && session.user) {
                session.user = token;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login"
    }
};

const handler = (req: any, res: any) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST }