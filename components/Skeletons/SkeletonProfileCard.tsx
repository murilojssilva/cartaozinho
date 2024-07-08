import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonProfileCard() {
  const backgroundColor = useColorSkeletonTransition()
  return (
    <StyledAnimatedView
      className='flex-2 flex-col justify-between p-4 rounded-xl'
      style={{ backgroundColor }}
    />
  )
}
