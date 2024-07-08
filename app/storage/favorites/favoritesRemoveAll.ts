import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITES_COLLECTION } from '../storageConfig'
import { favoritesGetAll } from './favoritesGetAll'
import Toast from 'react-native-toast-message'

export async function favoritesRemoveAll() {
  try {
    const storedFavorites = await favoritesGetAll()

    if (storedFavorites.length === 0) {
      Toast.show({
        type: 'error',
        text1: `Nenhum favorito encontrado para remover`,
      })

      return
    }

    const updatedFavorites: [] = []
    const storage = JSON.stringify(updatedFavorites)

    await AsyncStorage.setItem(FAVORITES_COLLECTION, storage)

    Toast.show({
      type: 'success',
      text1: `Todos os favoritos foram removidos com sucesso.`,
    })
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: `Erro ao remover todos os favoritos.`,
      text2: error as string,
    })
  }
}
