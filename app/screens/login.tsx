import { useState } from 'react'
import { Platform } from 'react-native'
import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import mapa from '@/assets/images/mapa.jpg'
import { useNavigation } from 'expo-router'
import {
  StyledImage,
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100 justify-center'
    >
      <StyledScrollView className='p-4  flex-grow'>
        <StyledImage source={mapa} className='flex-2 w-full h-32' />
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
              onPress={() => navigation.navigate('App', { screen: 'Home' })}
            />
          )}
        </StyledView>
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
