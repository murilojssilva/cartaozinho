import Ionicons from '@expo/vector-icons/Ionicons'

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface ICardItemProps extends TouchableOpacityProps {
  name: string
  office: string
}

export function MyItemCard({ name, office, ...props }: ICardItemProps) {
  return (
    <TouchableOpacity
      {...props}
      className='flex-2 flex-col bg-gray-200 p-2 border-2 border-gray-300 rounded-xl'
    >
      <View className='flex-2 items-center justify-center p-4 rounded-xl'>
        <Ionicons name='person' size={24} color='gray-300' />
      </View>
      <View className='flex-1 flex-col'>
        <Text className='text-center font-bold text-xl'>{name}</Text>
        <Text className='text-center text-sm'>{office}</Text>
      </View>
      <TouchableOpacity className='flex-2 flex-row justify-center items-center p-2 rounded-xl'>
        <Ionicons name='trash' size={24} color='red' />
        <Text className='text-lg font-bold text-red-500'> {'Remover'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
