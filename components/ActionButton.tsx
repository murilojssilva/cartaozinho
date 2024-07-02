import { StyledText, StyledTouchableOpacity } from '@/app/styled'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
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
  const ioniconsIcons = ['eraser']
  const IconComponent = ioniconsIcons.includes(icon) ? FontAwesome5 : Ionicons

  return (
    <StyledTouchableOpacity
      {...props}
      className={`flex-2 flex-row justify-center items-center p-4 rounded-xl bg-${backgroundColor}`}
    >
      <IconComponent size={16} color={iconColor} name={icon} />
      <StyledText
        className={`font-bold text-md text-${textColor}`}
      >{` ${text}`}</StyledText>
    </StyledTouchableOpacity>
  )
}
