import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonText() {
  const backgroundColor = useColorSkeletonTransition()
  return (
    <StyledAnimatedView
      className='flex-2 h-8 my-2'
      style={{ backgroundColor }}
    />
  )
}
