import { ActionButton } from '@/components/ActionButton'
import { MyItemCard } from '@/components/MyItemCard'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonMyItemCard } from '@/components/Skeletons/SkeletonMyItemCard'
import { SkeletonText } from '@/components/Skeletons/SkeletonText'
import { TabHeader } from '@/components/TabHeader'
import { Title } from '@/components/Title'
import { Topic } from '@/components/Topic'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Linking } from 'react-native'

import { StyledFlatList, StyledTouchableOpacity, StyledView } from '../styled'
import { IAdProps } from '../interfaces/IAdProps'
import { EmptyList } from '@/components/EmptyList'
import { Ionicons } from '@expo/vector-icons'
import { useAds } from '@/hooks/useAds'

export function Profile() {
  const navigation = useNavigation()

  const { allAds, handleAdRemoveAll, isLoadingAllAds } = useAds()

  return (
    <StyledView className='flex-1 bg-white'>
      <TabHeader
        text='Perfil'
        icon='user'
        iconAction='logout'
        iconActionColor='red'
        onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
      />

      <StyledView className='flex-2 flex-col'>
        <StyledView className='flex-2 p-4 flex-col h-full'>
          <StyledView className='flex-2 mb-4 flex-col'>
            <Title text='Informações pessoais' />
            {isLoadingAllAds ? (
              <SkeletonText />
            ) : (
              <Topic icon='user' name='Nome' content='Murilo' />
            )}
            {isLoadingAllAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='phone'
                name='Telefone'
                content='(21) 99999-9999'
                onPress={() => Linking.openURL('tel:+5521992687311')}
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='envelope'
                name='E-mail'
                content='email@email.com'
                onPress={() =>
                  Linking.openURL('mailto:murilojssilva@outlook.com')
                }
              />
            )}
          </StyledView>
          {isLoadingAllAds ? (
            <StyledView className='flex-2 flex-row justify-between'>
              <SkeletonActionButton />
              <SkeletonActionButton />
            </StyledView>
          ) : (
            <StyledView className='flex-2 flex-row justify-around'>
              <ActionButton
                text='Editar perfil'
                icon='pencil'
                iconColor='white'
                backgroundColor='cyan-700'
                textColor='white'
                onPress={() => navigation.navigate('EditProfile')}
              />
              <ActionButton
                backgroundColor='cyan-700'
                textColor='white'
                iconColor='white'
                text='Alterar senha'
                icon='lock-open'
                onPress={() => navigation.navigate('EditPassword')}
              />
            </StyledView>
          )}
          <StyledView className='flex-2 flex-row justify-between items-center'>
            <Title text='Meus anúncios' />

            <StyledTouchableOpacity onPress={handleAdRemoveAll}>
              <Ionicons name='trash' size={22} />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className='flex-2 flex-col'>
            {isLoadingAllAds ? (
              <StyledView className='flex-2 flex-row justify-around w-full'>
                <SkeletonMyItemCard />
                <SkeletonMyItemCard />
                <SkeletonMyItemCard />
              </StyledView>
            ) : (
              <StyledFlatList
                className='flex-2 my-2'
                horizontal
                data={allAds}
                renderItem={({ item }: { item: IAdProps }) => (
                  <MyItemCard
                    name={item.name}
                    office={item.office}
                    id={item.id as string}
                    onPress={() =>
                      navigation.navigate('MyAd', {
                        name: item.name,
                        email: item.email,
                        id: item.id,
                        office: item.office,
                        officeTypes: item.officeTypes,
                        categories: item.categories,
                        description: item.description,
                        serviceTypes: item.serviceTypes,
                        phone: item.phone,
                        whatsapp: item.whatsapp,
                        instagram: item.instagram,
                        cep: item.cep,
                        street: item.street,
                        number: item.number,
                        neighborhood: item.neighborhood,
                        city: item.city,
                        state: item.state,
                        complement: item.complement,
                      })
                    }
                  />
                )}
                ListEmptyComponent={
                  <EmptyList onPress={() => navigation.navigate('NewAd')} />
                }
              />
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  )
}
