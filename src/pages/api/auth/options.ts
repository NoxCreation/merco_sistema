import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken';
import { Manager } from '@/backend/models/engine';
import { UserType } from '@/backend/types/UserType';
import { generateHash } from '@/helper/generateHash';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'password', type: 'password', placeholder: 'password' },
        username: { label: 'username', type: 'text', placeholder: 'username' }
      },
      // @ts-ignore
      async authorize(credentials) {
        // @ts-ignore
        const { username, password } = credentials
        const password_hash = generateHash(password)
        const user_data = (await Manager().User.findOne({
          where: {
            username: username,
            password_hash
          }, include: [
            {
              model: Manager().Role.model, as: 'role'
            }
          ]
        })).toJSON() as UserType

        if (!user_data) {
          throw new Error(user_data)
        }

        const user = {
          id: user_data.id,
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          role: user_data.role.name,
          email: user_data.email,
          permissions: user_data.role
        } as any

        // Generar el token JWT
        const secretKey = process.env.SECRET_KEY as string; 
        const accessToken = jwt.sign(user, secretKey, { expiresIn: '7d' });

        if (!accessToken) {
          return false
        }
        user.accessToken = accessToken;
        //console.log(user)
        return { ...user }
      },
    }),
  ],
  pages: {
    signIn: '/dashboard',
    signOut: '/auth',
  },
  callbacks: {
    async jwt(props) {
      const { token, user, trigger, session } = props
      return { ...user, ...token }
    },

    async session(props) {
      const { session, token, trigger, newSession, user } = props
      session.user = token as any
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
}
