import { StyledText, StyledTouchableOpacity } from '@/app/styled'
import { TouchableOpacityProps } from 'react-native'

interface ITagProps extends TouchableOpacityProps {
  text: string
  backgroundColor: string
}

export function Tag({
  text,
  backgroundColor = 'gray-600',
  ...props
}: ITagProps) {
  return (
    <StyledTouchableOpacity
      className={`flex-2 flex-row py-2 px-4 bg-${backgroundColor} rounded-full mx-1`}
      {...props}
    >
      <StyledText className='text-gray-100 text-xs'>{text}</StyledText>
    </StyledTouchableOpacity>
  )
}
