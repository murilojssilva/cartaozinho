import { View } from 'react-native'

export function SkeletonCardAd() {
  return (
    <View className='flex-1 h-40 w-1/4 bg-gray-200 mx-2 rounded-xl border-2 border-gray-400'>
      <View className='flex-1 animate-pulse bg-gray-300 rounded-xl' />
    </View>
  )
}
