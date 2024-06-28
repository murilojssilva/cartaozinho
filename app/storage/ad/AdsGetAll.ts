import AsyncStorage from '@react-native-async-storage/async-storage'
import { AD_COLLECTION } from '../storageConfig'
import { IAdProps } from '@/app/interfaces/IAdProps'

export async function adsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(AD_COLLECTION)

    const ads: IAdProps[] = storage ? JSON.parse(storage) : []

    return ads
  } catch (error) {
    throw error
  }
}
