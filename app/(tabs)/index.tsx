import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CardItem } from '../../components/CardItem'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function HomeScreen() {
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-2 flex-row gap-2 items-center bg-gray-100 p-8 rounded-xl'>
        <Text className='text-xl text-gray-900 font-bold'>Olá,</Text>
        <Text className='text-xl text-gray-700 font-semibold'>Murilo</Text>
      </View>

      <ScrollView className='flex-2 mb-2 p-4 '>
        <View className='flex-1 flex-row mb-4'>
          <TouchableOpacity className='flex-2 flex-row justify-center items-center bg-gray-200 p-2 rounded-full '>
            <Text>Filtros </Text>
            <Ionicons name='chevron-down' />
          </TouchableOpacity>
        </View>
        <CardItem
          name='Joana Silva'
          office='Cabeleireira'
          officeType='Prestador de serviço'
          category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
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
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
      </ScrollView>
    </View>
  )
}
