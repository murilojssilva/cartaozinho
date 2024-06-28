import { Ionicons } from '@expo/vector-icons'
import { SocialButton } from './SocialButton'
import { Tag } from './Tag'
import { useState } from 'react'
import {
  StyledFlatList,
  StyledScrollView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '@/app/styled'
import { ICardItemProps } from '@/app/interfaces/IAdProps'
import { Linking } from 'react-native'

export function CardItem({
  name,
  office,
  officeType,
  categories,
  phone,
  whatsapp,
  email,
  ...props
}: ICardItemProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  return (
    <StyledTouchableOpacity
      {...props}
      className='flex-2 flex-col gap-0 bg-gray-200 p-4 mb-4 w-full'
    >
      <StyledView className='flex-1 flex-row my-4'>
        <StyledView className='flex-1 flex-row justify-between items-start'>
          <StyledView className='flex-1 flex-row gap-2'>
            <StyledView className='flex-2 items-center justify-center bg-gray-300 p-4 rounded-xl'>
              <Ionicons name='person' size={32} color='gray-300' />
            </StyledView>
            <StyledView className='flex-1 flex-col'>
              <StyledText className='font-bold text-xl'>{name}</StyledText>
              <StyledText className='font-semibold text-sm'>
                {office}
              </StyledText>
              <StyledText className='font-normal text-xs'>
                {officeType}
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledTouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
            <Ionicons
              name='bookmark'
              size={28}
              color={isFavorited ? '#0e7490' : '#9ca3af'}
            />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
      <StyledFlatList
        data={categories}
        renderItem={({ item }) => (
          <StyledScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-2 flex-row gap-2 my-4'
          >
            {item.map((categorie: string, index) => (
              <Tag key={index} text={categorie} backgroundColor='gray-600' />
            ))}
          </StyledScrollView>
        )}
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
            onPress={() => Linking.openURL(`whatsapp://send?phone=${whatsapp}`)}
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
