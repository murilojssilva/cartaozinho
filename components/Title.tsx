import { Text } from 'react-native'

interface ITextProps {
  text: string
}

export function Title({ text }: ITextProps) {
  return <Text className='font-bold text-xl my-4'>{text}</Text>
}
