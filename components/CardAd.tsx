import { FontAwesome5 } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

interface ICardAdProps {
  text: string
  icon: string
}

export function CardAd({ text, icon, ...props }: ICardAdProps) {
  return (
    <TouchableOpacity
      className='flex-2 flex-col items-center w-[47%] h-50 justify-center border-2 border-gray-300 bg-gray-200 p-6 rounded-xl'
      {...props}
    >
      <FontAwesome5 name={icon} size={32} color='#0e7490' />
      <Text className='text-lg font-bold text-center'>{text}</Text>
    </TouchableOpacity>
  )
}
