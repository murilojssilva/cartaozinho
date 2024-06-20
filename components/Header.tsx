import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

interface IHeaderProps {
  title: string
  icon: string
}

export function Header({ title, icon }: IHeaderProps) {
  const navigation = useNavigation()

  return (
    <View className='flex-2 flex-row justify-between items-center bg-gray-100 p-8 rounded-xl'>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome5 name='chevron-left' size={24} color='gray-300' />
      </TouchableOpacity>
      <View className='flex-2 flex-row items-center justify-center'>
        <FontAwesome5 name={icon} size={22} />
        <Text className='text-xl text-gray-700 font-semibold'>{` ${title}`}</Text>
      </View>
    </View>
  )
}
