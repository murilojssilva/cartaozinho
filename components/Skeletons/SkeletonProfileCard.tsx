import { View } from 'react-native'

export function SkeletonProfileCard() {
  return (
    <View className='flex-2 flex-col justify-between p-4 bg-gray-200 rounded-xl'>
      <View className='flex-2 flex-col animate-pulse justify-between p-4 bg-gray-200 rounded-xl' />
    </View>
  )
}
