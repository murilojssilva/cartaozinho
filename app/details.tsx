import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Topic } from '@/components/Topic'
import mapa from '@/assets/images/mapa.jpg'
import { useNavigation } from 'expo-router'
import { SocialButton } from '@/components/SocialButton'
import { Header } from '@/components/Header'
import { Title } from '@/components/Title'
import { FontAwesome5 } from '@expo/vector-icons'
import { ProfileCard } from '@/components/ProfileCard'

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
    'No estabelecimento',
    'Remoto',
  ]

  const navigation = useNavigation()
  return (
    <ScrollView className='flex-1 flex-col bg-white'>
      <Header icon='list' title='Detalhes' />
      <View className='flex-1 p-4'>
        <Title text='Detalhes' />

        <View className='justify-center bg-gray-200 p-4 self-center items-center mb-4 w-40 h-40 rounded-full border-4 border-gray-300'>
          <FontAwesome5 name='user' size={50} color='#D1D5DB' />
        </View>

        <View className='flex-2 flex-row justify-between items-center mb-4'>
          <ProfileCard icon='user' title='Nome' text={`Murilo\nSilva`} />
          <ProfileCard
            icon='suitcase'
            title='Cargo'
            text={`Desenvolvedor\nFront-end`}
          />

          <ProfileCard
            icon='id-card'
            title='Tipo'
            text={`Prestador\nde serviço`}
          />
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
            <SocialButton
              text='Telefone'
              color='gray-300'
              icon='phone'
              onPress={() => navigation.navigate('details')}
            />

            <SocialButton
              text='WhatsApp'
              color='green-300'
              icon='whatsapp'
              onPress={() => navigation.navigate('details')}
            />

            <SocialButton
              text='E-mail'
              color='gray-300'
              icon='envelope'
              onPress={() => navigation.navigate('details')}
            />
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
            <Image source={mapa} className='flex-1 w-full h-64' />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
