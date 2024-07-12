import { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SocialButton } from './SocialButton'
import { Tag } from './Tag'
import {
  StyledFlatList,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '@/app/styled'
import { ICardItemProps } from '@/app/interfaces/IAdProps'
import { Alert, Linking } from 'react-native'

import { useFavorites } from '@/hooks/useFavorites'
import { useUser } from '@/app/context/UserContext'
import { useAds } from '@/hooks/useAds'

export function CardItem({
  id,
  user_id,
  name,
  office,
  officeTypes,
  serviceTypes,
  categories,
  phone,
  whatsapp,
  instagram,
  email,
  ...props
}: ICardItemProps) {
  const { toggleFavorite, isFavorited, loadFavorites, favorites } =
    useFavorites()

  const favoriteList = isFavorited(id)

  const { user } = useUser()
  const { handleRemoveAd } = useAds()

  useLayoutEffect(() => {
    loadFavorites()
  }, [favoriteList])

  return (
    <StyledTouchableOpacity
      {...props}
      className='flex-2 flex-col gap-0 bg-gray-200 p-4 mb-4 w-full'
    >
      <StyledView className='flex-1 flex-row my-4'>
        <StyledView className='flex-1 flex-row justify-between items-start'>
          <StyledView className='flex-1 flex-row gap-2'>
            <StyledView className='flex-2 w-20 items-center justify-center bg-gray-300 p-4 rounded-xl'>
              <Ionicons name='person' size={26} color='gray-300' />
            </StyledView>
            <StyledView className='flex-1 flex-col'>
              <StyledText className='font-bold text-xl'>{name}</StyledText>
              <StyledText className='font-semibold text-md'>
                {office}
              </StyledText>
              <StyledFlatList
                data={officeTypes}
                vertical
                renderItem={({ item }: { item: string }) => (
                  <StyledView className='flex-2 flex-col'>
                    <StyledText className='text-xs'>{item}</StyledText>
                  </StyledView>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </StyledView>
          </StyledView>
          {user?.id === user_id ? (
            <StyledTouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Remover',
                  'Deseja remover o anúncio?',
                  [
                    {
                      text: 'Não',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'Sim', onPress: () => handleRemoveAd(id) },
                  ],
                  { cancelable: false }
                )
              }
            >
              <Ionicons name='trash' size={28} color='gray-300' />
            </StyledTouchableOpacity>
          ) : (
            <StyledTouchableOpacity onPress={() => toggleFavorite(id)}>
              <Ionicons
                name={favoriteList ? 'bookmark' : 'bookmark-outline'}
                size={28}
                color={favoriteList ? '#0e7490' : '#9ca3af'}
              />
            </StyledTouchableOpacity>
          )}
        </StyledView>
      </StyledView>
      <StyledFlatList
        className='my-4'
        data={categories}
        horizontal
        renderItem={({ item }: { item: string }) => (
          <Tag text={item} backgroundColor='gray-300' />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <StyledView className='flex-1 flex-row'>
        {phone && (
          <SocialButton
            text='Telefone'
            backgroundColor='gray-300'
            textColor='black'
            icon='phone'
            onPress={() => Linking.openURL(`tel:${phone}`)}
          />
        )}
        {whatsapp && (
          <SocialButton
            text='WhatsApp'
            backgroundColor='gray-300'
            textColor='black'
            icon='whatsapp'
            onPress={() =>
              Linking.openURL(`whatsapp://send?phone=55${whatsapp}`)
            }
          />
        )}
        {instagram && (
          <SocialButton
            text='Instagram'
            backgroundColor='gray-300'
            textColor='black'
            icon='instagram'
            onPress={() =>
              Linking.openURL(`https://instagram.com/${instagram}`)
            }
          />
        )}
        {email && (
          <SocialButton
            text='E-mail'
            backgroundColor='gray-300'
            textColor='black'
            icon='envelope'
            onPress={() => Linking.openURL(`mailto:${email}`)}
          />
        )}
      </StyledView>
    </StyledTouchableOpacity>
  )
}
