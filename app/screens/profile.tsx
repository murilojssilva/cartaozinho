import { ActionButton } from '@/components/ActionButton'
import { MyItemCard } from '@/components/MyItemCard'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonMyItemCard } from '@/components/Skeletons/SkeletonMyItemCard'
import { SkeletonText } from '@/components/Skeletons/SkeletonText'
import { TabHeader } from '@/components/TabHeader'
import { Title } from '@/components/Title'
import { Topic } from '@/components/Topic'
import { useFocusEffect, useNavigation } from 'expo-router'
import { Linking } from 'react-native'

import { StyledFlatList, StyledTouchableOpacity, StyledView } from '../styled'
import { IAdProps } from '../interfaces/IAdProps'
import { EmptyList } from '@/components/EmptyList'
import { Ionicons } from '@expo/vector-icons'
import { useAds } from '@/hooks/useAds'
import { useUser } from '../context/UserContext'
import { useAuthForm } from '@/hooks/useAuthForm'

export function Profile() {
  const navigation = useNavigation()
  const { allAds, handleAdRemoveAll, isLoadingAllAds } = useAds()
  const { user } = useUser()
  const { handleLogout } = useAuthForm({
    email: '',
    password: '',
  })

  return (
    <StyledView className='flex-1 bg-white'>
      <TabHeader
        text='Perfil'
        icon='user'
        iconAction='logout'
        iconActionColor='red'
        onPress={handleLogout}
      />

      <StyledView className='flex-2 flex-col'>
        <StyledView className='flex-2 p-4 flex-col h-full'>
          <StyledView className='flex-2 mb-4 flex-col'>
            <Title text='Informações pessoais' />
            {isLoadingAllAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='user'
                name='Nome'
                content={`${user?.name} ${user?.lastName}` || 'Nome completo'}
              />
            )}

            {isLoadingAllAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='phone'
                name='Telefone'
                content={user?.phone || '(00) 0000-0000'}
                onPress={() => Linking.openURL(`tel:${user?.phone}`)}
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='envelope'
                name='E-mail'
                content={user?.email || 'email@example.com'}
                onPress={() => Linking.openURL(`mailto:${user?.email}`)}
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
              <StyledView className='flex-2 flex-row'>
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
