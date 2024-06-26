import { StyledView } from '@/app/styled'

interface ISkeletonInputTextProps {
  inputSize: number
}

export function SkeletonInputText({ inputSize }: ISkeletonInputTextProps) {
  return (
    <StyledView className={`flex-1 bg-gray-300 p-${inputSize} rounded-xl my-2`}>
      <StyledView className='flex-1 bg-gray-200 animate-pulse  rounded-xl' />
    </StyledView>
  )
}
