import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonMyItemCard() {
  const backgroundColor = useColorSkeletonTransition()
  return (
    <StyledAnimatedView
      className='flex-2 flex-col h-40 w-28 border-2 mx-2 border-gray-300 rounded-xl'
      style={{ backgroundColor }}
    />
  )
}
