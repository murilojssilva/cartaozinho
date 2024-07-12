import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { Platform } from 'react-native'

import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'
import { useUser } from '../context/UserContext'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useState } from 'react'
import { TextInputMask } from 'react-native-masked-text'

export function EditProfile() {
  const { user } = useUser()

  const { formValues, handleChange, handleEditProfile, isLoading } =
    useAuthForm({
      name: user?.name as string,
      lastName: user?.lastName as string,
      phone: user?.phone as string,
      email: user?.email as string,
    })

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
            <InputText
              text='Nome'
              value={formValues.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            <InputText
              text='Sobrenome'
              value={formValues.lastName}
              onChangeText={(text) => handleChange('lastName', text)}
            />

            <TextInputMask
              placeholder='(00) 0000-0000'
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              keyboardType='phone-pad'
              value={formValues.phone}
              onChangeText={(text) => handleChange('phone', text)}
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />

            <InputText
              text='E-mail'
              value={formValues.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType='email-address'
            />
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
            onPress={handleEditProfile}
            icon='save'
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
