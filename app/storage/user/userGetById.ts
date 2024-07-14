import { usersGetAll } from './usersGetAll'
import { IUserProps } from '@/app/interfaces/IUserProps'

export async function userGetById(id: string): Promise<IUserProps | null> {
  try {
    const users = await usersGetAll()
    const user = users.find((user) => user.id === id) || null
    return user
  } catch (error) {
    throw error
  }
}
