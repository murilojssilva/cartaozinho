import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useState } from 'react'
import { View, FlatList } from 'react-native'
import { CardItem } from '@/components/CardItem'
import { EmptyList } from '@/components/EmptyList'
import { FilterButton } from '@/components/FilterButton'
import { Header } from '@/components/Header'
import { OrderButton } from '@/components/OrderButton'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { SkeletonFilterButton } from '@/components/Skeletons/SkeletonFilterButton'
import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'

import { styled } from 'nativewind'

const StyledView = styled(View)
const StyledFlatList = styled(FlatList)

StyledFlatList

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

  const navigation = useNavigation()

  const ad: IAdProps[] = [
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
  ] as IAdProps[]

  function fetchFilterMenu() {
    setFilterMenuVisible(true)
    setOrderMenuVisible(false)
  }

  function fetchOrderMenu() {
    setOrderMenuVisible(true)
    setFilterMenuVisible(false)
  }

  return (
    <StyledView className='flex-1 flex-col bg-white'>
      <Header title={category as string} icon={categoryIcon as string} />
      <StyledView className='flex-2 p-4'>
        {isLoading ? (
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
            {ad.filter((a) => a.categories.includes(category as string))
              .length > 0 && (
              <StyledView className='flex-2 flex-row justify-between'>
                <FilterButton onPress={fetchFilterMenu} />
                <OrderButton onPress={fetchOrderMenu} />
              </StyledView>
            )}
            <StyledFlatList
              showsVerticalScrollIndicator={false}
              className='h-screen'
              data={ad.filter((a) => a.categories.includes(category as string))}
              renderItem={({ item }: { item: IAdProps }) => (
                <CardItem
                  name={item.name}
                  office={item.office}
                  officeType={item.officeType}
                  categories={item.categories}
                  onPress={() => navigation.navigate('CategoryDetails')}
                />
              )}
              ListEmptyComponent={<EmptyList />}
              ListFooterComponent={<View style={{ height: 350 }} />} // Substitua StyledView com View para React Native
              keyExtractor={(item, index) => index.toString()}
            />
          </StyledView>
        )}
      </StyledView>
    </StyledView>
  )
}