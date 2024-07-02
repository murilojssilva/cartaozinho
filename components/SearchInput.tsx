import { StyledTextInput, StyledView } from '@/app/styled'
import { FontAwesome5 } from '@expo/vector-icons'
import { TextInputProps } from 'react-native'

interface IInputTextProps extends TextInputProps {
  text: string
}

export function SearchInput({ text = '', ...props }: IInputTextProps) {
  return (
    <StyledView className='flex-2 flex-row bg-gray-200 py-4 px-6 rounded-xl items-center'>
      <FontAwesome5 size={18} color='white' name='search' />
      <StyledTextInput
        {...props}
        textBreakStrategy='highQuality'
        className='font-bold text-gray-900'
      >
        {` ${text}`}
      </StyledTextInput>
    </StyledView>
  )
}
