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
import { Tag } from './Tag'
import {
  StyledScrollView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '@/app/styled'

interface IFilterMenuProps {
  visible: boolean
  onClose: any
  filterMenu: boolean
  setFilterMenu: (visible: boolean) => void
  sheetHeight: number
}

export function FilterMenu({
  visible,
  onClose,
  sheetHeight,
}: IFilterMenuProps) {
  const translateY = useSharedValue(0)
  const [isSelected, setIsSelected] = useState(false)

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
              <Tag
                text='Prestador de serviço'
                onPress={() => setIsSelected(!isSelected)}
                backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
              />
              <Tag
                text='Estabelecimento'
                onPress={() => setIsSelected(!isSelected)}
                backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
              />
            </StyledView>

            <Title text='Atendimento' />

            <StyledScrollView
              horizontal
              className='flex-2 flex-grow-0 flex-row'
            >
              <Tag
                text='À domicílio'
                onPress={() => setIsSelected(!isSelected)}
                backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
              />
              <Tag
                text='No estabelecimento'
                onPress={() => setIsSelected(!isSelected)}
                backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
              />
              <Tag
                text='Remoto'
                onPress={() => setIsSelected(!isSelected)}
                backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
              />
            </StyledScrollView>
            <StyledView className='flex-2 flex-row justify-between py-4'>
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
