import { View } from 'react-native'
import { styled } from 'nativewind'

const StyledView = styled(View)

export function SkeletonCardItem() {
  return <StyledView className='flex-2 h-40 animate-pulse bg-gray-300 my-2' />
}
