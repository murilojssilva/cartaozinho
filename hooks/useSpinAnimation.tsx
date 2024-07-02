import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

export function useSpinAnimation(duration = 1000) {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    spinAnimation.start()

    return () => spinAnimation.stop()
  }, [spinValue, duration])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return spin
}
