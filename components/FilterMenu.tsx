import { useEffect } from 'react'
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
import { Tag } from './Tag'
import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'

interface IFilterMenuProps {
  visible: boolean
  onClose: any
  filterMenu: boolean
  setFilterMenu: any
  sheetHeight: number
}

export function FilterMenu({
  visible,
  onClose,
  sheetHeight,
}: IFilterMenuProps) {
  const translateY = useSharedValue(0)

  useEffect(() => {
    translateY.value = visible ? withSpring(0) : withSpring(sheetHeight)
  }, [visible])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

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
            <StyledView style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='filter' size={32} />
              <StyledText
                style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 8 }}
              >
                Filtros
              </StyledText>
            </StyledView>
            <StyledTouchableOpacity onPress={onClose}>
              <Ionicons size={32} color='#9CA3AF' name='close' />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView style={{ flex: 1 }}>
            <Title text='Tipo' />
            <StyledView className='flex-2 flex-row'>
              <Tag backgroundColor='gray-600' text='Prestador de serviço' />
              <Tag backgroundColor='gray-600' text='Estabelecimento' />
            </StyledView>

            <Title text='Atendimento' />
            <StyledView className='flex-2 flex-row'>
              <Tag backgroundColor='gray-600' text='À domicílio' />
              <Tag backgroundColor='gray-600' text='No estabelecimento' />
              <Tag backgroundColor='gray-600' text='Remoto' />
            </StyledView>
            <StyledView className='flex-2 flex-row justify-around py-4'>
              <StyledTouchableOpacity
                className='flex-2 flex-row items-center py-3 px-8 rounded-xl bg-gray-300'
                onPress={() => {}}
              >
                <FontAwesome5 name='eraser' size={24} color='black' />
                <StyledText className='font-bold text-xl text-gray-900'>
                  {'  Limpar'}
                </StyledText>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity
                className='flex-2 flex-row items-center py-3 px-8 rounded-xl bg-cyan-700'
                onPress={() => {}}
              >
                <FontAwesome5 name='filter' size={24} color='white' />
                <StyledText className='font-bold text-xl text-white'>
                  {'  Filtrar'}
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}
