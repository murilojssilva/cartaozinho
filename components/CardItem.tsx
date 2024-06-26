import { Ionicons } from '@expo/vector-icons'

import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { useNavigation } from 'expo-router'
import { SocialButton } from './SocialButton'
import { Tag } from './Tag'
import { useState } from 'react'

import { styled } from 'nativewind'

const StyledText = styled(Text)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledScrollView = styled(ScrollView)

interface ICardItemProps extends TouchableOpacityProps {
  name: string
  office: string
  officeType: string
  categories: string[]
}

export function CardItem({
  name,
  office,
  officeType,
  categories,
  ...props
}: ICardItemProps) {
  const navigation = useNavigation()

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
      <StyledScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        className='flex-2 flex-row gap-2 my-4'
      >
        {categories.map((categorie: string, index) => (
          <Tag key={index} text={categorie} backgroundColor='gray-600' />
        ))}
      </StyledScrollView>
      <StyledView className='flex-1 flex-row'>
        <SocialButton
          text='Telefone'
          color='gray-300'
          icon='phone'
          onPress={() => navigation.navigate('details')}
        />

        <SocialButton
          text='WhatsApp'
          color='green-300'
          icon='whatsapp'
          onPress={() => navigation.navigate('details')}
        />

        <SocialButton
          text='E-mail'
          color='gray-300'
          icon='envelope'
          onPress={() => navigation.navigate('details')}
        />
      </StyledView>
    </StyledTouchableOpacity>
  )
}
