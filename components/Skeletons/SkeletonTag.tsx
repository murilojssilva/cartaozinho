import { StyledView } from '@/app/styled'

export function SkeletonTag() {
  return (
    <StyledView className='flex-2 flex-row py-2 px-4 w-28 mx-2 bg-gray-300 rounded-full'>
      <StyledView className='flex-2 py-2 px-4 animate-pulse rounded-full' />
    </StyledView>
  )
}
