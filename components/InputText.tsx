import { Text, TextInput, TextInputProps } from 'react-native'

interface IInputTextProps extends TextInputProps {
  text: string
}

export function InputText({ text, ...props }: IInputTextProps) {
  return (
    <TextInput
      {...props}
      placeholder={text}
      textBreakStrategy='highQuality'
      className='bg-gray-200 p-4 rounded-xl flex-1 font-bold text-gray-900'
    />
  )
}
