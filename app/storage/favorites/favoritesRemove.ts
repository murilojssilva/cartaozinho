import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITES_COLLECTION } from '../storageConfig'
import { favoritesGetAll } from './favoritesGetAll'
import Toast from 'react-native-toast-message'

export async function favoritesRemove(id: string) {
  try {
    const storedFavorites = await favoritesGetAll()

    const updatedFavorites = storedFavorites.filter(
      (favorite) => favorite.id !== id
    )
    const storage = JSON.stringify(updatedFavorites)

    await AsyncStorage.setItem(FAVORITES_COLLECTION, storage)
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: `Não foi possível remover dos favoritos`,
    })
  }
}
