import { FontAwesome5 } from '@expo/vector-icons'
import { Text, View } from 'react-native'

interface IProfileCardProps {
  icon: string
  title: string
  text: string
}

export function ProfileCard({ icon, text, title }: IProfileCardProps) {
  return (
    <View className='flex-2 flex-col justify-between p-4'>
      <View className='flex-2 flex-row justify-center items-center'>
        <FontAwesome5 name={icon} size={16} />
        <Text className='font-bold text-xl text-gray-900'> {title}</Text>
      </View>
      <Text className='text-sm text-gray-600 text-center'>{text}</Text>
    </View>
  )
}
