import { FontAwesome5 } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export default function Profile() {
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-2 flex-row justify-center gap-2 items-center bg-gray-100 p-8 rounded-xl'>
        <FontAwesome5 name='user' size={22} />
        <Text className='text-xl text-gray-700 font-semibold'>Perfil</Text>
      </View>
    </View>
  )
}
