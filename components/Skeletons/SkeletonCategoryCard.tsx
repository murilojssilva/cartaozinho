import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

interface ISkeletonCategoryCardProps {
  heightSize: number
}

export function SkeletonCategoryCard({
  heightSize,
}: ISkeletonCategoryCardProps) {
  const backgroundColor = useColorSkeletonTransition()
  return (
    <StyledAnimatedView
      className={` p-4 h-${heightSize} rounded-xl mb-4`}
      style={{ backgroundColor }}
    />
  )
}
