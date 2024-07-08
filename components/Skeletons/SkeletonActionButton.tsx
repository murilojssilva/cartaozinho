import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonActionButton() {
  const backgroundColor = useColorSkeletonTransition()
  return (
    <StyledAnimatedView
      className='flex-1 flex-row py-8 mx-2 rounded-xl'
      style={{ backgroundColor }}
    />
  )
}
