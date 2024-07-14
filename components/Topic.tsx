import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { ReactElement } from 'react'
import { TouchableOpacityProps } from 'react-native'

interface ITopicProps extends TouchableOpacityProps {
  name: string
  content: string
  icon: ReactElement | string
}

export function Topic({ name, content, icon, ...props }: ITopicProps) {
  return (
    <StyledView className='flex-2 flex-row items-center justify-between mb-2 border-l-4 border-l-cyan-700'>
      <StyledView className='flex-2 flex-row justify-center items-center'>
        <StyledView className='flex-2 w-8 h-8 items-center justify-center'>
          <FontAwesome5 name={icon} size={14} color='gray-300' />
        </StyledView>
        <StyledText className='text-gray-900 text-sx font-bold'>
          {name}
        </StyledText>
      </StyledView>
      <StyledTouchableOpacity {...props}>
        <StyledText className='text-gray-700 text-sx'>{content}</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  )
}
