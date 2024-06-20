import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { ScrollView, Text, View } from 'react-native'

export default function EditProfile() {
  return (
    <View className='flex-1 bg-white'>
      <Header title='Editar perfil' icon='user' />

      <ScrollView className='flex-2 p-4'>
        <View className='flex-2 flex-col p-4 gap-2'>
          <Text className='font-bold text-xl my-4'>Informações de perfil</Text>
          <View className='flex-2 gap-2'>
            <InputText text='Nome' placeholder='Nome' />
            <InputText
              text='Descrição'
              numberOfLines={4}
              multiline={true}
              textAlignVertical='top'
              className='justify-start'
              placeholder='Descrição'
            />
          </View>

          <Text className='font-bold text-xl my-4'>Contato</Text>
          <View className='flex-2 gap-2'>
            <InputText
              text='Telefone'
              keyboardAppearance='number'
              keyboardType='number'
              placeholder='(21)9999-9999'
            />
            <InputText
              text='WhatsApp'
              keyboardAppearance='number'
              keyboardType='number'
              placeholder='(21)9999-9999'
            />
            <InputText text='E-mail' placeholder='email@email.com' />
          </View>
        </View>

        <ActionButton text='Editar perfil' icon='save' />
      </ScrollView>
    </View>
  )
}
