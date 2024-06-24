import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native'

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white'
    >
      <Header title='Editar perfil' icon='user' />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className='p-4'
      >
        <View className='flex-col gap-2'>
          <Text className='font-bold text-xl my-4'>Informações de perfil</Text>
          <View className='gap-2'>
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
          <View className='gap-2'>
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
      </ScrollView>
      <View className='p-4'>
        {isLoading ? (
          <SkeletonActionButton />
        ) : (
          <ActionButton
            backgroundColor='cyan-700'
            textColor='white'
            text='Editar perfil'
            icon='save'
            className='mt-4'
          />
        )}
      </View>
    </KeyboardAvoidingView>
  )
}
