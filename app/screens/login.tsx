import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { styled } from 'nativewind'
import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import icon from '@/assets/images/icon.png'
import { useNavigation } from 'expo-router'

const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100 justify-center'
    >
      <StyledScrollView className='p-4  flex-grow'>
        <StyledImage source={icon} className='flex-2 w-full h-32' />
        <StyledView className=' flex-col p-4 gap-2'>
          <StyledText className='font-bold text-xl'>
            Acesse sua conta
          </StyledText>
          <InputText text='E-mail' />
          <InputText text='Senha' />
        </StyledView>
      </StyledScrollView>
      <StyledView className='flex-2 bg-white'>
        <StyledView className='p-4'>
          <ActionButton
            backgroundColor='white'
            textColor='black'
            text='Criar conta'
            icon='log-in-outline'
            iconColor='black'
            onPress={() => navigation.navigate('Auth', { screen: 'signUp' })}
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
              onPress={() => navigation.navigate('App', { screen: 'Home' })}
            />
          )}
        </StyledView>
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
