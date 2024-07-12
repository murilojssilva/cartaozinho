import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_COLLECTION } from '../storageConfig'
import { IUserProps } from '@/app/interfaces/IUserProps'

export async function usersGetAll(): Promise<IUserProps[]> {
  try {
    const storage = await AsyncStorage.getItem(USER_COLLECTION)
    return storage ? JSON.parse(storage) : []
  } catch (error) {
    throw new Error('Erro ao obter usuários.')
  }
}
