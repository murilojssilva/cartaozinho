import { FontAwesome6 } from '@expo/vector-icons'
import { StyledText, StyledView } from '../styled'

interface IAddressInputProps {
  text: string
  value: string
  icon: 'clock' | 'pen'
}

export function TimeCard({ text, value, icon }: IAddressInputProps) {
  return (
    <StyledView className='flex-2 flex-row bg-gray-200 p-4 rounded-xl mb-4 justify-between items-center'>
      <StyledView>
        <StyledText className='font-bold text-xl mb-4'>{text}</StyledText>
        <StyledText className='text-sm text-gray-700 '>{value}</StyledText>
      </StyledView>
      <FontAwesome6 name={icon} size={22} color='#0e7490' />
    </StyledView>
  )
}
