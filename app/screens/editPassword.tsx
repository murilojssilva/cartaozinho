import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { useState } from 'react'

import { useNavigation } from 'expo-router'
import { StyledScrollView, StyledText, StyledView } from '../styled'
import Toast from 'react-native-toast-message'

export function EditPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  function handleEditPassword() {
    try {
      setIsLoading(true)
      Toast.show({
        type: 'success',
        text1: 'Senha alterada com sucesso.',
      })
      navigation.navigate('Profile')
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao alterar a senha.',
        text2: error as string,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <StyledView className='flex-1 justify-center bg-white'>
      <Header title='Alterar senha' icon='lock' />
      <StyledScrollView className='p-4  flex-grow'>
        <StyledView className=' flex-col p-4 gap-2'>
          <StyledText className='font-bold text-xl'>
            Digite sua senha
          </StyledText>
          <InputText text='Senha antiga' />
          <InputText text='Nova senha' />
        </StyledView>
      </StyledScrollView>
      <StyledView className='p-4'>
        {isLoading ? (
          <SkeletonActionButton />
        ) : (
          <ActionButton
            backgroundColor='cyan-700'
            textColor='white'
            iconColor='white'
            text='Alterar senha'
            icon='lock-open'
            onPress={handleEditPassword}
          />
        )}
      </StyledView>
    </StyledView>
  )
}
