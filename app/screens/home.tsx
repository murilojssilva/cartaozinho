import { useNavigation } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import {
  StyledFlatList,
  StyledKeyboardAvoidingView,
  StyledText,
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

import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'
import useGetCity from '@/hooks/useGetCity'
import { adsGetAll } from '../storage/ad/AdsGetAll'
import { useFocusEffect } from '@react-navigation/native'
import { IAdProps } from '../interfaces/IAdProps'
import { SearchInput } from '@/components/SearchInput'
import { SkeletonChangeCity } from '@/components/Skeletons/SkeletonChangeCity'

export function Home() {
  const navigation = useNavigation()
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()
  const { city, state, isLoadingGetCity } = useGetCity()

  const [selectedCity, setSelectedCity] = useState(city)
  const [selectedState, setSelectedState] = useState(state)

  const handleCitySelected = (city: string, state: string) => {
    setSelectedCity(city)
    setSelectedState(state)
  }

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)
  const [changeCityMenuVisible, setChangeCityMenuVisible] = useState(false)
  const [ad, setAd] = useState<IAdProps[]>([] as IAdProps[])

  async function fetchAds() {
    try {
      const data = await adsGetAll()
      setAd(data)
      console.log(ad)
    } catch (error) {
      throw error
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAds()
      console.log(ad)
    }, [selectedCity])
  )

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
      setAd((prevAd) => [...prevAd].sort((a, b) => a.id - b.id))
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

  const filteredAds = ad.filter((a) => a.city === selectedCity)

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
        {isLoadingGetCity ? (
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

        {isLoadingGetCity ? (
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
                <StyledView className='mb-2'>
                  <SearchInput text='Pesquisar' />
                </StyledView>
                <StyledView className='flex-2 flex-row justify-between'>
                  <FilterButton onPress={fetchFilterMenu} />
                  <OrderButton onPress={fetchOrderMenu} />
                </StyledView>
              </StyledView>
            )}

            <StyledFlatList
              showsVerticalScrollIndicator={false}
              className='h-screen'
              data={filteredAds}
              ListHeaderComponent={<Title text='Anúncios' />}
              renderItem={({ item }: { item: IAdProps }) => (
                <CardItem
                  name={item.name}
                  email={item.email}
                  whatsapp={item.whatsapp}
                  phone={item.phone}
                  office={item.office}
                  officeType={item.officeType}
                  categories={item.categories}
                  onPress={() => navigation.navigate('Details')}
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

      {ad.length > 0 && (
        <StyledView>
          <FilterMenu
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
            visible={filterMenuVisible}
            onClose={() => setFilterMenuVisible(false)}
            sheetHeight={740}
          />
          <OrderMenu
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            visible={orderMenuVisible}
            onClose={() => setOrderMenuVisible(false)}
            option={orderOption}
            setOption={setOrderOption}
            sheetHeight={550}
          />
          <ChangeCityMenu
            visible={changeCityMenuVisible}
            onClose={() => setChangeCityMenuVisible(false)}
            sheetHeight={ad ? 690 : 550}
            onCitySelected={handleCitySelected}
          />
        </StyledView>
      )}
    </StyledKeyboardAvoidingView>
  )
}
