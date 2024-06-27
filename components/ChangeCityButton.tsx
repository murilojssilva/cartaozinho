import { StyledText, StyledTouchableOpacity } from '@/app/styled'
import { useState } from 'react'
import { TouchableOpacityProps } from 'react-native'

interface IChangeCityButtonProps extends TouchableOpacityProps {}

export function ChangeCityButton({ ...props }: IChangeCityButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <StyledTouchableOpacity
      {...props}
      className='flex-1 bg-gray-300 h-14 rounded-r-xl justify-center items-center'
    >
      <StyledText className='font-bold text-sm'>
        {isLoading ? '' : 'Alterar cidade'}
      </StyledText>
    </StyledTouchableOpacity>
  )
}
