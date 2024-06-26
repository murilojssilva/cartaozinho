import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import { Title } from '@/components/Title'
import { useNavigation } from 'expo-router'
import { styled } from 'nativewind'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

const StyledView = styled(View)
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)
const StyledScrollView = styled(ScrollView)

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100'
    >
      <StyledScrollView className='flex-2 p-4'>
        <StyledView className=' flex-col p-4 gap-2'>
          <Title text='Informações pessoais' />
          <InputText text='Nome' />
          <InputText text='Telefone' />
          <InputText text='E-mail' />

          <Title text='Senha' />
          <InputText text='Senha' />
          <InputText text='Confirmar senha' />
        </StyledView>
      </StyledScrollView>
      <StyledView className='flex-2 bg-white p-4'>
        {isLoading ? (
          <SpinnerButton />
        ) : (
          <ActionButton
            backgroundColor='cyan-700'
            iconColor='white'
            textColor='white'
            text='Criar conta'
            icon='log-in-outline'
            onPress={() => navigation.navigate('App', { screen: 'Home' })}
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
