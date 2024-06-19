import { ActionButton } from '@/components/ActionButton'
import { InputText } from '@/components/InputText'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function New() {
  const categories = [
    'Beleza',
    'Saúde',
    'Educação',
    'Entretenimento',
    'Internet',
    'Games',
    'Tecnologia',
    'Cabelo',
    'Serviço',
    'Reciclagem',
    'Jornalismo',
    'Evento',
  ]
  const navigation = useNavigation()
  return (
    <View className='flex-1 bg-white'>
      <View className='flex-2 flex-row justify-between items-center bg-gray-100 p-8 rounded-xl'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name='chevron-left' size={24} color='gray-300' />
        </TouchableOpacity>
        <View className='flex-2 flex-row items-center justify-center'>
          <FontAwesome5 name='plus' size={22} />
          <Text className='text-xl text-gray-700 font-semibold'>{' Novo'}</Text>
        </View>
      </View>
      <ScrollView className='flex-2 p-4'>
        <View className='flex-2 flex-col p-4 gap-2'>
          <Text className='font-bold text-xl my-4'>Informações do anúncio</Text>
          <View className='flex-2 gap-2'>
            <InputText text='Nome' />
            <InputText text='Cargo' />
            <InputText
              text='Descrição'
              numberOfLines={10}
              multiline={true}
              textAlignVertical='top'
              className='justify-start'
            />
          </View>
          <Text className='font-bold text-xl my-4'>Atendimento</Text>
          <View className='flex-2 flex-row gap-2'>
            <View className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'>
              <Text className='text-gray-100 text-xs'>À domicílio</Text>
            </View>
            <View className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'>
              <Text className='text-gray-100 text-xs'>No estabelecimento</Text>
            </View>
            <View className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'>
              <Text className='text-gray-100 text-xs'>Remoto</Text>
            </View>
          </View>

          <Text className='font-bold text-xl my-4'>Categoria</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-2 flex-row gap-2'
          >
            {categories.map((categorie, index) => (
              <View
                key={index}
                className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'
              >
                <Text className='text-gray-100 text-xs'>{categorie}</Text>
              </View>
            ))}
          </ScrollView>
          <Text className='font-bold text-xl my-4'>Contato</Text>
          <View className='flex-2 gap-2'>
            <InputText
              text='Telefone'
              keyboardAppearance='number'
              keyboardType='number'
            />
            <InputText
              text='WhatsApp'
              keyboardAppearance='number'
              keyboardType='number'
            />
            <InputText text='E-mail' />
          </View>
          <Text className='font-bold text-xl my-4'>Localização</Text>
          <View className='flex-2 gap-2'>
            <InputText text='CEP' />
            <InputText text='Rua' />
            <InputText text='Número' />
            <InputText text='Bairro' />
            <InputText text='Cidade' />
            <InputText text='Estado' />
          </View>
        </View>
        <ActionButton icon='plus' text='Anunciar' />
      </ScrollView>
    </View>
  )
}
