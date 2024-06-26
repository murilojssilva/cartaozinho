import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

import { styled } from 'nativewind'

const StyledText = styled(Text)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

export function EmptyList() {
  const navigation = useNavigation()
  return (
    <StyledView className='flex-2 flex-col items-center p-8 gap-2'>
      <FontAwesome5 name='clipboard-list' size={32} color='#0e7490' />
      <StyledText className='font-bold text-xl'>
        Não há anúncios cadastrados
      </StyledText>
      <StyledTouchableOpacity onPress={() => navigation.navigate('new')}>
        <StyledView className='flex-2 flex-row items-center'>
          <FontAwesome5 size={10} name='plus' />
          <StyledText className='font-normal text-lg'>
            {' '}
            Crie um novo anúncio
          </StyledText>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  )
}
