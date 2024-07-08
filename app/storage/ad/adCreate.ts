import AsyncStorage from '@react-native-async-storage/async-storage'
import { AD_COLLECTION } from '../storageConfig'
import { adsGetAll } from './AdsGetAll'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { AppError } from '@/app/utils/AppError'
import Toast from 'react-native-toast-message'

export async function adCreate(newAd: IAdProps) {
  try {
    const storedAds = await adsGetAll()

    const adAlreadyExists = storedAds.includes(newAd)

    if (adAlreadyExists) {
      throw new AppError('Já existe um anúncio com estes parâmetros.')
    }

    const storage = JSON.stringify([...storedAds, newAd])

    await AsyncStorage.setItem(AD_COLLECTION, storage)
  } catch (error) {
    if (error instanceof AppError) {
      Toast.show({
        type: 'error',
        text1: `Erro ao criar anúncios.`,
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: `Não foi possível criar um novo anúncio`,
      })
    }
  }
}
