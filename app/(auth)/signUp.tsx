import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { Title } from '@/components/Title'
import { useNavigation } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

export default function SignUp() {
  const navigation = useNavigation()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100'
    >
      <ScrollView className='flex-2 p-4'>
        <View className=' flex-col p-4 gap-2'>
          <Title text='Informações pessoais' />
          <InputText text='Nome' />
          <InputText text='Telefone' />
          <InputText text='E-mail' />

          <Title text='Senha' />
          <InputText text='Senha' />
          <InputText text='Confirmar senha' />
        </View>
      </ScrollView>
      <View className='flex-2 bg-white'>
        <View className='flex-2 p-4'>
          <ActionButton
            backgroundColor='cyan-800'
            textColor='gray-900'
            text='Voltar'
            icon='chevron-left'
            onPress={() => navigation.goBack()}
          />
        </View>
        <View className='p-4'>
          <ActionButton
            backgroundColor='blue-500'
            textColor='white'
            text='Criar conta'
            icon='sign-in-alt'
            onPress={() => navigation.navigate('(tabs)')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
