import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface IActionButtonProps extends TouchableOpacityProps {
  text: string
  icon: string
  backgroundColor: string
  textColor: string
  iconColor: string
}

export function ActionButton({
  icon,
  text,
  backgroundColor,
  textColor,
  iconColor,
  ...props
}: IActionButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={`flex-2 flex-row justify-center items-center p-4 rounded-xl bg-${backgroundColor}`}
    >
      <Ionicons size={20} color={iconColor} name={icon} />
      <Text
        className={`font-bold text-xl text-${textColor}`}
      >{` ${text}`}</Text>
    </TouchableOpacity>
  )
}
