import { View } from 'react-native'
import { styled } from 'nativewind'

const StyledView = styled(View)

export function SkeletonProfileCard() {
  return (
    <StyledView className='flex-2 flex-col justify-between p-4 bg-gray-200 rounded-xl'>
      <StyledView className='flex-2 flex-col animate-pulse justify-between p-4 bg-gray-200 rounded-xl' />
    </StyledView>
  )
}
