import { ActionButton } from '@/components/ActionButton'
import { MyItemCard } from '@/components/MyItemCard'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonMyItemCard } from '@/components/Skeletons/SkeletonMyItemCard'
import { SkeletonText } from '@/components/Skeletons/SkeletonText'
import { TabHeader } from '@/components/TabHeader'
import { Title } from '@/components/Title'
import { Topic } from '@/components/Topic'
import { useNavigation } from 'expo-router'
import { Linking } from 'react-native'

import { StyledFlatList, StyledTouchableOpacity, StyledView } from '../styled'

import { Ionicons } from '@expo/vector-icons'
import { useAds } from '@/hooks/useAds'
import { useUser } from '../context/UserContext'
import { useAuthForm } from '@/hooks/useAuthForm'

export function Profile() {
  const navigation = useNavigation()
  const { myAds, handleAdRemoveAll, isLoadingMyAds } = useAds()
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
            {isLoadingMyAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='user'
                name='Nome'
                content={`${user?.name} ${user?.lastName}` || 'Nome completo'}
              />
            )}
            {isLoadingMyAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='user'
                name='Nome de usuário'
                content={user?.nickname || 'Nome de usuário'}
              />
            )}

            {isLoadingMyAds ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='phone'
                name='Telefone'
                content={user?.phone || '(00) 0000-0000'}
                onPress={() => Linking.openURL(`tel:${user?.phone}`)}
              />
            )}
            {isLoadingMyAds ? (
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
          {isLoadingMyAds ? (
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
                onPress={() => navigation.navigate('EditProfile' as never)}
              />
              <ActionButton
                backgroundColor='cyan-700'
                textColor='white'
                iconColor='white'
                text='Alterar senha'
                icon='lock-open'
                onPress={() => navigation.navigate('EditPassword' as never)}
              />
            </StyledView>
          )}
          <StyledView className='flex-2 flex-row justify-between items-center'>
            <Title text='Meus anúncios' />

            {myAds.length > 0 && (
              <StyledTouchableOpacity onPress={handleAdRemoveAll}>
                <Ionicons name='trash' size={22} />
              </StyledTouchableOpacity>
            )}
          </StyledView>

          <StyledView className='flex-2 flex-col'>
            {isLoadingMyAds ? (
              <StyledView className='flex-2 flex-row'>
                <SkeletonMyItemCard />
                <SkeletonMyItemCard />
                <SkeletonMyItemCard />
              </StyledView>
            ) : (
              <StyledFlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={myAds}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({
                  item,
                }: {
                  item: { name: string; office: string; id: string }
                }) => (
                  <MyItemCard
                    name={item.name}
                    office={item.office}
                    id={item.id}
                    onPress={() =>
                      navigation.navigate('MyAd', {
                        name: item.name,
                        office: item.office,
                        id: item.id,
                        contact: item.contact,
                        officeTypes: item.officeTypes,
                        categories: item.categories,
                        description: item.description,
                        serviceTypes: item.serviceTypes,
                        address: item.address,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                      })
                    }
                  />
                )}
              />
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  )
}
