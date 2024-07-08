import AsyncStorage from '@react-native-async-storage/async-storage'
import { AD_COLLECTION } from '../storageConfig'
import { adsGetAll } from './AdsGetAll'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { AppError } from '@/app/utils/AppError'
import Toast from 'react-native-toast-message'

export async function adEdit(updatedAd: IAdProps) {
  try {
    const storedAds = await adsGetAll()
    const adIndex = storedAds.findIndex((ad) => ad.id === updatedAd.id)

    if (adIndex === -1) {
      throw new AppError('Anúncio não encontrado.')
    }

    const updatedAds = [...storedAds]
    updatedAds[adIndex] = updatedAd

    const storage = JSON.stringify(updatedAds)
    await AsyncStorage.setItem(AD_COLLECTION, storage)

    Toast.show({
      type: 'success',
      text1: 'Anúncio editado com sucesso',
    })
  } catch (error) {
    if (error instanceof AppError) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao editar anúncio.',
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível editar o anúncio.',
      })
    }
  }
}
