import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonCardItem() {
  const backgroundColor = useColorSkeletonTransition()

  return (
    <StyledAnimatedView
      className='flex-2 h-40 my-2'
      style={{ backgroundColor }}
    />
  )
}
