import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import { Title } from '@/components/Title'
import { Platform } from 'react-native'
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledView,
} from '../styled'
import { TextInputMask } from 'react-native-masked-text'
import { useAuthForm } from '@/hooks/useAuthForm'

export function SignUp() {
  const { formValues, isLoading, handleChange, handleSignUp } = useAuthForm({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100'
    >
      <StyledScrollView className='flex-2 p-4'>
        <StyledView className=' flex-col p-4 gap-2'>
          <Title text='Informações Pessoais' />
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

          <Title text='Senha' />
          <InputText
            text='Senha'
            value={formValues.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
          />
          <InputText
            text='Confirmar Senha'
            value={formValues.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry
          />
        </StyledView>
      </StyledScrollView>
      <StyledView className='flex-2 bg-gray-100 p-4'>
        {isLoading ? (
          <SpinnerButton />
        ) : (
          <ActionButton
            backgroundColor='cyan-700'
            iconColor='gray-100'
            textColor='white'
            text='Criar Conta'
            icon='log-in-outline'
            onPress={handleSignUp}
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
