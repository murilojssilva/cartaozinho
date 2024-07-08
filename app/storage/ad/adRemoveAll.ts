import AsyncStorage from '@react-native-async-storage/async-storage'
import { AD_COLLECTION } from '../storageConfig'
import { adsGetAll } from './AdsGetAll'
import { AppError } from '@/app/utils/AppError'
import Toast from 'react-native-toast-message'

export async function adRemoveAll() {
  try {
    const storedAds = await adsGetAll()

    if (storedAds.length === 0) {
      Toast.show({
        type: 'error',
        text1: `Nenhum anúncio encontrado para remover`,
      })

      return
    }

    const updatedAds: [] = []
    const storage = JSON.stringify(updatedAds)

    await AsyncStorage.setItem(AD_COLLECTION, storage)

    Toast.show({
      type: 'success',
      text1: `Todos os anúncios foram removidos com sucesso.`,
    })
  } catch (error) {
    if (error instanceof AppError) {
      Toast.show({
        type: 'error',
        text1: `Erro ao remover todos os anúncios.`,
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: `Não foi possível remover todos os anúncios.`,
      })
    }
  }
}
