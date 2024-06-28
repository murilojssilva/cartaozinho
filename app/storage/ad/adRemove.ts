import AsyncStorage from '@react-native-async-storage/async-storage'
import { AD_COLLECTION } from '../storageConfig'
import { adsGetAll } from './AdsGetAll'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { AppError } from '@/app/utils/AppError'
import { Alert } from 'react-native'

export async function adRemove(adToRemove: IAdProps) {
  try {
    const storedAds = await adsGetAll()

    const adIndex = storedAds.findIndex(
      (ad) => JSON.stringify(ad) === JSON.stringify(adToRemove)
    )

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
      Alert.alert('Remover anúncio', error.message)
    } else {
      console.log('Não foi possível remover o anúncio')
    }
  }
}
