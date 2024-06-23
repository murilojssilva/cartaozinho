import { View } from 'react-native'

export function SkeletonProfileIcon() {
  return (
    <View className='justify-center bg-gray-300 p-4 self-center items-center mb-4 w-40 h-40 rounded-full border-4 border-gray-400'>
      <View className='justify-center animate-pulse bg-gray-200 p-4 self-center items-center w-40 h-40 rounded-full' />
    </View>
  )
}
