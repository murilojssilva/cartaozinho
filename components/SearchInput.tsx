import { StyledTextInput, StyledView } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { TextInputProps } from 'react-native'

interface IInputTextProps extends TextInputProps {
  text: string
}

export function SearchInput({ text, ...props }: IInputTextProps) {
  return (
    <StyledView className='flex-row items-center bg-gray-200 px-4 py-3 rounded-full'>
      <FontAwesome5 name='search' size={18} color='white' />
      <StyledTextInput
        {...props}
        placeholderTextColor='#9CA3AF'
        textBreakStrategy='highQuality'
        className='font-bold text-lg text-gray-900 flex-1 ml-2'
        value={text}
      />
    </StyledView>
  )
}
