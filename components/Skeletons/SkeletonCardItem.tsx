import { View } from 'react-native'

export function SkeletonCardItem() {
  return (
    <View className='flex-1 h-40 bg-gray-200 my-2'>
      <View className='flex-1 animate-pulse bg-gray-300' />
    </View>
  )
}
