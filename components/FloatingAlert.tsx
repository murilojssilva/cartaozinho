import { useEffect } from 'react'
import { StyledText, StyledView } from '@/app/styled'
import { Feather } from '@expo/vector-icons'

interface IFloatingAlertProps {
  message: string
  visible: boolean
  setVisible: (visible: boolean) => void
}

export function FloatingAlert({
  message,
  visible,
  setVisible,
}: IFloatingAlertProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 30000000)

      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!visible) {
    return null
  }

  return (
    <StyledView
      className='absolute top-4 left-4 right-4 z-50 flex-2 flex-row bg-yellow-700 p-2 items-center justify-around rounded-xl'
      style={{ elevation: 5 }}
    >
      <Feather name='alert-triangle' size={26} color='white' />
      <StyledText className='font-bold text-lg ml-2'>{message}</StyledText>
    </StyledView>
  )
}
