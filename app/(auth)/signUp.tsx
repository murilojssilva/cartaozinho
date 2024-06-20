import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { useNavigation } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

export default function SignUp() {
  const navigation = useNavigation()
  return (
    <View className='flex-1 bg-white'>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className='p-4'
      >
        <View className=' flex-col p-4 gap-2'>
          <Text className='font-bold text-xl'>Digite sua senha</Text>
          <InputText text='Senha antiga' />
          <InputText text='Nova senha' />
        </View>
      </ScrollView>
      <View className='p-4'>
        <ActionButton
          backgroundColor='cyan-800'
          textColor='gray-100'
          text='Alterar senha'
          icon='chevron-right'
          onPress={() => navigation.navigate('signUp')}
        />
      </View>
    </View>
  )
}
