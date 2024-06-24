import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

export function EmptyList() {
  const navigation = useNavigation()
  return (
    <View className='flex-2 flex-col items-center p-8 gap-2'>
      <FontAwesome5 name='clipboard-list' size={32} color='#0e7490' />
      <Text className='font-bold text-xl'>Não há anúncios cadastrados</Text>
      <TouchableOpacity onPress={() => navigation.navigate('new')}>
        <View className='flex-2 flex-row items-center'>
          <FontAwesome5 size={10} name='plus' />
          <Text className='font-normal text-lg'> Crie um novo anúncio</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
