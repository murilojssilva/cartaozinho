import { CardItem } from '@/components/CardItem'
import { Topic } from '@/components/Topic'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const navigation = useNavigation()
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-2 flex-row justify-center gap-2 items-center bg-gray-100 p-8 rounded-xl'>
        <FontAwesome5 name='user' size={22} />
        <Text className='text-xl text-gray-700 font-semibold'>Perfil</Text>
      </View>
      <View></View>

      <ScrollView className='flex-2 flex-col'>
        <View className='flex-2 p-4 flex-col h-full'>
          <View className='flex-2 mb-4 flex-col'>
            <Text className='font-bold text-xl mb-4'>Informações</Text>
            <Topic icon='user' name='Nome' content='Murilo' />
            <Topic icon='phone' name='Telefone' content='(21) 99999-9999' />
            <Topic icon='envelope' name='E-mail' content='email@email.com' />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('editProfile')}
            className='flex-2 flex-row justify-center items-center bg-cyan-700 p-4 rounded-xl'
          >
            <FontAwesome5 size={20} color='white' name='pen' />
            <Text className='font-bold text-xl text-gray-100 '>
              {' Editar perfil'}
            </Text>
          </TouchableOpacity>

          <Text className='font-bold text-xl my-4'>Meus anúncios</Text>

          <CardItem
            name='Joana Silva'
            office='Cabeleireira'
            officeType='Prestador de serviço'
            category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
            onPress={() => navigation.navigate('details')}
          />
          <CardItem
            name='Loja de ferragens'
            office='Loja de ferragens'
            officeType='Estabelecimento'
            category={['Obra', 'Cimento', 'Tijolo']}
            onPress={() => navigation.navigate('details')}
          />
          <CardItem
            name='Carlos'
            office='Pintor'
            officeType='Prestador de serviço'
            category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
            onPress={() => navigation.navigate('details')}
          />
        </View>
      </ScrollView>
    </View>
  )
}
