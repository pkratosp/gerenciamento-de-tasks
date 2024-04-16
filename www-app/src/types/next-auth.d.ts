import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    
    token: string;
    data: {
      id: string;
      name: string;
      email: string;
      password: string;
    };
    
  }
}
