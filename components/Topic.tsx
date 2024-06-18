import { FontAwesome5 } from '@expo/vector-icons'
import { ReactElement } from 'react'
import { Text, View } from 'react-native'

interface ITopicProps {
  name: string
  content: string
  icon: ReactElement
}

export function Topic({ name, content, icon }: ITopicProps) {
  return (
    <View className='flex-2 flex-row justify-between px-2 mb-2 border-l-4 border-l-cyan-700'>
      <View className='flex-2 flex-row items-center '>
        <View className='w-8 h-8 flex-2 items-center justify-center'>
          <FontAwesome5 name={icon} size={22} color='gray-300' />
        </View>
        <Text className='text-gray-900 text-lg font-bold'>{name}</Text>
      </View>
      <Text className='text-gray-700 text-lg font-semibold'>{content}</Text>
    </View>
  )
}
