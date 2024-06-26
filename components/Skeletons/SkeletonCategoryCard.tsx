import { StyledView } from '@/app/styled'

interface ISkeletonCategoryCardProps {
  heightSize: number
}

export function SkeletonCategoryCard({
  heightSize,
}: ISkeletonCategoryCardProps) {
  return (
    <StyledView className={`bg-gray-300 p-4 h-${heightSize} rounded-xl mb-4`}>
      <StyledView className='bg-gray-200 animate-pulse rounded-xl mb-4' />
    </StyledView>
  )
}
