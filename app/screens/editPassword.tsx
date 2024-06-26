import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { styled } from 'nativewind'
import { useNavigation } from 'expo-router'

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledText = styled(Text)

export default function EditPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
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
            onPress={() => navigation.navigate('Profile')}
          />
        )}
      </StyledView>
    </StyledView>
  )
}
