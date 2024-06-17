import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT, JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      first_name: string
      last_name: string
      role: string
      email: string
      accessToken?: string
      permissions: any,
      shop: {
        id: number,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string,
        businesses: [
          {
            id: number,
            name: string,
            code: string,
            createdAt: string,
            updatedAt: string
          }
        ]
      }
    } & DefaultSession
  }

  interface User extends DefaultUser {
    user: {
      id: string
      first_name: string
      last_name: string
      role: string
      email: string
      accessToken?: string
      permissions: any,
      shop: {
        id: number,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string,
        businesses: [
          {
            id: number,
            name: string,
            code: string,
            createdAt: string,
            updatedAt: string
          }
        ]
      }
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      id: string
      first_name: string
      last_name: string
      role: string
      email: string
      accessToken?: string
      permissions: any,
      shop: {
        id: number,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string
        businesses: [
          {
            id: number,
            name: string,
            code: string,
            createdAt: string,
            updatedAt: string
          }
        ]
      }
    }
  }
}
