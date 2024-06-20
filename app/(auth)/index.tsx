import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { useNavigation } from 'expo-router'
import icon from '@/assets/images/icon.png'

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'

export default function Login() {
  const navigation = useNavigation()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-gray-100'
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className='p-4'
      >
        <Image source={icon} className='flex-2 w-full h-32' />
        <View className=' flex-col p-4 gap-2'>
          <Text className='font-bold text-xl'>Acesse sua conta</Text>
          <InputText text='E-mail' />
          <InputText text='Senha' />
        </View>
      </ScrollView>
      <View className='flex-2 bg-white'>
        <View className='p-4'>
          <ActionButton
            backgroundColor='cyan-800'
            textColor='gray-900'
            text='Criar conta'
            icon='sign-in-alt'
            onPress={() => navigation.navigate('signUp')}
          />
        </View>
        <View className='p-4'>
          <ActionButton
            backgroundColor='blue-500'
            textColor='white'
            text='Acessar'
            icon='sign-in-alt'
            onPress={() => navigation.navigate('(tabs)')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
