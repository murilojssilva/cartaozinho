import { FontAwesome5 } from '@expo/vector-icons'
import { Text, View } from 'react-native'

import { styled } from 'nativewind'

const StyledText = styled(Text)
const StyledView = styled(View)

interface IProfileCardProps {
  icon: string
  title: string
  text: string
}

export function ProfileCard({ icon, text, title }: IProfileCardProps) {
  return (
    <StyledView className='flex-2 flex-col justify-between p-4'>
      <StyledView className='flex-2 flex-row justify-center items-center'>
        <FontAwesome5 name={icon} size={16} />
        <StyledText className='font-bold text-xl text-gray-900'>
          {' '}
          {title}
        </StyledText>
      </StyledView>
      <StyledText className='text-sm text-gray-600 text-center'>
        {text}
      </StyledText>
    </StyledView>
  )
}
