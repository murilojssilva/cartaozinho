import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CardItem } from '../../components/CardItem'
import clsx from 'clsx'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

export default function HomeScreen() {
  const navigation = useNavigation()
  const [filterMenu, setFilterMenu] = useState(true)
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-2 flex-row gap-2 items-center bg-gray-100 p-8 rounded-xl'>
        <Text className='text-xl text-gray-900 font-bold'>Olá,</Text>
        <Text className='text-xl text-gray-700 font-semibold'>Murilo</Text>
      </View>

      <ScrollView className='flex-2 mb-2 p-4'>
        <Text className='font-bold text-xl mb-4'>Anúncios</Text>
        <View className='flex-2 flex-row justify-around'>
          <TouchableOpacity
            onPress={() => navigation.navigate('new')}
            className='flex-2 flex-col items-center justify-center w-36 bg-gray-200 p-6 rounded-xl'
          >
            <FontAwesome5 name='plus' size={32} />
            <Text className='text-lg font-bold text-center'>
              Novo{'\n'}anúncio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('profile')}
            className='flex-2 flex-col items-center justify-center w-36 bg-gray-200 p-6 rounded-xl'
          >
            <FontAwesome5 name='user' size={32} />
            <Text className='text-lg font-bold text-center'>
              Meus{'\n'}anúncios
            </Text>
          </TouchableOpacity>
        </View>
        <Text className='font-bold text-xl mb-4'>Outros anúncios</Text>
        <View className='flex-1 flex-row mb-4'>
          <TouchableOpacity
            onPress={() => setFilterMenu(false)}
            className='flex-2 flex-row justify-center items-center bg-gray-200 p-2 rounded-full '
          >
            <Text>Filtros </Text>
            <Ionicons name='chevron-down' />
          </TouchableOpacity>
        </View>
        <CardItem
          name='Joana Silva'
          office='Cabeleireira'
          officeType='Prestador de serviço'
          category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={[
            'Informática',
            'Desenvolvimento',
            'Website',
            'Aplicativos',
            'Mobile',
          ]}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
      </ScrollView>
      <View
        className={`${clsx(
          filterMenu ? 'hidden' : 'flex-2'
        )} p-6 bg-gray-300 rounded-t-xl gap-2`}
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
    </View>
  )
}
