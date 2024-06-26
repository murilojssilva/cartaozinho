import { StyledView } from '@/app/styled'

export function SkeletonActionButton() {
  return (
    <StyledView className='flex-1 flex-row py-8 mx-2 rounded-xl bg-gray-300'>
      <StyledView className='flex-1 flex-row animate-pulse rounded-xl bg-gray-200' />
    </StyledView>
  )
}
