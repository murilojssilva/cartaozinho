import { StyledText, StyledView } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { ReactElement } from 'react'

interface ITopicProps {
  name: string
  content: string
  icon: ReactElement | string
}

export function Topic({ name, content, icon }: ITopicProps) {
  return (
    <StyledView className='flex-2 flex-row justify-between px-2 mb-2 border-l-4 border-l-cyan-700'>
      <StyledView className='flex-2 flex-row items-center '>
        <StyledView className='w-8 h-8 flex-2 items-center justify-center'>
          <FontAwesome5 name={icon} size={22} color='gray-300' />
        </StyledView>
        <StyledText className='text-gray-900 text-lg font-bold'>
          {name}
        </StyledText>
      </StyledView>
      <StyledText className='text-gray-700 text-lg font-semibold'>
        {content}
      </StyledText>
    </StyledView>
  )
}
