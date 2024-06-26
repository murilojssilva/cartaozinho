import { StyledText, StyledTouchableOpacity } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'

interface ICardAdProps extends TouchableOpacityProps {
  text: string
  icon: string
}

export function CardAd({ text, icon, ...props }: ICardAdProps) {
  return (
    <StyledTouchableOpacity
      className='flex-2 flex-col items-center w-[47%] h-32 justify-around border-2 border-gray-300 bg-gray-200 p-6 rounded-xl'
      {...props}
    >
      <FontAwesome5 name={icon} size={30} color='#0e7490' />
      <StyledText className='text-xs font-bold text-center'>{text}</StyledText>
    </StyledTouchableOpacity>
  )
}
