import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_COLLECTION } from '../storageConfig'
import { usersGetAll } from './usersGetAll'
import { IUserProps } from '@/app/interfaces/IUserProps'
import { AppError } from '@/app/utils/AppError'
import Toast from 'react-native-toast-message'

export async function userCreate(newUser: IUserProps) {
  try {
    const storedUsers = await usersGetAll()

    const userAlreadyExists = storedUsers.some(
      (user) => user.email === newUser.email
    )
    if (userAlreadyExists) {
      throw new AppError('Já existe um usuário com este e-mail.')
    }

    const updatedUsers = [...storedUsers, newUser]

    await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(updatedUsers))

    Toast.show({
      type: 'success',
      text1: 'Usuário criado com sucesso!',
    })
  } catch (error) {
    if (error instanceof AppError) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar usuário.',
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível criar o usuário.',
      })
    }
  }
}
