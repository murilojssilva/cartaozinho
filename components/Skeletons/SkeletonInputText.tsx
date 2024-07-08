import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

interface ISkeletonInputTextProps {
  inputSize: number
}

export function SkeletonInputText({ inputSize }: ISkeletonInputTextProps) {
  const backgroundColor = useColorSkeletonTransition()
  return (
    <StyledAnimatedView
      className={`flex-1 p-${inputSize} rounded-xl my-2`}
      style={{ backgroundColor }}
    />
  )
}
