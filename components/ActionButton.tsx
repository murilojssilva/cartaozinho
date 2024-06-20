import { FontAwesome5 } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

interface IActionButtonProps {
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
      className={`flex-2 flex-row justify-center items-center bg-${backgroundColor} p-4 rounded-xl`}
    >
      <FontAwesome5 size={20} color={textColor} name={icon} />
      <Text
        className={`font-bold text-xl text-${textColor}`}
      >{` ${text}`}</Text>
    </TouchableOpacity>
  )
}
