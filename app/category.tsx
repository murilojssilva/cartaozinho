import { useLocalSearchParams, useRouter } from 'expo-router'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { View, FlatList } from 'react-native'
import { ActionButton } from '@/components/ActionButton'
import { CardItem } from '@/components/CardItem'
import { EmptyList } from '@/components/EmptyList'
import { FilterButton } from '@/components/FilterButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { OrderButton } from '@/components/OrderButton'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { SkeletonFilterButton } from '@/components/Skeletons/SkeletonFilterButton'
import { Tag } from '@/components/Tag'
import { Title } from '@/components/Title'
import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'

interface IAdProps {
  name: string
  office: string
  officeType: string
  categories: string[]
}

export default function Category() {
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { category, categoryIcon } = useLocalSearchParams()

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
    <View className='flex-1 flex-col'>
      <Header title={category} icon={categoryIcon} />
      <View className='flex-2 p-4'>
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
            {ad.filter((a) => a.categories.includes(category)).length > 0 && (
              <View className='flex-2 flex-row justify-between'>
                <FilterButton onPress={fetchFilterMenu} />
                <OrderButton onPress={fetchOrderMenu} />
              </View>
            )}
            <FlatList
              showsVerticalScrollIndicator={false}
              className='h-screen'
              data={ad.filter((a) => a.categories.includes(category))}
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
    </View>
  )
}
