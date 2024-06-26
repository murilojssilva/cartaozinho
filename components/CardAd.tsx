import { FontAwesome5 } from '@expo/vector-icons'
import { styled } from 'nativewind'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)

interface ICardAdProps extends TouchableOpacityProps {
  text: string
  icon: string
}

export function CardAd({ text, icon, ...props }: ICardAdProps) {
  return (
    <StyledTouchableOpacity
      className='flex-2 flex-col items-center w-[47%] h-50 justify-center border-2 border-gray-300 bg-gray-200 p-6 rounded-xl'
      {...props}
    >
      <FontAwesome5 name={icon} size={32} color='#0e7490' />
      <StyledText className='text-lg font-bold text-center'>{text}</StyledText>
    </StyledTouchableOpacity>
  )
}
