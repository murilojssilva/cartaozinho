import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface ICardItemProps {
  name: string
  office: string
  officeType: string

  category: string[]
}

export function CardItem({
  name,
  office,
  officeType,
  category,
}: ICardItemProps) {
  return (
    <View className='flex-1 flex-col gap-0 bg-gray-200 p-4 mb-4 w-full'>
      <View className='flex-1 flex-row'>
        <View className='flex-1 flex-row justify-between items-center'>
          <View className='flex-1 flex-row gap-2'>
            <View className='flex-2 items-center justify-center bg-gray-300 p-2 rounded-xl'>
              <Ionicons name='person' size={32} color='gray-300' />
            </View>
            <View className='flex-1 flex-col'>
              <Text className='font-bold text-xl'>{name}</Text>
              <Text className='font-semibold text-sm'>{office}</Text>
              <Text className='font-normal text-xs'>{officeType}</Text>
            </View>
          </View>
          <Ionicons name='bookmark' size={28} color='gray-300' />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        className='flex-2 flex-row gap-2'
      >
        {category.map((cat, index) => (
          <View
            key={index}
            className='flex-2  flex-row py-2 px-4 bg-gray-600 rounded-full'
          >
            <Text className='text-gray-100 text-xs'>{cat}</Text>
          </View>
        ))}
      </ScrollView>
      <View className='flex-1 justify-center flex-row gap-2'>
        <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-xl bg-gray-300 p-2'>
          <Ionicons name='call' size={14} color='gray-300' />
          <Text className='font-bold text-sm'>Telefone</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-xl bg-green-300 p-2'>
          <FontAwesome name='whatsapp' size={14} color='gray-300' />
          <Text className='font-bold text-sm'> WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-xl bg-blue-300 p-2'>
          <FontAwesome name='telegram' size={14} color='gray-300' />
          <Text className='font-bold text-sm'> Telegram</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
