import nextAuth, { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";


const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }
