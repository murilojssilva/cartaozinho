import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { RadioButton } from './RadioButton'

import { useEffect } from 'react'
import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'

interface IOrderMenuProps {
  visible: boolean
  onClose: () => void
  setOrderMenu: (visible: boolean) => void
  option: string
  orderMenu: boolean
  setOption: (option: string) => void
  sheetHeight: number
}

export function OrderMenu({
  visible,
  onClose,
  option,
  setOption,
  orderMenu,
  sheetHeight,
}: IOrderMenuProps) {
  const translateY = useSharedValue(0)

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
          const maxTranslation = sheetHeight
          const newTranslateY =
            translateY.value + event.nativeEvent.translationY
          translateY.value = Math.max(
            0,
            Math.min(maxTranslation, newTranslateY)
          )
        }}
        onEnded={(event: any) => {
          const maxTranslation = sheetHeight
          if (event.nativeEvent.translationY > maxTranslation / 3) {
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
          <StyledView className='flex-2 h-2 py-1 rounded-xl w-8 self-center justify-center bg-gray-400' />

          <StyledView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <StyledView style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='swap-vertical-sharp' size={24} />
              <StyledText className='font-bold text-xl'>{' Ordem'}</StyledText>
            </StyledView>
            <StyledTouchableOpacity onPress={onClose}>
              <Ionicons size={32} color='#9CA3AF' name='close' />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className='flex-2 flex-col'>
            <StyledView>
              {options.map((optionItem) => (
                <RadioButton
                  key={optionItem.value}
                  label={optionItem.label}
                  value={optionItem.value}
                  selected={option === optionItem.value}
                  onSelect={() => setOption(optionItem.value)}
                />
              ))}
            </StyledView>
          </StyledView>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}
