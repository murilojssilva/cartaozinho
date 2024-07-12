import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_COLLECTION } from '../storageConfig'
import { usersGetAll } from './usersGetAll'
import { IUserProps } from '@/app/interfaces/IUserProps'
import { AppError } from '@/app/utils/AppError'
import Toast from 'react-native-toast-message'

export async function userEdit(updatedUser: IUserProps) {
  try {
    const storedUsers = await usersGetAll()
    const userIndex = storedUsers.findIndex(
      (user) => user.id === updatedUser.id
    )

    if (userIndex === -1) {
      throw new AppError('Usuário não encontrado.')
    }

    const updatedUsers = [...storedUsers]
    updatedUsers[userIndex] = updatedUser

    const storage = JSON.stringify(updatedUsers)
    await AsyncStorage.setItem(USER_COLLECTION, storage)

    Toast.show({
      type: 'success',
      text1: 'Usuário editado com sucesso',
    })
  } catch (error) {
    if (error instanceof AppError) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao editar usuário.',
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível editar o usuário.',
      })
    }
  }
}
