import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonTag() {
  const backgroundColor = useColorSkeletonTransition()
  return (
    <StyledAnimatedView
      className='flex-2 flex-row py-3 px-4 w-28 mx-2  rounded-full'
      style={{ backgroundColor }}
    />
  )
}
