import { Injectable, ProviderScope } from '@graphql-modules/di'
import { PubSub } from 'apollo-server-express'
import { Connection } from 'typeorm'
import * as cloudinary from 'cloudinary'

import { User } from '../../../entity/user'
import { AuthProvider } from '../../auth/providers/auth.provider'

@Injectable()
export class UserProvider {
  constructor(
    private connection: Connection,
    private pubsub: PubSub,
    private authProvider: AuthProvider
  ) {}

  public repository = this.connection.getRepository(User)
  private currentUser = this.authProvider.currentUser

  createQueryBuilder() {
    return this.connection.createQueryBuilder(User, 'user')
  }

  getMe() {
    return this.currentUser
  }

  getUsers() {
    return this.createQueryBuilder()
      .where('user.id != :id', { id: this.currentUser.id })
      .getMany()
  }

  async updateUser({ name, picture }: { name?: string, picture?: string } = {}) {
    if (
      name === this.currentUser.name &&
      picture === this.currentUser.name
    ) {
      return this.currentUser
    }

    this.currentUser.name = name || this.currentUser.name
    this.currentUser.picture = picture || this.currentUser.picture

    await this.repository.save(this.currentUser)

    this.pubsub.publish('userUpdated', {
      userUpdated: this.currentUser
    })

    return this.currentUser
  }

  filterUserAddedOrUpdated(userAddedOrUpdated: User) {
    userAddedOrUpdated.id !== this.currentUser.id
  }

  uploadProfilePic(filePath: string) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filePath, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }
}
