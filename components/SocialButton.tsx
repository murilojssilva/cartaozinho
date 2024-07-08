import { StyledText, StyledTouchableOpacity } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'

interface ISocialButtonProps extends TouchableOpacityProps {
  icon: string
  backgroundColor: string
  text: string
  textColor: string
}

export function SocialButton({
  icon,
  backgroundColor,
  text,
  textColor,
  ...props
}: ISocialButtonProps) {
  return (
    <StyledTouchableOpacity
      {...props}
      className={`flex-1 flex-col items-center h-16 justify-around rounded-xl bg-${backgroundColor} mx-2 py-3`}
    >
      <FontAwesome5 name={icon} size={14} color={textColor} />
      <StyledText className={`text-[10px] text-${textColor}`}>
        {text}
      </StyledText>
    </StyledTouchableOpacity>
  )
}
