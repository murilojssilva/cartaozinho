import { useState } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { styled } from 'nativewind'

const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)

interface IChangeCityButtonProps extends TouchableOpacityProps {}

export function ChangeCityButton({ ...props }: IChangeCityButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <StyledTouchableOpacity
      {...props}
      className='flex-1 bg-gray-300 h-14 rounded-r-xl justify-center items-center'
    >
      <StyledText className='font-bold text-xl'>
        {isLoading ? '' : 'Alterar cidade'}
      </StyledText>
    </StyledTouchableOpacity>
  )
}
