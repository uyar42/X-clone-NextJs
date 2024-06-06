import nextAuth, { AuthOptions, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";



const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {

            if (session?.user) {
                session.user.username = session.user.name?.split(' ').join('').toLocaleLowerCase() || '';
                session.user.uid = token.sub || '';
            }
            return session;
        }
    }
};



const handler = nextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }
