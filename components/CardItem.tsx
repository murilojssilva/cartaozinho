import { Ionicons } from '@expo/vector-icons'
import { SocialButton } from './SocialButton'
import { Tag } from './Tag'
import { useState } from 'react'
import {
  StyledFlatList,
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
            <StyledView className='flex-2 w-24 items-center justify-center bg-gray-300 p-4 rounded-xl'>
              <Ionicons name='person' size={32} color='gray-300' />
            </StyledView>
            <StyledView className='flex-1 flex-col'>
              <StyledText className='font-bold text-xl'>{name}</StyledText>
              <StyledText className='font-semibold text-sm'>
                {office}
              </StyledText>
              <StyledText className='font-normal text-xs flex-2 flex-row'>
                {officeType.length == 2
                  ? `${officeType[0]}, ${officeType[1]}`
                  : officeType[0]}
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
