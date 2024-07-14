import { IAdProps } from '@/app/interfaces/IAdProps'
import { adsGetAll } from './AdsGetAll'

export async function adGetById(id: string): Promise<IAdProps | null> {
  try {
    const ads = await adsGetAll()
    const ad = ads.find((ad) => ad.id === id) || null
    return ad
  } catch (error) {
    throw error
  }
}
