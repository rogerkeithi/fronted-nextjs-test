import { jwtDecode } from 'jwt-decode'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface DecodedToken {
  id: string;
  username: string;
  nivel: string;
}

interface LoginResponse {
  token: string;
  expiresIn: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }
        const token = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');

        const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`,
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
          })
        })
        if (loginResponse.ok) {
          const loginResponseJson: LoginResponse = await loginResponse.json();
          const decodedToken = jwtDecode<DecodedToken>(loginResponseJson.token);
          return {
            id: decodedToken.id,
            username: decodedToken.username,
            nivel: decodedToken.nivel,
          };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          nivel: token.nivel
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          username: u.username,
          nivel: u.nivel
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
