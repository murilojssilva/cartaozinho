import { FontAwesome5 } from '@expo/vector-icons'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface IActionButtonProps extends TouchableOpacityProps {
  text: string
  icon: string
  backgroundColor: string
  textColor: string
}

export function ActionButton({
  icon,
  text,
  backgroundColor,
  textColor,
  ...props
}: IActionButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={`flex-2 flex-row justify-center items-center p-4 rounded-xl bg-${backgroundColor}`}
    >
      <FontAwesome5 size={20} color={textColor} name={icon} />
      <Text
        className={`font-bold text-xl text-${textColor}`}
      >{` ${text}`}</Text>
    </TouchableOpacity>
  )
}
