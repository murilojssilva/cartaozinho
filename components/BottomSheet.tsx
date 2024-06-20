import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'

const BottomSheet = ({ visible, onClose }) => {
  const translateY = useSharedValue(0)
  const sheetHeight = 300 // Height of your bottom sheet

  useEffect(() => {
    translateY.value = visible ? withSpring(0) : withSpring(sheetHeight)
  }, [visible])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <GestureHandlerRootView className={'flex-1 justify-end'}>
      <PanGestureHandler
        onGestureEvent={(event: any) => {
          if (event.nativeEvent.translationY > 0) {
            translateY.value = withSpring(event.nativeEvent.translationY)
          }
        }}
        onEnded={(event: any) => {
          if (event.nativeEvent.translationY > sheetHeight / 3) {
            onClose()
          } else {
            translateY.value = withSpring(0)
          }
        }}
      >
        <Animated.View
          style={[
            'bg-white rounded-t-xl p-4',
            { height: sheetHeight },
            animatedStyle,
          ]}
        >
          <View className={'w-full h-1 bg-gray-300 rounded-full mb-4'} />
          <Text className={'text-xl font-bold mb-4'}>Bottom Sheet</Text>
          <Text className={'text-base mb-4'}>
            This is a bottom sheet component with TailwindCSS styling in React
            Native.
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={'bg-blue-500 p-4 rounded-xl'}
          >
            <Text style={'text-white text-center font-bold'}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}

export default BottomSheet
