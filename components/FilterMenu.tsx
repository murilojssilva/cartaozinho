import { useEffect, useState } from 'react'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import {
  StyledFlatList,
  StyledSafeAreaView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '@/app/styled'
import { FilterCategoryButton } from '@/components/FilterCategoryButton'
import { categories, serviceTypes, officeTypes } from '@/app/constants'
import { ActionButton } from './ActionButton'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface IFilterMenuProps {
  filters: {
    name: string
    categories: string[]
    officeTypes: string[]
    serviceTypes: string[]
  }
  visible: boolean
  sheetHeight: number
  onClose: () => void
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name: string
      categories: string[]
      officeTypes: string[]
      serviceTypes: string[]
    }>
  >
}

export function FilterMenu({
  filters,
  visible,
  sheetHeight,
  onClose,
  setFilters,
}: IFilterMenuProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.categories || []
  )
  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState<string[]>(
    filters.officeTypes || []
  )
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    filters.serviceTypes || []
  )

  const translateY = useSharedValue(sheetHeight)

  useEffect(() => {
    translateY.value = visible ? withSpring(0) : withSpring(sheetHeight)
  }, [visible, sheetHeight])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedOfficeTypes([])
    setSelectedServiceTypes([])
    setFilters({
      name: '',
      categories: [],
      officeTypes: [],
      serviceTypes: [],
    })
  }

  const handleApplyFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: selectedCategories,
      officeTypes: selectedOfficeTypes,
      serviceTypes: selectedServiceTypes,
    }))
    onClose()
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'flex-end' }}>
      <PanGestureHandler
        onGestureEvent={(event: any) => {
          if (event.nativeEvent.translationY > 0) {
            translateY.value = event.nativeEvent.translationY
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
          <StyledView className='flex-2 flex-row bg-gray-300' />
          <StyledView className='p-4'>
            <StyledView className='flex-row justify-between items-center mb-4'>
              <StyledView className='flex-2 flex-row '>
                <FontAwesome5 name='filter' size={26} color='white' />
                <StyledText className='text-xl font-bold'> Filtros</StyledText>
              </StyledView>
              <StyledTouchableOpacity onPress={onClose}>
                <AntDesign name='close' size={24} color='black' />
              </StyledTouchableOpacity>
            </StyledView>

            <StyledView>
              <StyledText className='text-lg font-semibold'>
                Categorias
              </StyledText>
              <StyledFlatList
                scrollEnabled={true}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: { item: string }) => (
                  <FilterCategoryButton
                    key={item}
                    label={item}
                    isSelected={selectedCategories.includes(item)}
                    onPress={() =>
                      setSelectedCategories((prevSelected) =>
                        prevSelected.includes(item)
                          ? prevSelected.filter((cat) => cat !== item)
                          : [...prevSelected, item]
                      )
                    }
                  />
                )}
              />

              <StyledText className='text-lg font-semibold mt-4'>
                Tipo
              </StyledText>
              <StyledFlatList
                scrollEnabled={true}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={officeTypes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: { item: string }) => (
                  <FilterCategoryButton
                    key={item}
                    label={item}
                    isSelected={selectedOfficeTypes.includes(item)}
                    onPress={() =>
                      setSelectedOfficeTypes((prevSelected) =>
                        prevSelected.includes(item)
                          ? prevSelected.filter((type) => type !== item)
                          : [...prevSelected, item]
                      )
                    }
                  />
                )}
              />

              <StyledText className='text-lg font-semibold mt-4'>
                Local de atendimento
              </StyledText>
              <StyledFlatList
                scrollEnabled={true}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={serviceTypes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: { item: string }) => (
                  <FilterCategoryButton
                    key={item}
                    label={item}
                    isSelected={selectedServiceTypes.includes(item)}
                    onPress={() =>
                      setSelectedServiceTypes((prevSelected) =>
                        prevSelected.includes(item)
                          ? prevSelected.filter((service) => service !== item)
                          : [...prevSelected, item]
                      )
                    }
                  />
                )}
              />
            </StyledView>
          </StyledView>
          <StyledView className='flex-2 flex-row justify-around'>
            <ActionButton
              text='Limpar'
              icon='trash'
              backgroundColor='transparent'
              textColor='white'
              iconColor='white'
              onPress={handleClearFilters}
            />
            <ActionButton
              text='Filtrar'
              icon='filter'
              backgroundColor='cyan-700'
              textColor='white'
              iconColor='white'
              onPress={handleApplyFilters}
            />
          </StyledView>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}
