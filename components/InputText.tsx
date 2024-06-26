import { StyledTextInput } from '@/app/styled'
import { TextInputProps } from 'react-native'

interface IInputTextProps extends TextInputProps {
  text: string
}

export function InputText({ text, ...props }: IInputTextProps) {
  return (
    <StyledTextInput
      {...props}
      placeholder={text}
      textBreakStrategy='highQuality'
      className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
    />
  )
}
