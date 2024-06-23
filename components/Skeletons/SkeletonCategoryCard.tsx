import { View } from 'react-native'

interface ISkeletonCategoryCardProps {
  heightSize: number
}

export function SkeletonCategoryCard({
  heightSize,
}: ISkeletonCategoryCardProps) {
  return (
    <View className={`bg-gray-300 p-4 h-${heightSize} rounded-xl mb-4`}>
      <View className='bg-gray-200 animate-pulse rounded-xl mb-4' />
    </View>
  )
}
