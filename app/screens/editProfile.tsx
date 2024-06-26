import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { useState } from 'react'
import { Platform } from 'react-native'

import { useNavigation } from 'expo-router'
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white'
    >
      <Header title='Editar perfil' icon='user' />

      <StyledScrollView className='p-4  flex-grow'>
        <StyledView className='flex-col gap-2 '>
          <StyledText className='font-bold text-xl my-4'>
            Informações de perfil
          </StyledText>
          <StyledView className='gap-2'>
            <InputText text='Nome' placeholder='Nome' />
            <InputText
              text='Descrição'
              numberOfLines={3}
              multiline={true}
              textAlignVertical='top'
              placeholder='Descrição'
            />
          </StyledView>

          <StyledText className='font-bold text-xl my-4'>Contato</StyledText>
          <StyledView className='gap-2'>
            <InputText
              text='Telefone'
              keyboardType='numeric'
              placeholder='(21)9999-9999'
            />
            <InputText
              text='WhatsApp'
              keyboardType='numeric'
              placeholder='(21)9999-9999'
            />
            <InputText text='E-mail' placeholder='email@email.com' />
          </StyledView>
        </StyledView>
      </StyledScrollView>
      <StyledView className='p-4'>
        {isLoading ? (
          <SkeletonActionButton />
        ) : (
          <ActionButton
            backgroundColor='cyan-700'
            textColor='white'
            iconColor='white'
            text='Editar perfil'
            onPress={() => navigation.navigate('Profile')}
            icon='save'
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
