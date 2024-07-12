import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { StyledScrollView, StyledText, StyledView } from '../styled'
import { useUser } from '../context/UserContext'
import { useAuthForm } from '@/hooks/useAuthForm'

export function EditPassword() {
  const { formValues, handleChange, handleEditPassword, isLoading } =
    useAuthForm({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })

  return (
    <StyledView className='flex-1 justify-center bg-white'>
      <Header title='Alterar senha' icon='lock' />
      <StyledScrollView className='p-4 flex-grow'>
        <StyledView className='flex-col p-4 gap-2'>
          <StyledText className='font-bold text-xl'>
            Digite sua senha
          </StyledText>
          <InputText
            text='Senha antiga'
            secureTextEntry
            value={formValues.currentPassword}
            onChangeText={(value) => handleChange('currentPassword', value)}
          />
          <InputText
            text='Nova senha'
            secureTextEntry
            value={formValues.newPassword}
            onChangeText={(value) => handleChange('newPassword', value)}
          />
          <InputText
            text='Confirme a nova senha'
            secureTextEntry
            value={formValues.confirmNewPassword}
            onChangeText={(value) => handleChange('confirmNewPassword', value)}
          />
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
