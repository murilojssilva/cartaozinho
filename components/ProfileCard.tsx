import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'

interface IProfileCardProps extends TouchableOpacityProps {
  icon: string
  title: string
  text: string
}

export function ProfileCard({
  icon,
  text,
  title,
  ...props
}: IProfileCardProps) {
  return (
    <StyledTouchableOpacity
      className='flex-2 flex-col justify-between p-4'
      {...props}
    >
      <StyledView className='flex-2 flex-row justify-center items-center'>
        <FontAwesome5 name={icon} size={16} />
        <StyledText className='font-bold text-sm text-gray-900'>
          {' '}
          {title}
        </StyledText>
      </StyledView>
      <StyledText className='text-xs text-gray-600 text-center'>
        {text}
      </StyledText>
    </StyledTouchableOpacity>
  )
}
