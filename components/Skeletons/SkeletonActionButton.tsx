import { View } from 'react-native'

export function SkeletonActionButton() {
  return (
    <View className='flex-1 flex-row py-8 mx-2 rounded-xl bg-gray-300'>
      <View className='flex-1 flex-row animate-pulse rounded-xl bg-gray-200' />
    </View>
  )
}
