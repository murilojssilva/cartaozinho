import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function ChangeCityButton() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <TouchableOpacity className='flex-1 bg-gray-300 h-14 rounded-r-xl justify-center items-center'>
      <Text className='font-bold text-xl'>
        {isLoading ? '' : 'Alterar cidade'}
      </Text>
    </TouchableOpacity>
  )
}
