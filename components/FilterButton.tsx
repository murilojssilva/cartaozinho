import Ionicons from '@expo/vector-icons/Ionicons'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface IFilterButtonProps extends TouchableOpacityProps {}

export function FilterButton({ ...props }: IFilterButtonProps) {
  return (
    <View className='flex-1 flex-row mb-4'>
      <TouchableOpacity
        {...props}
        className='flex-2 flex-row justify-center items-center bg-gray-300 py-2 px-4 rounded-xl'
      >
        <Ionicons name='filter' size={20} />
        <Text className='font-bold text-lg'> Filtros</Text>
      </TouchableOpacity>
    </View>
  )
}
