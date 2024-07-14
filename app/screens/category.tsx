import { useLocalSearchParams, useNavigation } from 'expo-router'
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
import { SearchInput } from '@/components/SearchInput'
import { useAds } from '@/hooks/useAds'
import { useFilters } from '@/hooks/useFilters'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderMenu } from '@/components/OrderMenu'
import useOrderMenu from '@/hooks/useOrderMenu'

export function Category() {
  const { orderMenu, setOrderMenu } = useOrderMenu()
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)
  const [orderOption, setOrderOption] = useState<string>('option1')

  const { filters, setFilters } = useFilters({
    name: '',
    categories: [],
    officeTypes: [],
    serviceTypes: [],
  })

  const { category, categoryIcon } = useLocalSearchParams()

  const navigation = useNavigation()

  const { allAds, isLoadingAds } = useAds()

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
        {isLoadingAds ? (
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
            {allAds.filter((ad) => ad.categories.includes(category as string))
              .length > 0 && (
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
              className='h-screen'
              data={allAds.filter((ad) =>
                ad.categories.includes(category as string)
              )}
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
                    navigation.navigate('CategoryDetails', {
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
              ListEmptyComponent={
                <EmptyList onPress={() => navigation.navigate('NewAd')} />
              }
              ListFooterComponent={<StyledView style={{ height: 350 }} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </StyledView>
        )}
      </StyledView>
      {allAds.filter((ad) => ad.categories.includes(category as string))
        .length > 0 && (
        <StyledView>
          {filterMenuVisible && (
            <FilterMenu
              filters={filters}
              visible={filterMenuVisible}
              sheetHeight={730}
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
              sheetHeight={450}
            />
          )}
        </StyledView>
      )}
    </StyledView>
  )
}
