import { Text, TouchableOpacity, View, ViewProps } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import clsx from 'clsx'

interface IFilterMenuProps extends ViewProps {
  filterMenu: boolean
  setFilterMenu: any
}

export function FilterMenu({
  filterMenu,
  setFilterMenu,
  ...props
}: IFilterMenuProps) {
  return (
    <View
      className={`${clsx(
        filterMenu ? 'hidden' : 'flex-2'
      )} p-6 bg-gray-300 rounded-t-xl gap-2`}
      {...props}
    >
      <View className='flex-2 flex-row justify-between'>
        <View className='flex-2 flex-row gap-2 items-center'>
          <Ionicons name='filter' size={32} />
          <Text className='font-bold text-xl'>Filtros</Text>
        </View>
        <TouchableOpacity onPress={() => setFilterMenu(true)}>
          <Ionicons name='close' size={32} />
        </TouchableOpacity>
      </View>
      <Text className='font-bold text-xl'>Tipo</Text>
      <View className='flex-2 flex-row w-full gap-2'>
        <View className='flex-2  flex-row py-2 px-4 bg-gray-600 rounded-full'>
          <Text className='text-gray-100 text-xs'>Prestador de serviço</Text>
        </View>
        <View className='flex-2  flex-row py-2 px-4 bg-gray-600 rounded-full'>
          <Text className='text-gray-100 text-xs'>Estabelecimento</Text>
        </View>
      </View>
      <Text className='font-bold text-xl'>Atendimento</Text>
      <View className='flex-2 flex-row w-full gap-2'>
        <View className='flex-2  flex-row py-2 px-4 bg-gray-600 rounded-full'>
          <Text className='text-gray-100 text-xs'>À domicílio</Text>
        </View>
        <View className='flex-2  flex-row py-2 px-4 bg-gray-600 rounded-full'>
          <Text className='text-gray-100 text-xs'>No estabelecimento</Text>
        </View>
        <View className='flex-2  flex-row py-2 px-4 bg-gray-600 rounded-full'>
          <Text className='text-gray-100 text-xs'>Remoto</Text>
        </View>
      </View>
      <View className='flex-2 flex-row items-center justify-between'>
        <TouchableOpacity className='flex-2 flex-row py-2 px-4 rounded-xl bg-red-500'>
          <Text className='font-bold text-white'>Limpar filtros </Text>
          <FontAwesome5 name='eraser' size={20} color='white' />
        </TouchableOpacity>

        <TouchableOpacity className='flex-2 flex-row py-2 px-4 rounded-xl bg-blue-500'>
          <Text className='font-bold text-white'>Filtrar </Text>
          <Ionicons name='filter' size={20} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  )
}
