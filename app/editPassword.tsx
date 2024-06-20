import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { ScrollView, Text, View } from 'react-native'

export default function EditPassword() {
  return (
    <View className='flex-1 bg-white'>
      <Header title='Alterar senha' icon='lock' />
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
          icon='lock'
        />
      </View>
    </View>
  )
}
