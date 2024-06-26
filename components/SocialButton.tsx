import { FontAwesome5 } from '@expo/vector-icons'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { styled } from 'nativewind'

const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)

interface ISocialButtonProps extends TouchableOpacityProps {
  icon: string
  color: string
  text: string
}

export function SocialButton({
  icon,
  color,
  text,
  ...props
}: ISocialButtonProps) {
  return (
    <StyledTouchableOpacity
      {...props}
      className={`flex-1 flex-row items-center justify-center rounded-xl bg-${color} p-2`}
    >
      <FontAwesome5 name={icon} size={14} color='gray-300' />
      <StyledText className='font-bold text-sm'> {text}</StyledText>
    </StyledTouchableOpacity>
  )
}
