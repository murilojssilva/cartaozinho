import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITES_COLLECTION } from '../storageConfig'
import { favoritesGetAll } from './favoritesGetAll'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { AppError } from '@/app/utils/AppError'
import { Alert } from 'react-native'

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
      Alert.alert('Favoritos', error.message)
    } else {
      Alert.alert('Não foi possível adicionar aos favoritos')
    }
  }
}
