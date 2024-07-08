import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonProfileIcon() {
  const backgroundColor = useColorSkeletonTransition()

  return (
    <StyledAnimatedView
      className='justify-center p-4 self-center items-center mb-4 w-40 h-40 rounded-full border-4 border-gray-400'
      style={{ backgroundColor }}
    />
  )
}
