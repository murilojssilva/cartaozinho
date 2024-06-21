import { CardItem } from '@/components/CardItem'
import { FilterButton } from '@/components/FilterButton'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderButton } from '@/components/OrderButton'
import { OrderMenu } from '@/components/OrderMenu'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { TabHeader } from '@/components/TabHeader'
import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'

export default function Favorites() {
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  function fetchFilterMenu() {
    setFilterMenuVisible(true)
    setOrderMenuVisible(false)
  }
  function fetchOrderMenu() {
    setOrderMenuVisible(true)
    setFilterMenuVisible(false)
  }

  return (
    <View className='flex-1 bg-white'>
      <TabHeader text='Favoritos' icon='bookmark' />

      <ScrollView className='flex-2 mb-2 p-4'>
        <View className='flex-2 flex-row justify-between'>
          <FilterButton onPress={fetchFilterMenu} />
          <OrderButton onPress={fetchOrderMenu} />
        </View>

        {isLoading ? (
          <View className='flex-2 my-2'>
            <SkeletonCardItem />
            <SkeletonCardItem />
            <SkeletonCardItem />
            <SkeletonCardItem />
          </View>
        ) : (
          <>
            <CardItem
              name='Joana Silva'
              office='Cabeleireira'
              officeType='Prestador de serviço'
              category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
            />
            <CardItem
              name='Murilo Silva'
              office='Desenvolvedor'
              officeType='Prestador de serviço'
              category={[
                'Informática',
                'Desenvolvimento',
                'Website',
                'Aplicativos',
                'Mobile',
              ]}
            />
            <CardItem
              name='Joana Silva'
              office='Cabeleireira'
              officeType='Prestador de serviço'
              category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
              onPress={() => navigation.navigate('details')}
            />
            <CardItem
              name='Murilo Silva'
              office='Desenvolvedor'
              officeType='Prestador de serviço'
              category={[
                'Informática',
                'Desenvolvimento',
                'Website',
                'Aplicativos',
                'Mobile',
              ]}
              onPress={() => navigation.navigate('details')}
            />
            <CardItem
              name='Murilo Silva'
              office='Desenvolvedor'
              officeType='Prestador de serviço'
              category={['Informática']}
              onPress={() => navigation.navigate('details')}
            />
            <CardItem
              name='Murilo Silva'
              office='Desenvolvedor'
              officeType='Prestador de serviço'
              category={['Informática']}
              onPress={() => navigation.navigate('details')}
            />
            <CardItem
              name='Murilo Silva'
              office='Desenvolvedor'
              officeType='Prestador de serviço'
              category={['Informática']}
              onPress={() => navigation.navigate('details')}
            />
            <CardItem
              name='Murilo Silva'
              office='Desenvolvedor'
              officeType='Prestador de serviço'
              category={['Informática']}
              onPress={() => navigation.navigate('details')}
            />
            <CardItem
              name='Murilo'
              office='Desenvolvedor'
              officeType='Prestador de serviço'
              category={['Informática']}
              onPress={() => navigation.navigate('details')}
            />
          </>
        )}
      </ScrollView>
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
  )
}
