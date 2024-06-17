import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken';
import { Manager } from '@/backend/models/engine';
import { UserType } from '@/backend/types/UserType';
import { checkPassword, generateHash } from '@/helper/generateHash';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'password', type: 'password', placeholder: 'password' },
        username: { label: 'username', type: 'text', placeholder: 'username' }
      },
      async authorize(credentials: any) {
        const { username, password } = credentials
        const user_data = (await Manager().User.findOne({
          where: {
            username: username,
          }, include: [
            {
              model: Manager().Role.model, as: 'role'
            },
            {
              model: Manager().Shop.model, as: 'shop', include: [
                {
                  model: Manager().Business.model, as: 'businesses'
                },
              ]
            }
          ]
        })).toJSON() as UserType
        console.log("user_data", user_data)

        if (!user_data) {
          throw new Error("Nombre de usuario no existe")
        }

        const match = await checkPassword(password, user_data.password_hash)

        if (!match) {
          throw new Error("Contraseña no coincide")
        }

        console.log("user_data", user_data)

        const user = {
          id: user_data.id,
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          role: user_data.role.name,
          email: user_data.email,
          shop: {
            id: user_data.shop.id,
            name: user_data.shop.name,
            description: user_data.shop.description,
            businesses: [
              {
                id: user_data.shop.businesses[0].id,
                name: user_data.shop.businesses[0].name,
                code: user_data.shop.businesses[0].code,
              }
            ]
          },
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
