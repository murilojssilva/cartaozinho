import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const useColorSkeletonTransition = (duration = 2000) => {
  const colorValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(colorValue, {
        toValue: 1,
        duration,
        useNativeDriver: false, // useNativeDriver: false é necessário para animação de cor
      })
    ).start()
  }, [colorValue, duration])

  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(229, 231, 235, 1)', 'rgba(209, 213, 219, 1)'], // gray-200 to gray-300
  })

  return backgroundColor
}
