import { ModuleContext } from '@graphql-modules/core'
import { PubSub, withFilter } from 'apollo-server-express'

import { User } from '../../../entity/user'
import { IResolvers } from '../../../types'
import { UserProvider } from '../providers/user.provider'

export default {
  Query: {
    me: (obj: any, args: any, { injector }: any) => injector.get(UserProvider).getMe(),
    users: (obj, args, { injector }) => injector.get(UserProvider).getUsers()
  },
  Mutation: {
    updateUser: (obj: any, { name, picture }: any, { injector }: any) => injector.get(UserProvider).updateUser({
      name: name || '',
      picture: picture || ''
    })
  },
  Subscription: {
    userAdded: {
      subscribe: withFilter(
        (root, args, { injector }: ModuleContext) => injector.get(PubSub).asyncIterator('userAdded'),
        (data: { userAdded: User }, variables, { injector }: ModuleContext) => data && injector.get(UserProvider).filterUserAddedOrUpdated(data.userAdded),
      ),
    },
    userUpdated: {
      subscribe: withFilter(
        (root, args, { injector }: ModuleContext) => injector.get(PubSub).asyncIterator('userAdded'),
        (data: { userUpdated: User }, variables, { injector }: ModuleContext) =>
          data && injector.get(UserProvider).filterUserAddedOrUpdated(data.userUpdated)
      )
    }
  }
} as IResolvers
