import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

export function EmptyFavoriteList() {
  const navigation = useNavigation()
  return (
    <View className='flex-2 flex-col items-center p-8 gap-2'>
      <FontAwesome5 name='list' size={32} color='blue' />
      <Text className='font-bold text-xl'>Não há anúncios favoritados</Text>
      <TouchableOpacity onPress={() => navigation.navigate('index')}>
        <Text className='font-normal text-sm'>
          Veja os anúncios disponíveis
        </Text>
      </TouchableOpacity>
    </View>
  )
}
