import { View } from 'react-native'

export function SkeletonTag() {
  return (
    <View className='flex-2 flex-row py-2 px-4 w-28 mx-2 bg-gray-300 rounded-full'>
      <View className='flex-2 py-2 px-4 animate-pulse rounded-full' />
    </View>
  )
}
