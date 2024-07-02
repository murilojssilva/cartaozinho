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
import { useState, useEffect } from 'react'
import { StyledFlatList, StyledView } from '../styled'
import { IAdProps } from '../interfaces/IAdProps'
import { SearchInput } from '@/components/SearchInput'

export function Favorites() {
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)

  const [ad, setAd] = useState<IAdProps[]>([] as IAdProps[])

  const [isLoading, setIsLoading] = useState(false)
  const [orderOption, setOrderOption] = useState<string>('option1')

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
            data={ad}
            renderItem={({ item }: { item: IAdProps }) => (
              <CardItem
                phone={item.phone}
                whatsapp={item.whatsapp}
                email={item.email}
                name={item.name}
                office={item.office}
                officeType={item.officeType}
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
      {ad.length > 0 && (
        <StyledView>
          <FilterMenu
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
            visible={filterMenuVisible}
            onClose={() => setFilterMenuVisible(false)}
            sheetHeight={520}
          />

          <OrderMenu
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            visible={orderMenuVisible}
            onClose={() => setOrderMenuVisible(false)}
            option={orderOption}
            setOption={setOrderOption}
            sheetHeight={320}
          />
        </StyledView>
      )}
    </StyledView>
  )
}
