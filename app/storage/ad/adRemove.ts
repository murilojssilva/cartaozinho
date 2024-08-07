import AsyncStorage from '@react-native-async-storage/async-storage'
import { AD_COLLECTION } from '../storageConfig'
import { adsGetAll } from './AdsGetAll'
import { AppError } from '@/app/utils/AppError'
import Toast from 'react-native-toast-message'

export async function adRemove(adIdToRemove: string) {
  try {
    const storedAds = await adsGetAll()

    const adIndex = storedAds.findIndex((ad) => ad.id === adIdToRemove)

    if (adIndex === -1) {
      throw new AppError('O anúncio não foi encontrado.')
    }

    const updatedAds = [
      ...storedAds.slice(0, adIndex),
      ...storedAds.slice(adIndex + 1),
    ]

    const storage = JSON.stringify(updatedAds)

    await AsyncStorage.setItem(AD_COLLECTION, storage)
  } catch (error) {
    if (error instanceof AppError) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao remover anúncio.',
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: `Não foi possível remover o anúncio.`,
      })
    }
  }
}
