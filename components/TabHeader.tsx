import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'

interface ITabHeaderProps extends TouchableOpacityProps {
  text: string
  icon: string
  iconAction?: string
  iconActionColor?: string
}

export function TabHeader({
  text,
  icon,
  iconAction,
  iconActionColor = 'black',
  ...props
}: ITabHeaderProps) {
  return (
    <StyledView
      className={`flex-2 flex-row justify-${
        iconAction ? 'between' : 'center'
      } gap-2 items-center bg-gray-100 p-8`}
    >
      <StyledView className='flex-2 flex-row items-center'>
        <FontAwesome5 name={icon} size={22} color='#0e7490' />
        <StyledText className='text-2xl text-gray-700 font-semibold'>{` ${text}`}</StyledText>
      </StyledView>
      <StyledTouchableOpacity {...props}>
        <AntDesign name={iconAction} size={22} color={iconActionColor} />
      </StyledTouchableOpacity>
    </StyledView>
  )
}
