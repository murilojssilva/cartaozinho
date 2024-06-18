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
    <View className='flex-2 flex-row justify-between px-2'>
      <View className='flex-2 flex-row items-center gap-2'>
        <FontAwesome5 name={icon} size={22} color='gray-300' />
        <Text className='text-gray-900 text-lg font-bold'>{name}</Text>
      </View>
      <Text className='text-gray-700 text-lg font-semibold'>{content}</Text>
    </View>
  )
}
