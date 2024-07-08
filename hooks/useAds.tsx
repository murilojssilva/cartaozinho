import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { adsGetAll } from '@/app/storage/ad/AdsGetAll'
import { adRemove } from '@/app/storage/ad/adRemove'
import Toast from 'react-native-toast-message'
import { useNavigation } from 'expo-router'
import { useFilters } from './useFilters'
import { adRemoveAll } from '@/app/storage/ad/adRemoveAll'

export const useAds = () => {
  const [ads, setAds] = useState<IAdProps[]>([])
  const [allAds, setAllAds] = useState<IAdProps[]>([])
  const [isLoadingAds, setIsLoadingAds] = useState(false)
  const [isLoadingAllAds, setIsLoadingAllAds] = useState(false)
  const navigation = useNavigation()

  const { filters, setFilters, resetFilters } = useFilters({
    name: '',
    categories: [],
    officeTypes: [],
    serviceTypes: [],
  })

  const fetchAllAds = async () => {
    try {
      setIsLoadingAllAds(true)
      const data = await adsGetAll()
      setAllAds(data)
    } catch (error) {
      console.error('Error fetching ads:', error)
      throw error
    } finally {
      setIsLoadingAllAds(false)
    }
  }

  async function handleAdRemoveAll() {
    try {
      await adRemoveAll()
      fetchAllAds()
    } catch (error) {
      throw error
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAllAds()
    }, [])
  )

  const fetchAds = async (city: string) => {
    try {
      setIsLoadingAds(true)
      const data = await adsGetAll()

      const cityData = data.filter((ads) => ads.city === city)

      const filteredAds = cityData.filter((ad) => {
        const matchesCategory =
          filters.categories.length === 0 ||
          filters.categories.some((category) =>
            ad.categories.includes(category)
          )
        const matchesOfficeType =
          filters.officeTypes.length === 0 ||
          filters.officeTypes.some((officeType) =>
            ad.officeTypes.includes(officeType)
          )
        const matchesServiceType =
          filters.serviceTypes.length === 0 ||
          filters.serviceTypes.some((serviceType) =>
            ad.serviceTypes.includes(serviceType)
          )

        return matchesCategory && matchesOfficeType && matchesServiceType
      })

      setAds(filteredAds)
      setIsLoadingAds(false)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar anúncios.',
        text2: error as string,
      })
      setIsLoadingAds(false)
    }
  }

  const handleRemoveAd = async (id: string) => {
    try {
      const adToRemove = allAds.find((a) => a.id === id)

      if (!adToRemove) {
        Toast.show({
          type: 'error',
          text1: `Anúncio não encontrado. Tente novamente.`,
        })
        return
      }

      await adRemove(adToRemove.id as string)
      fetchAllAds()

      Toast.show({
        type: 'info',
        text1: `Anúncio ${id} removido com sucesso`,
      })

      navigation.navigate('Home')
    } catch (error) {
      Toast.show({ type: 'error', text1: `Erro ao remover anúncio: ${error}` })
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAllAds()
    }, [filters])
  )

  return {
    ads,
    allAds,
    fetchAllAds,
    setAds,
    isLoadingAds,
    isLoadingAllAds,
    fetchAds,
    handleAdRemoveAll,
    handleRemoveAd,
    filters,
    setFilters,
    resetFilters,
  }
}