import { View } from 'react-native'

export function SkeletonText() {
  return (
    <View className='flex-1 h-8 bg-gray-200 my-2'>
      <View className='flex-1 animate-pulse bg-gray-300' />
    </View>
  )
}
