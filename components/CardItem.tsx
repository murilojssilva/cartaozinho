import { Ionicons } from '@expo/vector-icons'
import { SocialButton } from './SocialButton'
import { Tag } from './Tag'
import { useState, useEffect } from 'react'
import {
  StyledFlatList,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '@/app/styled'
import { ICardItemProps } from '@/app/interfaces/IAdProps'
import { Linking } from 'react-native'
import { favoritesGetAll } from '@/app/storage/favorites/favoritesGetAll'
import { favoritesRemove } from '@/app/storage/favorites/favoritesRemove'
import { favoritesAdd } from '@/app/storage/favorites/favoritesAdd'

export function CardItem({
  id,
  name,
  office,
  officeTypes,
  serviceTypes,
  categories,
  phone,
  whatsapp,
  email,
  ...props
}: ICardItemProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await favoritesGetAll()
      setFavorites(storedFavorites.map((fav) => fav.id))
    }
    loadFavorites()
  }, [])

  const toggleFavorite = async () => {
    try {
      if (favorites.includes(id)) {
        await favoritesRemove(id)
        setFavorites((prevFavorites) =>
          prevFavorites.filter((favId) => favId !== id)
        )
      } else {
        const newFavorite = {
          id,
          name,
          office,
          officeTypes,
          serviceTypes,
          categories,
          phone,
          whatsapp,
          email,
        }
        await favoritesAdd(newFavorite as any)
        setFavorites((prevFavorites) => [...prevFavorites, id])
      }
    } catch (error) {
      console.error('Failed to update favorites:', error)
    }
  }

  const isFavorited = favorites.includes(id)

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
          <StyledTouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorited ? 'bookmark' : 'bookmark-outline'}
              size={28}
              color={isFavorited ? '#0e7490' : '#9ca3af'}
            />
          </StyledTouchableOpacity>
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
