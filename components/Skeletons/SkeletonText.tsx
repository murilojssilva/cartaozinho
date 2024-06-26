import { View } from 'react-native'
import { styled } from 'nativewind'

const StyledView = styled(View)

export function SkeletonText() {
  return (
    <StyledView className='flex-1 h-8 bg-gray-200 my-2'>
      <StyledView className='flex-1 animate-pulse bg-gray-300' />
    </StyledView>
  )
}
