import { StyledTextInput } from '@/app/styled'
import { TextInputProps } from 'react-native'

interface IInputTextProps extends TextInputProps {
  text: string
  editable?: boolean
}

export function InputText({
  text,
  editable = true,
  ...props
}: IInputTextProps) {
  return (
    <StyledTextInput
      {...props}
      placeholder={text}
      editable={editable}
      textBreakStrategy='highQuality'
      className={`bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-${
        editable ? 'gray-900' : 'gray-600'
      }`}
    />
  )
}
