import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITES_COLLECTION } from '../storageConfig'
import { favoritesGetAll } from './favoritesGetAll'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { Alert } from 'react-native'

export async function favoritesRemove(id: string) {
  try {
    const storedFavorites = await favoritesGetAll()

    const updatedFavorites = storedFavorites.filter(
      (favorite) => favorite.id !== id
    )
    const storage = JSON.stringify(updatedFavorites)

    await AsyncStorage.setItem(FAVORITES_COLLECTION, storage)
  } catch (error) {
    Alert.alert('Não foi possível remover dos favoritos')
  }
}
