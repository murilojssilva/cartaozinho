import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITES_COLLECTION } from '../storageConfig'
import { IAdProps } from '@/app/interfaces/IAdProps'

export async function favoritesGetAll(): Promise<IAdProps[]> {
  try {
    const storage = await AsyncStorage.getItem(FAVORITES_COLLECTION)
    const favorites: IAdProps[] = storage ? JSON.parse(storage) : []
    return favorites
  } catch (error) {
    throw error
  }
}
