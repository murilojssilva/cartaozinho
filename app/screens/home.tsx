import { useNavigation } from 'expo-router'

import { useState, useEffect, useCallback } from 'react'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'

import {
  StyledFlatList,
  StyledKeyboardAvoidingView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../styled'
import { TabHeader } from '@/components/TabHeader'
import { CardItem } from '@/components/CardItem'
import { FilterButton } from '@/components/FilterButton'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderButton } from '@/components/OrderButton'
import { OrderMenu } from '@/components/OrderMenu'
import { ChangeCityButton } from '@/components/ChangeCityButton'
import { ChangeCityMenu } from '@/components/ChangeCityMenu'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { EmptyList } from '@/components/EmptyList'
import { SkeletonFilterButton } from '@/components/Skeletons/SkeletonFilterButton'
import { Title } from '@/components/Title'

import useGetCity from '@/hooks/useGetCity'
import { adsGetAll } from '../storage/ad/AdsGetAll'
import { useFocusEffect } from '@react-navigation/native'
import { IAdProps } from '../interfaces/IAdProps'
import { SkeletonChangeCity } from '@/components/Skeletons/SkeletonChangeCity'
import { Alert, RefreshControl } from 'react-native'
import { useFilters } from '@/hooks/useFilters'
import useOrderMenu from '@/hooks/useOrderMenu'
import { categories, officeTypes, serviceTypes } from '../constants'

export function Home() {
  const navigation = useNavigation()

  const { city, state, isLoadingGetCity } = useGetCity()

  const [selectedCity, setSelectedCity] = useState(city)
  const [selectedState, setSelectedState] = useState(state)
  const handleCitySelected = (city: string, state: string) => {
    setSelectedCity(city)
    setSelectedState(state)
  }

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialFilters = {
    name: '',
    categories: [],
    officeTypes: [],
    serviceTypes: [],
  }

  const { filters, setFilters } = useFilters(initialFilters)

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          setIsLoading(true)
          const data = await adsGetAll()
          setAd(data)
          setIsLoading(false)
        } catch (error) {
          Alert.alert('Erro ao buscar anúncios: ', error as string)
          setIsLoading(false)
        }
      }

      if (city) {
        fetchData()
      }
    }, [city])
  )

  useFocusEffect(
    useCallback(() => {
      const fetchAds = async () => {
        try {
          const storedAds = await adsGetAll()

          const filteredAds = storedAds.filter((ad) => {
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

          setAd(filteredAds)
        } catch (error) {
          Alert.alert('Erro ao buscar anúncios:', error as string)
        }
      }

      fetchAds()
    }, [filters])
  )

  const [orderMenuVisible, setOrderMenuVisible] = useState(false)
  const { orderMenu, setOrderMenu } = useOrderMenu()
  const [changeCityMenuVisible, setChangeCityMenuVisible] = useState(false)
  const [ad, setAd] = useState<IAdProps[]>([] as IAdProps[])

  async function fetchAds() {
    try {
      setIsLoading(true)
      const data = await adsGetAll()
      setAd(data)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const [orderOption, setOrderOption] = useState<string>('option1')

  useEffect(() => {
    setSelectedCity(city)
    setSelectedState(state)
  }, [city, state])

  useEffect(() => {
    if (orderOption === 'option1') {
      setAd((prevAd) =>
        [...prevAd].sort((a, b) => a.name.localeCompare(b.name))
      )
    } else if (orderOption === 'option2') {
      setAd((prevAd) => [...prevAd].sort((a, b) => Number(a.id) - Number(b.id)))
    }
  }, [orderOption])

  function fetchFilterMenu() {
    setFilterMenuVisible(true)
    setOrderMenuVisible(false)
    setChangeCityMenuVisible(false)
  }
  function fetchOrderMenu() {
    setOrderMenuVisible(true)
    setFilterMenuVisible(false)
    setChangeCityMenuVisible(false)
  }
  function fetchChangeCityMenu() {
    setChangeCityMenuVisible(true)
    setOrderMenuVisible(false)
    setFilterMenuVisible(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchAds()
    }, [selectedCity])
  )

  return (
    <StyledKeyboardAvoidingView className='flex-1 bg-white'>
      <TabHeader
        text='Cartãozinho'
        icon='home'
        iconAction='pluscircleo'
        iconActionColor='#0e7490'
        onPress={() => navigation.navigate('NewAd')}
      />

      <StyledView className='flex-2 p-4'>
        {isLoadingGetCity || isLoading ? (
          <SkeletonChangeCity />
        ) : (
          <StyledView className='flex-2 flex-row bg-gray-200 rounded-xl items-center mb-2'>
            <StyledView className='flex-1 flex-row justify-between items-center px-6 py-4'>
              <FontAwesome5 name='map-marker-alt' size={16} />

              <StyledView className='flex-1 flex-row justify-center'>
                <StyledText className='font-bold text-sm'>
                  {selectedCity.length > 12
                    ? selectedCity.slice(0, 9) + '...'
                    : selectedCity}
                </StyledText>
                <StyledText className='font-bold text-sm'>
                  {` - ${selectedState}`}
                </StyledText>
              </StyledView>
            </StyledView>
            <ChangeCityButton onPress={fetchChangeCityMenu} />
          </StyledView>
        )}

        {isLoadingGetCity || isLoading ? (
          <StyledView className='flex-2'>
            <StyledView className='flex-2 flex-row justify-between'>
              <SkeletonFilterButton />
              <SkeletonFilterButton />
            </StyledView>
            <SkeletonCardItem />
            <SkeletonCardItem />
            <SkeletonCardItem />
          </StyledView>
        ) : (
          <StyledView>
            {ad.length > 0 && (
              <StyledView>
                <StyledView className='flex-2 flex-row justify-between'>
                  <FilterButton onPress={fetchFilterMenu} />
                  <OrderButton onPress={fetchOrderMenu} />
                </StyledView>
              </StyledView>
            )}

            <StyledFlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={fetchAds} />
              }
              data={ad}
              ListHeaderComponent={
                <StyledView className='flex-2 flex-row justify-between items-center'>
                  <Title text='Anúncios' />

                  <StyledTouchableOpacity onPress={() => fetchAds()}>
                    <FontAwesome size={20} name='refresh' color='white' />
                  </StyledTouchableOpacity>
                </StyledView>
              }
              renderItem={({ item }: { item: IAdProps }) => (
                <CardItem
                  name={item.name}
                  email={item.email}
                  whatsapp={item.whatsapp}
                  phone={item.phone}
                  office={item.office}
                  officeTypes={item.officeTypes}
                  serviceTypes={item.serviceTypes}
                  categories={item.categories}
                  onPress={() =>
                    navigation.navigate('Details', {
                      name: item.name,
                      email: item.email,
                      id: item.id,
                      office: item.office,
                      officeTypes: item.officeTypes,
                      categories: item.categories,
                      description: item.description,
                      serviceTypes: item.serviceTypes,
                      phone: item.phone,
                      whatsapp: item.whatsapp,
                      cep: item.cep,
                      street: item.street,
                      number: item.number,
                      neighborhood: item.neighborhood,
                      city: item.city,
                      state: item.state,
                      complement: item.complement,
                    })
                  }
                />
              )}
              ListEmptyComponent={
                <EmptyList onPress={() => navigation.navigate('NewAd')} />
              }
              ListFooterComponent={<StyledView style={{ height: 350 }} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </StyledView>
        )}
      </StyledView>

      {filterMenuVisible && (
        <FilterMenu
          filters={filters}
          visible={filterMenuVisible}
          sheetHeight={660}
          onClose={() => setFilterMenuVisible(false)}
          setFilters={setFilters}
        />
      )}

      {orderMenuVisible && (
        <OrderMenu
          orderMenu={orderMenu}
          setOrderMenu={setOrderMenu}
          visible={orderMenuVisible}
          onClose={() => setOrderMenuVisible(false)}
          option={orderOption}
          setOption={setOrderOption}
          sheetHeight={550}
        />
      )}

      {changeCityMenuVisible && (
        <ChangeCityMenu
          sheetHeight={600}
          visible={changeCityMenuVisible}
          onClose={() => setChangeCityMenuVisible(false)}
          onCitySelected={handleCitySelected}
        />
      )}
    </StyledKeyboardAvoidingView>
  )
}
