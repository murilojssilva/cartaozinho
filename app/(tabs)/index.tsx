import { FlatList, Text, View } from 'react-native'
import { CardItem } from '../../components/CardItem'

import { useNavigation } from 'expo-router'
import { FilterButton } from '@/components/FilterButton'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderButton } from '@/components/OrderButton'
import { OrderMenu } from '@/components/OrderMenu'
import { Title } from '@/components/Title'
import { TabHeader } from '@/components/TabHeader'
import { useState } from 'react'
import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'
import { FontAwesome5 } from '@expo/vector-icons'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { EmptyList } from '@/components/EmptyList'
import { SkeletonFilterButton } from '@/components/Skeletons/SkeletonFilterButton'
import { ChangeCityButton } from '@/components/ChangeCityButton'

interface IAdProps {
  name: string
  office: string
  officeType: string
  categories: string[]
}

export default function HomeScreen() {
  const navigation = useNavigation()
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [ad, setAd] = useState<IAdProps[]>([
    {
      name: 'Murilo Silva',
      office: 'Desenvolvedor',
      officeType: 'Prestador de serviço',
      categories: ['Tecnologia'],
    },
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
      name: 'SerraTech',
      office: 'Loja de Eletrônicos',
      officeType: 'Estabelecimento',
      categories: ['Serviços', 'Tecnologia'],
    },
    {
      name: 'Gatos & Só',
      office: 'Clínica Veterinária',
      officeType: 'Estabelecimento',
      categories: ['Pet', 'Serviços'],
    },
    {
      name: 'Joana Oliveira',
      office: 'Cabeleireira',
      officeType: 'Prestador de serviço',
      categories: ['Beleza'],
    },
  ] as IAdProps[])
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
      <TabHeader
        text='Cartãozinho'
        icon='home'
        iconAction='pluscircleo'
        iconActionColor='#0e7490'
        onPress={() => navigation.navigate('new')}
      />

      <View showsVerticalScrollIndicator={false} className='flex-2 mb-2 p-4'>
        <View className='flex-2 flex-row bg-gray-200 rounded-xl items-center'>
          <View className='flex-1 flex-row justify-between items-center px-6 py-4'>
            <FontAwesome5 name='map-marker-alt' size={16} />
            <View className='flex-1 flex-row justify-center'>
              <Text className='font-bold text-xl'>
                {isLoading ? '' : 'Petrópolis'}
              </Text>
              <Text className='font-bold text-xl'>
                {isLoading ? ' - ' : ' - RJ'}
              </Text>
            </View>
          </View>
          <ChangeCityButton />
        </View>

        <Title text='Anúncios' />

        {isLoading ? (
          <View className='flex-2'>
            <View className='flex-2 flex-row justify-between'>
              <SkeletonFilterButton />
              <SkeletonFilterButton />
            </View>
            <SkeletonCardItem />
            <SkeletonCardItem />
            <SkeletonCardItem />
          </View>
        ) : (
          <View>
            <View className='flex-2 flex-row justify-between'>
              <FilterButton onPress={fetchFilterMenu} />
              <OrderButton onPress={fetchOrderMenu} />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              className='h-screen'
              data={ad}
              renderItem={({ item }) => (
                <CardItem
                  name={item.name}
                  office={item.office}
                  officeType={item.officeType}
                  categories={item.categories}
                  onPress={() => navigation.navigate('details')}
                />
              )}
              ListEmptyComponent={<EmptyList />}
              ListFooterComponent={<View style={{ height: 350 }} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>

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
