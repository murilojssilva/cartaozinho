import { Text } from 'react-native'

import { styled } from 'nativewind'

const StyledText = styled(Text)

interface ITextProps {
  text: string
}

export function Title({ text }: ITextProps) {
  return <StyledText className='font-bold text-xl my-4'>{text}</StyledText>
}
