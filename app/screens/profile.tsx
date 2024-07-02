import { ActionButton } from '@/components/ActionButton'
import { MyItemCard } from '@/components/MyItemCard'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonMyItemCard } from '@/components/Skeletons/SkeletonMyItemCard'
import { SkeletonText } from '@/components/Skeletons/SkeletonText'
import { TabHeader } from '@/components/TabHeader'
import { Title } from '@/components/Title'
import { Topic } from '@/components/Topic'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useCallback, useState } from 'react'
import { Linking } from 'react-native'

import { StyledFlatList, StyledView } from '../styled'
import { adsGetAll } from '../storage/ad/AdsGetAll'
import { useFocusEffect } from '@react-navigation/native'
import { adRemove } from '../storage/ad/adRemove'
import { IAdProps } from '../interfaces/IAdProps'
import { EmptyList } from '@/components/EmptyList'

export function Profile() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)

  const [ad, setAd] = useState<IAdProps[]>([] as IAdProps[])

  async function fetchAds() {
    try {
      const data = await adsGetAll()
      console.log(data)
      setAd(data)
    } catch (error) {
      throw error
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAds()
      console.log(ad)
    }, [])
  )
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
            {isLoading ? (
              <SkeletonText />
            ) : (
              <Topic icon='user' name='Nome' content='Murilo' />
            )}
            {isLoading ? (
              <SkeletonText />
            ) : (
              <Topic
                icon='phone'
                name='Telefone'
                content='(21) 99999-9999'
                onPress={() => Linking.openURL('tel:+5521992687311')}
              />
            )}
            {isLoading ? (
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
          {isLoading ? (
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

          <StyledView className='flex-2 flex-col'>
            {isLoading ? (
              <StyledView className='flex-2 flex-row justify-around w-full'>
                <SkeletonMyItemCard />
                <SkeletonMyItemCard />
                <SkeletonMyItemCard />
              </StyledView>
            ) : (
              <StyledFlatList
                className='flex-2 my-2'
                data={ad}
                renderItem={({ item }) => (
                  <MyItemCard
                    name={item.name}
                    office={item.office}
                    onPress={() => navigation.navigate('MyAd')}
                  />
                )}
                ListHeaderComponent={<Title text='Meus anúncios' />}
                ListEmptyComponent={<EmptyList />}
                style={{ flexDirection: 'column' }}
              />
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  )
}
