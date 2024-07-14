import { StyledText, StyledView } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

export function EmptyUserList() {
  return (
    <StyledView className='flex-2 flex-col se items-center p-8 gap-2'>
      <FontAwesome5 name='clipboard-list' size={32} color='#0e7490' />
      <StyledText className='font-bold text-center text-xl'>
        {`Não há anúncios\ncadastrados para este usuário`}
      </StyledText>
    </StyledView>
  )
}
