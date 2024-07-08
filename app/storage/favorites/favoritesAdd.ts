import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITES_COLLECTION } from '../storageConfig'
import { favoritesGetAll } from './favoritesGetAll'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { AppError } from '@/app/utils/AppError'
import Toast from 'react-native-toast-message'

export async function favoritesAdd(newFavorite: IAdProps) {
  try {
    const storedFavorites = await favoritesGetAll()

    const favoriteAlreadyExists = storedFavorites.some(
      (fav) => fav.id === newFavorite.id
    )

    if (favoriteAlreadyExists) {
      throw new AppError('Este anúncio já está nos favoritos.')
    }

    const updatedFavorites = [...storedFavorites, newFavorite]
    const storage = JSON.stringify(updatedFavorites)

    await AsyncStorage.setItem(FAVORITES_COLLECTION, storage)
  } catch (error) {
    if (error instanceof AppError) {
      Toast.show({
        type: 'error',
        text1: `Favoritos`,
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: `Não foi possível adicionar aos favoritos`,
      })
    }
  }
}
