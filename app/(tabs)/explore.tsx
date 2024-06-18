import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Topic } from '@/components/Topic'
import { Ionicons } from '@expo/vector-icons'
import mapa from '@/assets/images/mapa.jpg'

interface IMoreInformationsProps {
  category: string[]
  service: string[]
}

export default function TabTwoScreen() {
  const category: IMoreInformationsProps = [
    'Informática',
    'Desenvolvimento',
    'Website',
    'Aplicativos',
    'Mobile',
  ]
  const service: IMoreInformationsProps = [
    'À domicílio',
    'Presencial',
    'Remoto',
  ]
  return (
    <ScrollView className='flex-1 flex-col bg-white'>
      <View className='flex-2 flex-row justify-between items-center bg-gray-100 p-8 rounded-xl'>
        <FontAwesome name='chevron-left' size={14} color='gray-300' />

        <Text className='text-xl text-gray-700 font-semibold'>
          Mais informações
        </Text>
      </View>
      <View className='flex-1 p-4'>
        <Text className='font-bold text-xl mb-4'>Mais informações</Text>

        <View className='flex-2 bg-gray-200 p-4 items-center rounded-xl mb-4'>
          <FontAwesome name='user' size={60} color='gray-300' />
        </View>
        <View className='bg-gray-200 p-4 rounded-xl mb-4'>
          <Text className='font-bold text-xl mb-4'>Perfil</Text>
          <Topic icon='user' name='Nome' content='Murilo' />
          <Topic icon='suitcase' name='Cargo' content='Desenvolvedor' />
          <Topic icon='id-card' name='Tipo' content='Prestador de serviço' />
        </View>

        <View className='bg-gray-200 p-4 rounded-xl mb-4'>
          <Text className='font-bold text-xl mb-4'>Descrição</Text>
          <Text className='text-sm text-gray-700 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
            itaque, cumque eius, obcaecati quia aliquid ipsa ratione expedita
            perspiciatis veniam atque quisquam! Recusandae eaque expedita soluta
            tempora hic vitae dolore.
          </Text>
        </View>

        <View className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
          <Text className='font-bold text-xl mb-4'>Categorias</Text>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-2 flex-row gap-2'
          >
            {category.map((cat, index) => (
              <View
                key={index}
                className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'
              >
                <Text className='text-gray-100 text-xs'>{cat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
          <Text className='font-bold text-xl mb-4'>Contato</Text>

          <View className='flex-1 justify-center flex-row gap-2'>
            <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-xl bg-gray-300 p-2'>
              <Ionicons name='call' size={14} color='gray-300' />
              <Text className='font-bold text-sm'>Telefone</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-xl bg-green-300 p-2'>
              <FontAwesome name='whatsapp' size={14} color='gray-300' />
              <Text className='font-bold text-sm'> WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 flex-row items-center justify-center rounded-xl bg-blue-300 p-2'>
              <FontAwesome name='telegram' size={14} color='gray-300' />
              <Text className='font-bold text-sm'> Telegram</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
          <Text className='font-bold text-xl mb-4'>Atendimento</Text>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-2 flex-row gap-2'
          >
            {service.map((serv, index) => (
              <View
                key={index}
                className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'
              >
                <Text className='text-gray-100 text-xs'>{serv}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
          <Text className='font-bold text-xl mb-4'>Localização</Text>

          <Topic icon='map-pin' name='CEP' content='25655-100' />
          <Topic icon='map' name='Rua' content='Murilo' />
          <Topic icon='square' name='Número' content='200' />
          <Topic icon='list' name='Complemento' content='Portão Branco' />
          <Topic
            icon='city'
            name='Cidade - Estado'
            content='Rio de Janeiro - RJ'
          />

          <View className='flex-2 p-4'>
            <Image source={mapa} className='flex-1  w-full h-64' />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
