import { View } from 'react-native'

interface ISkeletonInputTextProps {
  inputSize: number
}

export function SkeletonInputText({ inputSize }: ISkeletonInputTextProps) {
  return (
    <View className={`flex-1 bg-gray-300 p-${inputSize} rounded-xl my-2`}>
      <View className='flex-1 bg-gray-200 animate-pulse  rounded-xl' />
    </View>
  )
}
