import { View } from 'react-native'

export function SkeletonCardItem() {
  return (
    <View className='flex-2 h-40 bg-gray-300 my-2'>
      <View className='flex-2 animate-pulse bg-gray-200' />
    </View>
  )
}
