import { StyledView } from '@/app/styled'

export function SkeletonCardAd() {
  return (
    <StyledView className='flex-2 h-36 w-[47%] my-2 bg-gray-300 rounded-xl '>
      <StyledView className='flex-2 animate-pulse bg-gray-200 rounded-xl' />
    </StyledView>
  )
}
