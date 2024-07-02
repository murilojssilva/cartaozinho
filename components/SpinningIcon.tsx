import React from 'react'
import { Animated } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons' // Certifique-se de ter expo/vector-icons instalado
import { useSpinAnimation } from '@/hooks/useSpinAnimation'

export function SpinningIcon({
  size = 22,
  color = 'white',
  name = 'spinner',
  duration = 1000,
}) {
  const spin = useSpinAnimation(duration)

  return (
    <Animated.View
      style={{
        flex: 2,
        alignItems: 'center',
        transform: [{ rotate: spin }],
      }}
    >
      <FontAwesome5 size={size} color={color} name={name} />
    </Animated.View>
  )
}
