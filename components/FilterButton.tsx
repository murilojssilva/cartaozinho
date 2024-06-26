import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacityProps } from 'react-native'

interface IFilterButtonProps extends TouchableOpacityProps {}

export function FilterButton({ ...props }: IFilterButtonProps) {
  return (
    <StyledView className='flex-1 flex-row mb-4'>
      <StyledTouchableOpacity
        {...props}
        className='flex-2 flex-row justify-center items-center bg-gray-300 py-2 px-4 rounded-xl'
      >
        <Ionicons name='filter' size={20} />
        <StyledText className='font-bold text-lg'> Filtros</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  )
}
