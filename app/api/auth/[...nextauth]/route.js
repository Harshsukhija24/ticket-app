import { connectDb } from "@/app/lib/mongodb";
import User from "@/app/models/User"; // 
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, companyName } = credentials; 
        try {
          await connectDb();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const company = await User.findOne({ companyName });
          if (!company) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
