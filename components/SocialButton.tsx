import { FontAwesome5 } from '@expo/vector-icons'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

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
    <TouchableOpacity
      {...props}
      className={`flex-1 flex-row items-center justify-center rounded-xl bg-${color} p-2`}
    >
      <FontAwesome5 name={icon} size={14} color='gray-300' />
      <Text className='font-bold text-sm'> {text}</Text>
    </TouchableOpacity>
  )
}
