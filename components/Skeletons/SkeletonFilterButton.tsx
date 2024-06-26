import { View } from 'react-native'
import { styled } from 'nativewind'

const StyledView = styled(View)

export function SkeletonFilterButton() {
  return (
    <StyledView className='flex-2 flex-row animate-pulse py-5 px-12 bg-gray-300 rounded-xl' />
  )
}
