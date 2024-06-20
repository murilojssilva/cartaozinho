import Ionicons from '@expo/vector-icons/Ionicons'

import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { useNavigation } from 'expo-router'
import { SocialButton } from './SocialButton'

interface ICardItemProps extends TouchableOpacityProps {
  name: string
  office: string
}

export function MyItemCard({ name, office, ...props }: ICardItemProps) {
  return (
    <TouchableOpacity
      {...props}
      className='flex-2 flex-col bg-gray-200 p-4 rounded-xl gap-2'
    >
      <View className='flex-2 items-center justify-center bg-gray-300 p-4 rounded-xl'>
        <Ionicons name='person' size={32} color='gray-300' />
      </View>
      <View className='flex-1 flex-col'>
        <Text className='text-center font-bold text-xl'>{name}</Text>
        <Text className='text-center text-sm'>{office}</Text>
      </View>
      <TouchableOpacity className='flex-2 flex-row items-center bg-red-500 p-2 rounded-xl'>
        <Ionicons name='trash' size={24} color='white' />
        <Text className='text-lg font-bold text-cyan-100'> Remover</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
