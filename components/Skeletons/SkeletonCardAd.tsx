import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonCardAd() {
  const backgroundColor = useColorSkeletonTransition()

  return (
    <StyledAnimatedView
      className='flex-2 rounded-xl'
      style={{ backgroundColor }}
    />
  )
}
