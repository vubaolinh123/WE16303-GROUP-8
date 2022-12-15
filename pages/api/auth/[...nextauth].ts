import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
    })
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signin',
    error: '/signin'
  },
  // session: {
  //   strategy: "jwt",
  // },
  // debug: true,
  secret: process.env.NEXT_PUBLIC_SECRET,

})