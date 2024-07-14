import { useNavigation } from 'expo-router'

import { useState, useEffect, useCallback } from 'react'
import { FontAwesome5, FontAwesome, FontAwesome6 } from '@expo/vector-icons'

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
import { useFocusEffect } from '@react-navigation/native'
import { IAdProps } from '../interfaces/IAdProps'
import { SkeletonChangeCity } from '@/components/Skeletons/SkeletonChangeCity'
import { RefreshControl } from 'react-native'
import useOrderMenu from '@/hooks/useOrderMenu'
import { useAds } from '@/hooks/useAds'
import { defaultFilter } from '../constants'

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

  const { ads, isLoadingAds, fetchAds, filters, setFilters, setAds } = useAds()

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.categories || []
  )
  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState<string[]>(
    filters.officeTypes || []
  )
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    filters.serviceTypes || []
  )

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedOfficeTypes([])
    setSelectedServiceTypes([])
    setFilters(defaultFilter)
  }

  const [orderMenuVisible, setOrderMenuVisible] = useState(false)
  const { orderMenu, setOrderMenu } = useOrderMenu()
  const [changeCityMenuVisible, setChangeCityMenuVisible] = useState(false)

  const [orderOption, setOrderOption] = useState<string>('option1')

  useEffect(() => {
    setSelectedCity(city)
    setSelectedState(state)
  }, [city, state])

  useEffect(() => {
    if (orderOption === 'option1') {
      setAds((prevAd) =>
        [...prevAd].sort((a, b) => a.name.localeCompare(b.name))
      )
    } else if (orderOption === 'option2') {
      setAds((prevAd) =>
        [...prevAd].sort((a, b) => Number(a.id) - Number(b.id))
      )
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
      fetchAds(selectedCity)
    }, [selectedCity, filters])
  )

  return (
    <StyledKeyboardAvoidingView className='flex-1 bg-white'>
      <TabHeader
        text='Cartãozinho'
        icon='home'
        iconAction='pluscircleo'
        iconActionColor='#0e7490'
        onPress={() => navigation.navigate('NewAd' as never)}
      />

      <StyledView className='flex-2 p-4'>
        {isLoadingGetCity || isLoadingAds ? (
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

        {isLoadingGetCity || isLoadingAds ? (
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
            {ads.length > 0 && (
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
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => fetchAds(selectedCity)}
                />
              }
              data={ads.filter((adsCity) => adsCity.address.city === city)}
              ListHeaderComponent={
                <StyledView className='flex-2 flex-row justify-between items-center'>
                  <Title text='Anúncios' />

                  <StyledView className='flex-2 flex-row gap-2'>
                    {!(
                      filters.categories.length === 0 &&
                      filters.name.length === 0 &&
                      filters.officeTypes.length === 0 &&
                      filters.serviceTypes.length === 0
                    ) && (
                      <StyledTouchableOpacity onPress={handleClearFilters}>
                        <FontAwesome6
                          size={20}
                          name='filter-circle-xmark'
                          color='white'
                        />
                      </StyledTouchableOpacity>
                    )}
                    <StyledTouchableOpacity
                      onPress={() => fetchAds(selectedCity)}
                    >
                      <FontAwesome size={20} name='refresh' color='white' />
                    </StyledTouchableOpacity>
                  </StyledView>
                </StyledView>
              }
              renderItem={({ item }: { item: IAdProps }) => (
                <CardItem
                  description={item.description}
                  user_id={item.user_id}
                  id={item.id as string}
                  name={item.name}
                  contact={item.contact}
                  address={
                    item.address as {
                      cep: string
                      street: string
                      number: string
                      neighborhood: string
                      city: string
                      state: string
                      complement: string
                    }
                  }
                  office={item.office}
                  officeTypes={item.officeTypes}
                  serviceTypes={item.serviceTypes}
                  categories={item.categories}
                  created_at={item.created_at}
                  updated_at={item.updated_at}
                  onPress={() =>
                    navigation.navigate('Details', {
                      name: item.name,
                      id: item.id,
                      user_id: item.user_id,
                      office: item.office,
                      officeTypes: item.officeTypes,
                      categories: item.categories,
                      description: item.description,
                      serviceTypes: item.serviceTypes,
                      contact: item.contact,
                      address: item.address,
                      created_at: item.created_at,
                      updated_at: item.updated_at,
                    })
                  }
                />
              )}
              ListEmptyComponent={
                <EmptyList
                  onPress={() => navigation.navigate('NewAd' as never)}
                />
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
          sheetHeight={370}
        />
      )}

      {changeCityMenuVisible && (
        <ChangeCityMenu
          sheetHeight={550}
          visible={changeCityMenuVisible}
          onClose={() => setChangeCityMenuVisible(false)}
          onCitySelected={handleCitySelected}
        />
      )}
    </StyledKeyboardAvoidingView>
  )
}
