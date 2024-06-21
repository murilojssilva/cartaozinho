import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { RadioButton } from './RadioButton'

interface IOrderMenuProps {
  visible: boolean
  onClose: any
  orderMenu: boolean
  setOrderMenu: any
}

export function OrderMenu({ visible, onClose }: IOrderMenuProps) {
  const [selectedValue, setSelectedValue] = useState(null)

  const translateY = useSharedValue(0)
  const sheetHeight = 220

  useEffect(() => {
    translateY.value = visible ? withSpring(0) : withSpring(sheetHeight)
  }, [visible])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const options = [
    { label: 'Alfabética', value: 'option1' },
    { label: 'Mais acessados', value: 'option2' },
  ]

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'flex-end' }}>
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
            {
              height: sheetHeight,
              backgroundColor: '#F3F4F6',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 16,
            },
            animatedStyle,
          ]}
        >
          <View
            style={{
              height: 4,
              width: 32,
              alignSelf: 'center',
              backgroundColor: '#9CA3AF',
              borderRadius: 2,
              marginBottom: 16,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='swap-vertical-sharp' size={32} />
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 8 }}>
                Ordem
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons size={32} color='#9CA3AF' name='close' />
            </TouchableOpacity>
          </View>

          <View className='flex-2 flex-col'>
            <View>
              {options.map((option) => (
                <RadioButton
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  selected={selectedValue === option.value}
                  onSelect={setSelectedValue}
                />
              ))}
            </View>
          </View>

          <View className='flex-2 flex-row justify-center items-end'>
            <TouchableOpacity
              className='flex-2 flex-row items-center py-3 px-8 rounded-xl bg-gray-300'
              onPress={() => {}}
            >
              <FontAwesome5 name='eraser' size={24} color='black' />
              <Text className='font-bold text-xl text-gray-900'>
                {'  Ordenar'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 16,
  },
})
