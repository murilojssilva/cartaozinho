import { CardItem } from '@/components/CardItem'
import { EmptyFavoriteList } from '@/components/EmptyFavoriteList'
import { FilterButton } from '@/components/FilterButton'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderButton } from '@/components/OrderButton'
import { OrderMenu } from '@/components/OrderMenu'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { SkeletonFilterButton } from '@/components/Skeletons/SkeletonFilterButton'
import { TabHeader } from '@/components/TabHeader'
import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'
import { useNavigation } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { StyledFlatList, StyledView } from '../styled'
import { IAdProps } from '../interfaces/IAdProps'
import { SearchInput } from '@/components/SearchInput'

import { useFilters } from '@/hooks/useFilters'
import { favoritesGetAll } from '../storage/favorites/favoritesGetAll'
import { useFocusEffect } from '@react-navigation/native'
import { Alert } from 'react-native'

export function Favorites() {
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)

  const initialFilters = {
    name: '',
    categories: [],
    officeTypes: [],
    serviceTypes: [],
  }

  const { filters, setFilters } = useFilters(initialFilters)

  const [favorites, setFavorites] = useState<IAdProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [orderOption, setOrderOption] = useState<string>('option1')

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          setIsLoading(true)
          loadFavorites()
          setIsLoading(false)
        } catch (error) {
          Alert.alert('Erro ao buscar anúncios: ', error as string)
          setIsLoading(false)
        }
      }
      fetchData()
    }, [favorites])
  )

  useEffect(() => {
    if (orderOption === 'option1') {
      setFavorites((prevFavorites) =>
        [...prevFavorites].sort((a, b) => a.name.localeCompare(b.name))
      )
    } else if (orderOption === 'option2') {
      setFavorites((prevFavorites) =>
        [...prevFavorites].sort((a, b) => Number(a.id) - Number(b.id))
      )
    }
  }, [orderOption])

  async function loadFavorites() {
    try {
      setIsLoading(true)
      const storedFavorites = await favoritesGetAll()
      setFavorites(storedFavorites)
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function fetchFilterMenu() {
    setFilterMenuVisible(true)
    setOrderMenuVisible(false)
  }

  function fetchOrderMenu() {
    setOrderMenuVisible(true)
    setFilterMenuVisible(false)
  }

  const navigation = useNavigation()

  return (
    <StyledView className='flex-1 bg-white'>
      <TabHeader text='Favoritos' icon='bookmark' />

      {isLoading ? (
        <StyledView className='flex-2 flex-col p-4'>
          <StyledView className='flex-2 flex-row justify-between'>
            <SkeletonFilterButton />
            <SkeletonFilterButton />
          </StyledView>
          <SkeletonCardItem />
          <SkeletonCardItem />
          <SkeletonCardItem />
        </StyledView>
      ) : (
        <StyledView className='flex-2 mb-2 p-4'>
          {favorites.length > 0 && (
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
            data={favorites}
            renderItem={({ item }: { item: IAdProps }) => (
              <CardItem
                id={item.id as string}
                phone={item.phone}
                whatsapp={item.whatsapp}
                email={item.email}
                name={item.name}
                office={item.office}
                officeTypes={item.officeTypes}
                serviceTypes={item.serviceTypes}
                categories={item.categories}
                onPress={() => navigation.navigate('FavoritesDetails')}
              />
            )}
            ListEmptyComponent={<EmptyFavoriteList />}
            ListFooterComponent={<StyledView style={{ height: 130 }} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </StyledView>
      )}
      {favorites.length > 0 && (
        <StyledView>
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
        </StyledView>
      )}
    </StyledView>
  )
}
