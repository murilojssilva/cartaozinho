import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function EditProfile() {
  const navigation = useNavigation()
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-2 flex-row justify-between items-center bg-gray-100 p-8 rounded-xl'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name='chevron-left' size={24} color='gray-300' />
        </TouchableOpacity>
        <View className='flex-2 flex-row items-center justify-center'>
          <FontAwesome5 name='user' size={22} />
          <Text className='text-xl text-gray-700 font-semibold'>
            {' Editar perfil'}
          </Text>
        </View>
      </View>
    </View>
  )
}
