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
import { useState } from 'react'
import { FlatList, View } from 'react-native'

interface IAdProps {
  name: string
  office: string
  officeType: string
  categories: string[]
}

export function Favorites() {
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)

  const [ad, setAd] = useState<IAdProps[]>([
    {
      name: 'Paulo Cesar',
      office: 'Padeiro',
      officeType: 'Prestador de serviço',
      categories: ['Alimentação'],
    },
    {
      name: 'DIB',
      office: 'Loja de Guloseimas',
      officeType: 'Estabelecimento',
      categories: ['Alimentação'],
    },
    {
      name: 'Joana Oliveira',
      office: 'Cabeleireira',
      officeType: 'Prestador de serviço',
      categories: ['Beleza'],
    },
  ] as IAdProps[])

  const [isLoading, setIsLoading] = useState(false)

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
    <View className='flex-1 bg-white'>
      <TabHeader text='Favoritos' icon='bookmark' />

      {isLoading ? (
        <View className='flex-2 flex-col p-4'>
          <View className='flex-2 flex-row justify-between'>
            <SkeletonFilterButton />
            <SkeletonFilterButton />
          </View>
          <SkeletonCardItem />
          <SkeletonCardItem />
          <SkeletonCardItem />
        </View>
      ) : (
        <View className='flex-2 mb-2 p-4'>
          <View className='flex-2 flex-row justify-between'>
            <FilterButton onPress={fetchFilterMenu} />
            <OrderButton onPress={fetchOrderMenu} />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ad}
            renderItem={({ item }) => (
              <CardItem
                name={item.name}
                office={item.office}
                officeType={item.officeType}
                categories={item.categories}
                onPress={() => navigation.navigate('FavoritesDetails')}
              />
            )}
            ListEmptyComponent={<EmptyFavoriteList />}
            ListFooterComponent={<View style={{ height: 130 }} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      {ad.length > 0 && (
        <View>
          <FilterMenu
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
            visible={filterMenuVisible}
            onClose={() => setFilterMenuVisible(false)}
          />

          <OrderMenu
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            visible={orderMenuVisible}
            onClose={() => setOrderMenuVisible(false)}
          />
        </View>
      )}
    </View>
  )
}
