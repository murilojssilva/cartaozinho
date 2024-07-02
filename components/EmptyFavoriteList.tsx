import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

export function EmptyFavoriteList() {
  const navigation = useNavigation()
  return (
    <StyledView className='flex-2 flex-col items-center p-8 gap-2'>
      <FontAwesome5 name='list' size={32} color='#0e7490' />
      <StyledText className='font-bold text-xl text-center'>
        Não há anúncios favoritados
      </StyledText>
      <StyledTouchableOpacity onPress={() => navigation.navigate('Home')}>
        <StyledView className='flex-2 flex-row items-center'>
          <FontAwesome5 size={10} name='eye' />
          <StyledText className='font-normal text-lg'>
            {' '}
            Veja os anúncios disponíveis
          </StyledText>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  )
}
