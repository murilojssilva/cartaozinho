import React, { useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
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

interface IBottomSheetProps {
  visible: boolean
  onClose: any
  filterMenu: boolean
  setFilterMenu: any
}

const BottomSheet = ({ visible, onClose }: IBottomSheetProps) => {
  const translateY = useSharedValue(0)
  const sheetHeight = 360

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
              <Ionicons name='filter' size={32} />
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 8 }}>
                Filtros
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons size={32} color='#9CA3AF' name='close' />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Title text='Tipo' />
            <View className='flex-2 flex-row'>
              <Tag text='Prestador de serviço' />
              <Tag text='Estabelecimento' />
            </View>

            <Title text='Atendimento' />
            <View className='flex-2 flex-row'>
              <Tag text='À domicílio' />
              <Tag text='No estabelecimento' />
              <Tag text='Remoto' />
            </View>
          </View>

          <View className='flex-2 flex-row justify-around'>
            <TouchableOpacity
              className='flex-2 flex-row items-center py-3 px-8 rounded-xl bg-gray-300'
              onPress={() => {}}
            >
              <FontAwesome5 name='eraser' size={24} color='black' />
              <Text className='font-bold text-xl text-gray-900'>
                {'  Limpar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-2 flex-row items-center py-3 px-8 rounded-xl bg-cyan-700'
              onPress={() => {}}
            >
              <FontAwesome5 name='filter' size={24} color='white' />
              <Text className='font-bold text-xl text-white'>
                {'  Filtrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}

export default BottomSheet
