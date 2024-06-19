import { FontAwesome5 } from '@expo/vector-icons'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface IActionButtonProps extends TouchableOpacityProps {
  text: string
  icon: string
}

export function ActionButton({ text, icon, ...props }: IActionButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className='flex-2 flex-row justify-center items-center bg-cyan-700 p-4 rounded-xl'
    >
      <FontAwesome5 size={20} color='white' name={icon} />
      <Text className='font-bold text-xl text-gray-100 '>{` ${text}`}</Text>
    </TouchableOpacity>
  )
}
