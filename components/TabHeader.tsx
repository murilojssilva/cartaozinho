import { FontAwesome5 } from '@expo/vector-icons'
import { Text, View } from 'react-native'

interface ITabHeaderProps {
  text: string
  icon: string
}

export function TabHeader({ text, icon }: ITabHeaderProps) {
  return (
    <View className='flex-2 flex-row justify-center gap-2 items-center bg-gray-100 p-8 rounded-xl'>
      <FontAwesome5 name={icon} size={22} />
      <Text className='text-xl text-gray-700 font-semibold'>{text}</Text>
    </View>
  )
}
