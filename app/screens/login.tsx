import { useState } from 'react'
import { Platform } from 'react-native'
import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import { useNavigation } from 'expo-router'
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'
import { TabHeader } from '@/components/TabHeader'
import { useAuthForm } from '@/hooks/useAuthForm'

export function Login() {
  const { formValues, isLoading, handleChange, handleLogin } = useAuthForm({
    email: '',
    password: '',
  })
  const navigation = useNavigation()

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100 justify-center'
    >
      <TabHeader text='Cartãozinho' icon='home' />
      <StyledScrollView className='p-4  flex-grow'>
        <StyledView className=' flex-col p-4 gap-2'>
          <StyledText className='font-bold text-xl'>
            Acesse sua conta
          </StyledText>
          <InputText
            text='E-mail'
            value={formValues.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType='email-address'
          />

          <InputText
            text='Senha'
            value={formValues.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
          />
        </StyledView>
      </StyledScrollView>
      <StyledView className='flex-2 bg-gray-100'>
        <StyledView className='p-4'>
          <ActionButton
            backgroundColor='gray-100'
            textColor='black'
            text='Criar conta'
            icon='log-in-outline'
            iconColor='black'
            onPress={() => navigation.navigate('SignUp')}
          />
        </StyledView>
        <StyledView className='p-4'>
          {isLoading ? (
            <SpinnerButton />
          ) : (
            <ActionButton
              backgroundColor='cyan-700'
              textColor='gray-100'
              iconColor='white'
              text='Acessar'
              icon='log-in'
              onPress={handleLogin}
            />
          )}
        </StyledView>
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
