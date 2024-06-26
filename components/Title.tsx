import { StyledText } from '@/app/styled'

interface ITextProps {
  text: string
}

export function Title({ text }: ITextProps) {
  return <StyledText className='font-bold text-xl my-4'>{text}</StyledText>
}
