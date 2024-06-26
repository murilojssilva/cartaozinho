import { View } from 'react-native'
import { styled } from 'nativewind'

const StyledView = styled(View)

export function SkeletonProfileIcon() {
  return (
    <StyledView className='justify-center bg-gray-300 p-4 self-center items-center mb-4 w-40 h-40 rounded-full border-4 border-gray-400'>
      <StyledView className='justify-center animate-pulse bg-gray-200 p-4 self-center items-center w-40 h-40 rounded-full' />
    </StyledView>
  )
}
