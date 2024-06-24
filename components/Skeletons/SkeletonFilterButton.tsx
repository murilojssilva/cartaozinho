import { View } from 'react-native'

export function SkeletonFilterButton() {
  return (
    <View className='flex-2 flex-row py-5 px-12 bg-gray-300 rounded-xl'>
      <View className='flex-2 flex-row animate-pulse bg-gray-200'></View>
    </View>
  )
}
