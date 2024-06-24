import { useState } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ITagProps extends TouchableOpacityProps {
  text: string
  backgroundColor: string
}

export function Tag({
  text,
  backgroundColor = 'gray-600',
  ...props
}: ITagProps) {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <TouchableOpacity
      className={`flex-2 flex-row py-2 px-4 bg-${backgroundColor} rounded-full mx-1`}
      {...props}
    >
      <Text className='text-gray-100 text-xs'>{text}</Text>
    </TouchableOpacity>
  )
}
