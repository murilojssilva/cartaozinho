import { Ionicons } from '@expo/vector-icons'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { styled } from 'nativewind'

const StyledText = styled(Text)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

interface IOrderButtonProps extends TouchableOpacityProps {}

export function OrderButton({ ...props }: IOrderButtonProps) {
  return (
    <StyledView className='flex-1 flex-row mb-4 justify-end'>
      <StyledTouchableOpacity
        {...props}
        className='flex-2 flex-row justify-center items-center bg-gray-300 py-2 px-4 rounded-xl'
      >
        <Ionicons name='swap-vertical-sharp' size={20} />
        <StyledText className='font-bold text-lg'> Ordenar</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  )
}
