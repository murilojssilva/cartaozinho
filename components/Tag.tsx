import { Text, View } from 'react-native'

interface ITagProps {
  text: string
}

export function Tag({ text }: ITagProps) {
  return (
    <View className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'>
      <Text className='text-gray-100 text-xs'>{text}</Text>
    </View>
  )
}
