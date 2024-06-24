import { View } from 'react-native'

export function SkeletonCardAd() {
  return (
    <View className='flex-2 h-36 w-[47%] my-2 bg-gray-300 rounded-xl '>
      <View className='flex-2 animate-pulse bg-gray-200 rounded-xl' />
    </View>
  )
}
