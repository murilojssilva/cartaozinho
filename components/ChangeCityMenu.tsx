import { useEffect, useState } from 'react'
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
import { Title } from './Title'
import {
  StyledKeyboardAvoidingView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '@/app/styled'
import { InputText } from './InputText'
import useGetCity from '@/hooks/useGetCity'
import { Alert, Keyboard, Platform } from 'react-native'
import { ActionButton } from './ActionButton'

interface IChangeCityMenuProps {
  visible: boolean
  onClose: any
  sheetHeight: number
  onCitySelected: (city: string, state: string) => void
}

export function ChangeCityMenu({
  visible,
  onClose,
  sheetHeight,
  onCitySelected,
}: IChangeCityMenuProps) {
  const translateY = useSharedValue(0)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [inputCity, setInputCity] = useState('')

  const { getCurrentLocation, fetchCity, city, state } = useGetCity()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  useEffect(() => {
    translateY.value = visible ? withSpring(0) : withSpring(sheetHeight)
  }, [visible, sheetHeight])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const handleCityChange = (input: string) => {
    setInputCity(input)
  }

  const handleSearchCity = () => {
    fetchCity(inputCity)
  }

  const handleSaveCity = () => {
    if (city && state) {
      onCitySelected(city, state)
      onClose()
    } else {
      Alert.alert('Nenhuma cidade selecionada')
    }
  }

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
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
                height: sheetHeight + keyboardHeight,
                backgroundColor: '#F3F4F6',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 16,
              },
              animatedStyle,
            ]}
          >
            <StyledView
              style={{
                height: 4,
                width: 32,
                alignSelf: 'center',
                backgroundColor: '#9CA3AF',
                borderRadius: 2,
                marginBottom: 16,
              }}
            />

            <StyledView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <StyledView className='flex-2 flex-row items-center'>
                <FontAwesome5 name='building' size={24} />
                <StyledText className='font-bold text-xl'> Cidade</StyledText>
              </StyledView>
              <StyledTouchableOpacity onPress={onClose}>
                <Ionicons size={32} color='#9CA3AF' name='close' />
              </StyledTouchableOpacity>
            </StyledView>

            <StyledView style={{ flex: 1 }}>
              <Title text='Digite o nome da cidade' />
              <StyledView className='flex-2 flex-col'>
                <StyledView className='flex-2 flex-row'>
                  <InputText
                    text='Cidade'
                    placeholder='Digite a cidade'
                    onChangeText={handleCityChange}
                  />
                  <StyledTouchableOpacity
                    onPress={handleSearchCity}
                    className='flex-2 bg-cyan-700 items-center justify-center ml-2 p-4 rounded-xl'
                  >
                    <FontAwesome5 name='search' color='white' size={26} />
                  </StyledTouchableOpacity>
                  <StyledTouchableOpacity
                    onPress={getCurrentLocation}
                    className='flex-2 bg-cyan-700 items-center justify-center ml-2 p-4 rounded-xl'
                  >
                    <FontAwesome5 name='map-pin' color='white' size={26} />
                  </StyledTouchableOpacity>
                </StyledView>

                {city && state ? (
                  <StyledView className='flex-2 flex-row my-2 items-center'>
                    <FontAwesome5 name='map-pin' size={22} />
                    <StyledText className='font-bold text-xl'>{` ${city} - ${state}`}</StyledText>
                  </StyledView>
                ) : (
                  <StyledView className='flex-2 flex-row my-2 items-center'>
                    <FontAwesome5 name='map-pin' size={22} />
                    <StyledText className='text-xl'>{` Pesquisando cidade...`}</StyledText>
                  </StyledView>
                )}
              </StyledView>
              <ActionButton
                text='Salvar'
                icon='save'
                backgroundColor='cyan-700'
                textColor='white'
                iconColor='white'
                onPress={handleSaveCity}
              />
            </StyledView>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </StyledKeyboardAvoidingView>
  )
}
