import { StyledText, StyledTouchableOpacity } from '@/app/styled'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'

interface IActionButtonProps extends TouchableOpacityProps {
  text: string
  icon: string
  backgroundColor: string
  textColor: string
  iconColor: string
}

export function ActionButton({
  icon = '',
  text,
  backgroundColor,
  textColor,
  iconColor,
  ...props
}: IActionButtonProps) {
  return (
    <StyledTouchableOpacity
      {...props}
      className={`flex-2 flex-row justify-center items-center p-4 rounded-xl bg-${backgroundColor}`}
    >
      <Ionicons size={20} color={iconColor} name={icon} />
      <StyledText
        className={`font-bold text-md text-${textColor}`}
      >{` ${text}`}</StyledText>
    </StyledTouchableOpacity>
  )
}
