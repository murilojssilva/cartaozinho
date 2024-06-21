import { View } from 'react-native'

export function SkeletonMyItemCard() {
  return (
    <View className='flex-2 flex-col bg-gray-200 h-40 w-28 border-2 mx-2 border-gray-300 rounded-xl'>
      <View className='flex-2 flex-col bg-gray-300 animate-pulse mx-2 rounded-xl' />
    </View>
  )
}
