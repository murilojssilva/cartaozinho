import { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { IAdProps } from '@/app/interfaces/IAdProps'
import { adsGetAll } from '@/app/storage/ad/AdsGetAll'
import { adRemove } from '@/app/storage/ad/adRemove'
import Toast from 'react-native-toast-message'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useFilters } from './useFilters'
import { adRemoveAll } from '@/app/storage/ad/adRemoveAll'
import { useUser } from '@/app/context/UserContext'
import { adCreate } from '@/app/storage/ad/adCreate'
import { adEdit } from '@/app/storage/ad/adEdit'
import {
  defaultCategories,
  defaultOfficeTypes,
  defaultServiceTypes,
} from '@/app/constants'
import useGetAddress from './useGetAddress'
import { adGetById } from '@/app/storage/ad/adGetById'
import axios from 'axios'

export const useAds = () => {
  const {
    id,
    contact,
    address,
    officeTypes: selectedOfficeTypesFromParams = defaultOfficeTypes,
    serviceTypes: selectedServiceTypesFromParams = defaultServiceTypes,
    categories: selectedCategoriesFromParams = defaultCategories,
  } = useLocalSearchParams()

  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState<string[]>(
    selectedOfficeTypesFromParams
  )
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    selectedServiceTypesFromParams
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedCategoriesFromParams
  )
  const { newAddress, setNewAddress } = useGetAddress()

  const [ads, setAds] = useState<IAdProps[]>([])
  const [ad, setAd] = useState({} as IAdProps)
  const [editedAd, setEditedAd] = useState<IAdProps>(ad as IAdProps)
  const [allAds, setAllAds] = useState<IAdProps[]>([])
  const [myAds, setMyAds] = useState<IAdProps[]>([])
  const [isLoadingAds, setIsLoadingAds] = useState(false)

  const [isLoadingAd, setIsLoadingAd] = useState(false)
  const [isLoadingAllAds, setIsLoadingAllAds] = useState(false)
  const [isLoadingMyAds, setIsLoadingMyAds] = useState(false)
  const navigation = useNavigation()

  const { filters, setFilters, resetFilters } = useFilters({
    name: '',
    categories: [],
    officeTypes: [],
    serviceTypes: [],
  })
  const { user } = useUser()

  const { handleCepChange } = useGetAddress()

  const fetchAllAds = async () => {
    try {
      setIsLoadingAllAds(true)
      const data = await adsGetAll()
      setAllAds(data)
      const userAds = data.filter((ad) => ad.user_id === user?.id)
      setMyAds(userAds)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Erro ao buscar todos os anúncios`,
        text2: error instanceof Error ? error.message : 'Erro desconhecido.',
      })
    } finally {
      setIsLoadingAllAds(false)
      setIsLoadingMyAds(false)
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

  async function handleNewAd() {
    setIsLoadingAd(true)
    try {
      await adCreate(ad)
      navigation.navigate('Home' as never)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingAd(false)
    }
  }

  const handleInputChange = (field: keyof IAdProps, value: string) => {
    setAd((prevAd) => ({
      ...prevAd,
      [field]: value,
    }))
  }

  const handleContactChange = (
    field: keyof IAdProps['contact'],
    value: string
  ) => {
    setAd((prevAd) => ({
      ...prevAd,
      contact: {
        ...prevAd.contact,
        [field]: value,
      },
    }))
  }

  const handleAddressChange = (
    field: keyof IAdProps['address'],
    value: string
  ) => {
    setAd((prevAd) => ({
      ...prevAd,
      address: {
        ...prevAd.address,
        [field]: value,
      },
    }))
  }

  useFocusEffect(
    useCallback(() => {
      fetchAllAds()
    }, [user])
  )

  const fetchAds = async (city: string) => {
    try {
      setIsLoadingAds(true)
      const data = await adsGetAll()

      const cityData = data.filter(
        (ads) => ads.address && ads.address.city === city
      )

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

      navigation.navigate('Home' as never)
    } catch (error) {
      Toast.show({ type: 'error', text1: `Erro ao remover anúncio: ${error}` })
    }
  }

  const handleOfficeTypesSelected = (tag: string) => {
    setSelectedOfficeTypes((prevSelected) => {
      if (prevSelected.includes(tag)) {
        return prevSelected.filter((item) => item !== tag)
      } else {
        return [...prevSelected, tag]
      }
    })
  }

  const handleServiceTypesSelected = (serviceType: string) => {
    setSelectedServiceTypes((prevSelected) => {
      if (prevSelected.includes(serviceType)) {
        return prevSelected.filter((item) => item !== serviceType)
      } else {
        return [...prevSelected, serviceType]
      }
    })
  }

  const handleCategorySelected = (category: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category)
      } else {
        return [...prevSelected, category]
      }
    })
  }

  async function handleGetAd(id: string): Promise<IAdProps | null> {
    setIsLoadingAd(true)
    try {
      const ad = await adGetById(id)
      if (ad) {
        setAd(ad)
        setEditedAd(ad)
      } else {
        Toast.show({
          type: 'info',
          text1: 'Erro ao buscar anúncio.',
        })
        return null
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar dados.',
        text2: error as string,
      })
    } finally {
      setIsLoadingAd(false)
    }
  }

  async function handleGetEditedAd(id: string): Promise<IAdProps | null> {
    setIsLoadingAd(true)
    try {
      const edtitableAd = await adGetById(id)

      setEditedAd(edtitableAd as IAdProps)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar dados.',
        text2: error as string,
      })
    } finally {
      setIsLoadingAd(false)
    }
  }

  const handleSaveAd = async () => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${editedAd.address.cep}/json/`
      )
      const { logradouro, bairro, localidade, uf, erro } = response.data
      console.log(editedAd)
      const updatedAd = {
        ...editedAd,
        id,
        user_id: user?.id,
        name: editedAd.name,
        office: editedAd.office,
        description: editedAd.description,
        contact: {
          email: editedAd.contact.email,
          phone: editedAd.contact.phone,
          whatsapp: editedAd.contact.whatsapp,
          instagram: editedAd.contact.instagram,
        },
        officeTypes: selectedOfficeTypes,
        serviceTypes: selectedServiceTypes,
        categories: selectedCategories,
        address: {
          cep: editedAd.address.cep,
          number: editedAd.address.number,
          neighborhood: bairro,
          street: logradouro,
          city: localidade,
          state: uf,
          complement: editedAd.address.complement,
        },
        created_at: editedAd.created_at,
        updated_at: Date.now().toString(),
      }

      await adEdit(updatedAd as IAdProps)

      Toast.show({
        type: 'success',
        text1: 'Anúncio editado com sucesso',
        onShow: () => navigation.navigate('Home' as never),
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível editar o anúncio',
      })
    }
  }

  useEffect(() => {
    fetchAllAds()
  }, [user])

  useEffect(() => {
    setNewAddress(address as any)
  }, [address, setNewAddress, handleSaveAd])

  return {
    handleGetAd,
    address,
    contact,
    ads,
    isLoadingAd,
    setIsLoadingAd,
    allAds,
    fetchAllAds,
    myAds,
    setAds,
    isLoadingAds,
    isLoadingAllAds,
    isLoadingMyAds,
    fetchAds,
    handleAdRemoveAll,
    handleRemoveAd,
    handleSaveAd,
    handleInputChange,
    handleAddressChange,
    handleContactChange,
    selectedCategories,
    selectedServiceTypes,
    selectedOfficeTypes,
    setSelectedOfficeTypes,
    setSelectedServiceTypes,
    setSelectedCategories,
    handleCategorySelected,
    handleServiceTypesSelected,
    handleOfficeTypesSelected,
    handleNewAd,
    ad,
    id,
    handleGetEditedAd,
    setAd,
    editedAd,
    setEditedAd,
    filters,
    setFilters,
    resetFilters,
  }
}
