import { useEffect, useRef } from 'react'
import { Animated, Easing, TouchableOpacityProps } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { StyledTouchableOpacity } from '@/app/styled'

interface IActionButtonProps extends TouchableOpacityProps {}

export function SpinnerButton({ ...props }: IActionButtonProps) {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <StyledTouchableOpacity
      {...props}
      className='flex-2 flex-row justify-center items-center p-5 rounded-xl bg-gray-600'
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome5 size={20} color='white' name='spinner' />
      </Animated.View>
    </StyledTouchableOpacity>
  )
}
