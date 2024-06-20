import Ionicons from '@expo/vector-icons/Ionicons'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface IOrderButtonProps extends TouchableOpacityProps {}

export function OrderButton({ ...props }: IOrderButtonProps) {
  return (
    <View className='flex-1 flex-row mb-4 justify-end'>
      <TouchableOpacity
        {...props}
        className='flex-2 flex-row justify-center items-center bg-gray-300 py-2 px-4 rounded-xl'
      >
        <Ionicons name='swap-vertical-sharp' size={20} />
        <Text className='font-bold text-lg'> Ordenar</Text>
      </TouchableOpacity>
    </View>
  )
}
