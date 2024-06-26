import { StyledView } from '@/app/styled'

export function SkeletonProfileCard() {
  return (
    <StyledView className='flex-2 flex-col justify-between p-4 bg-gray-200 rounded-xl'>
      <StyledView className='flex-2 flex-col animate-pulse justify-between p-4 bg-gray-200 rounded-xl' />
    </StyledView>
  )
}
