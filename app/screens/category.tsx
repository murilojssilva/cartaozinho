import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useState } from 'react'
import { CardItem } from '@/components/CardItem'
import { EmptyList } from '@/components/EmptyList'
import { FilterButton } from '@/components/FilterButton'
import { Header } from '@/components/Header'
import { OrderButton } from '@/components/OrderButton'
import { SkeletonCardItem } from '@/components/Skeletons/SkeletonCardItem'
import { SkeletonFilterButton } from '@/components/Skeletons/SkeletonFilterButton'

import { StyledFlatList, StyledView } from '../styled'
import { IAdProps } from '../interfaces/IAdProps'

export function Category() {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { category, categoryIcon } = useLocalSearchParams()

  const navigation = useNavigation()

  const ad: IAdProps[] = [] as IAdProps[]

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
              ListEmptyComponent={
                <EmptyList onPress={() => navigation.navigate('NewAd')} />
              }
              ListFooterComponent={<StyledView style={{ height: 350 }} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </StyledView>
        )}
      </StyledView>
    </StyledView>
  )
}
