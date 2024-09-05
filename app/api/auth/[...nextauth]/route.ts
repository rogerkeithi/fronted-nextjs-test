import { jwtDecode } from 'jwt-decode'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

//Create interface file
interface DecodedToken {
  id: string;
  username: string;
  nivel: NIVEL;
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

        const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
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
      console.log('Session Callback', { session, token })
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
      console.log('JWT Callback', { token, user })
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
