import { useState, useLayoutEffect, useCallback } from 'react'
import { StyledFlatList, StyledView } from '../styled'
import { IAdProps } from '../interfaces/IAdProps'
import { useFilters } from '@/hooks/useFilters'
import { useFavorites } from '@/hooks/useFavorites'
import { TabHeader } from '@/components/TabHeader'
import useOrderMenu from '@/hooks/useOrderMenu'
import { SkeletonFilterButton } from '@/components/Skeletons/SkeletonFilterButton'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { FilterButton } from '@/components/FilterButton'
import { OrderButton } from '@/components/OrderButton'
import { CardItem } from '@/components/CardItem'
import { EmptyFavoriteList } from '@/components/EmptyFavoriteList'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderMenu } from '@/components/OrderMenu'
import { ActionButton } from '@/components/ActionButton'
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router'

export function Favorites() {
  const { loadFavorites, favorites, isFavoriteLoading, removeAllFavorites } =
    useFavorites()

  const navigation = useNavigation()

  const { orderMenu, setOrderMenu } = useOrderMenu()
  const { filters, setFilters } = useFilters({
    name: '',
    categories: [],
    officeTypes: [],
    serviceTypes: [],
  })

  const { favoritesSize } = useLocalSearchParams()

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, [favoritesSize])
  )

  const [orderOption, setOrderOption] = useState<string>('option1')
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)

  useLayoutEffect(() => {
    if (orderOption === 'option1') {
      favorites.sort((a, b) => a.name.localeCompare(b.name))
    } else if (orderOption === 'option2') {
      favorites.sort((a, b) => Number(a.id) - Number(b.id))
    }
  }, [orderOption, favorites])

  const fetchFilterMenu = () => {
    setFilterMenuVisible(true)
    setOrderMenuVisible(false)
  }

  const fetchOrderMenu = () => {
    setOrderMenuVisible(true)
    setFilterMenuVisible(false)
  }

  return (
    <StyledView className='flex-1 bg-white'>
      <TabHeader text='Favoritos' icon='bookmark' />

      {favorites.length > 0 && (
        <ActionButton
          text='Remover todos os favoritos'
          icon='trash'
          backgroundColor='transparent'
          textColor='red-500'
          iconColor='red'
          onPress={() => removeAllFavorites()}
        />
      )}

      {isFavoriteLoading ? (
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
              <StyledView className='flex-2 flex-row justify-between'>
                <FilterButton onPress={fetchFilterMenu} />
                <OrderButton onPress={fetchOrderMenu} />
              </StyledView>
            </StyledView>
          )}
          <StyledFlatList
            showsVerticalScrollIndicator={false}
            className='h-screen'
            data={favorites}
            renderItem={({ item }: { item: IAdProps }) => (
              <CardItem
                user_id={item.user_id}
                id={item.id as string}
                name={item.name}
                contact={
                  item.contact as {
                    phone: string
                    email: string
                    whatsapp: string
                    instagram: string
                  }
                }
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
                description={item.description}
                officeTypes={item.officeTypes}
                serviceTypes={item.serviceTypes}
                categories={item.categories}
                created_at={item.created_at}
                updated_at={item.updated_at}
                onPress={() =>
                  navigation.navigate('FavoritesDetails', {
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
            ListEmptyComponent={<EmptyFavoriteList />}
            ListFooterComponent={<StyledView />}
            keyExtractor={(item: IAdProps) => item.id}
          />
        </StyledView>
      )}

      {favorites.length > 0 && (
        <StyledView>
          {filterMenuVisible && (
            <FilterMenu
              filters={filters}
              visible={filterMenuVisible}
              sheetHeight={450}
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
              sheetHeight={150}
            />
          )}
        </StyledView>
      )}
    </StyledView>
  )
}
