import { FlatList, ScrollView, Text, View } from 'react-native'
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
import { styled } from 'nativewind'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledFlatList = styled(FlatList)
const StyledScrollView = styled(ScrollView)

StyledFlatList

interface IAdProps {
  name: string
  office: string
  officeType: string
  categories: string[]
}

export function Home() {
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
    <StyledView className='flex-1 bg-white'>
      <TabHeader
        text='Cartãozinho'
        icon='home'
        iconAction='pluscircleo'
        iconActionColor='#0e7490'
        onPress={() => navigation.navigate('NewAd')}
      />

      <StyledScrollView
        showsVerticalScrollIndicator={false}
        className='flex-2 mb-2 p-4'
      >
        <StyledView className='flex-2 flex-row bg-gray-200 rounded-xl items-center'>
          <StyledView className='flex-1 flex-row justify-between items-center px-6 py-4'>
            <FontAwesome5 name='map-marker-alt' size={16} />
            <StyledView className='flex-1 flex-row justify-center'>
              <StyledText className='font-bold text-xl'>
                {isLoading ? '' : 'Petrópolis'}
              </StyledText>
              <StyledText className='font-bold text-xl'>
                {isLoading ? ' - ' : ' - RJ'}
              </StyledText>
            </StyledView>
          </StyledView>
          <ChangeCityButton />
        </StyledView>

        <Title text='Anúncios' />

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
            <StyledView className='flex-2 flex-row justify-between'>
              <FilterButton onPress={fetchFilterMenu} />
              <OrderButton onPress={fetchOrderMenu} />
            </StyledView>
            <StyledFlatList
              showsVerticalScrollIndicator={false}
              className='h-screen'
              data={ad}
              renderItem={({ item }) => (
                <CardItem
                  name={item.name}
                  office={item.office}
                  officeType={item.officeType}
                  categories={item.categories}
                  onPress={() => navigation.navigate('Details')}
                />
              )}
              ListEmptyComponent={<EmptyList />}
              ListFooterComponent={<View style={{ height: 350 }} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </StyledView>
        )}
      </StyledScrollView>

      {ad.length > 0 && (
        <StyledView>
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
        </StyledView>
      )}
    </StyledView>
  )
}
