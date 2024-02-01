import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const handler=NextAuth({
  providers:[
    GoogleProvider({
    clientId:'391536440347-o5ejm4dflcv5l37eqord7tn2pvt4u09s.apps.googleusercontent.com',
      clientSecret:"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",

    })
  ]
})

export {handler as GET ,handler as POST}