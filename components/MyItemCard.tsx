import { IAdProps } from '@/app/interfaces/IAdProps'
import { adRemove } from '@/app/storage/ad/adRemove'
import { adsGetAll } from '@/app/storage/ad/AdsGetAll'
import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import Toast from 'react-native-toast-message'

import { Alert, TouchableOpacityProps } from 'react-native'
import { useAds } from '@/hooks/useAds'

interface ICardItemProps extends TouchableOpacityProps {
  name: string
  office: string
  id: string
}

export function MyItemCard({ name, office, id, ...props }: ICardItemProps) {
  const { handleRemoveAd } = useAds()

  return (
    <StyledTouchableOpacity
      {...props}
      className='flex-2 flex-col bg-gray-200 p-2 border-2 mx-2 border-gray-300 rounded-xl'
    >
      <StyledView className='flex-2 items-center justify-center p-4 rounded-xl'>
        <Ionicons name='person' size={24} color='gray-300' />
      </StyledView>
      <StyledView className='flex-1 flex-col'>
        <StyledText className='text-center font-bold text-xl'>
          {name}
        </StyledText>
        <StyledText className='text-center text-sm'>{office}</StyledText>
      </StyledView>
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
        className='flex-2 flex-row justify-center items-center p-2 rounded-xl'
      >
        <Ionicons name='trash' size={24} color='red' />
        <StyledText className='text-lg font-bold text-red-500'>
          {' '}
          {'Remover'}
        </StyledText>
      </StyledTouchableOpacity>
    </StyledTouchableOpacity>
  )
}
