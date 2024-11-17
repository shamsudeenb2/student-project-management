import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "../../../authConfig";
import { connectToDB } from "../../../utils/databaseCon";
import { User } from "../../../utils/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    
    if (!user) throw new Error("Wrong credentials!");

    console.log('login now', user)

    // const isPasswordCorrect = await bcrypt.compare(
    //   credentials.password,
    //   user.password
    // );
    const isPasswordCorrect =true
    console.log('login now', isPasswordCorrect)
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    
    return user;
    return ""
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};


// ...authConfig,
export const authOptions={  
    
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
        token.id = user.id;
        token.state = user.state
        token.role = user.role
        token.supervisor = user.supervisor
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
        session.user.id = token.id;
        session.user.state = token.state;
        session.user.role = token.role;
        session.user.supervisor = token.supervisor
      }
      return session
    },
    pages: {// Custom login page
      signIn: "/login",
    },
  },
  secret: process.env.JWT_SECRET,
};

export const handler = NextAuth(authOptions);


export {handler as GET, handler as POST}
