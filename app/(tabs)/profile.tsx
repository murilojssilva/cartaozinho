import { ActionButton } from '@/components/ActionButton'
import { CardItem } from '@/components/CardItem'
import { MyItemCard } from '@/components/MyItemCard'
import { TabHeader } from '@/components/TabHeader'
import { Title } from '@/components/Title'
import { Topic } from '@/components/Topic'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

export default function Profile() {
  const navigation = useNavigation()
  return (
    <View className='flex-1 bg-white'>
      <TabHeader text='Perfil' icon='user' />

      <ScrollView className='flex-2 flex-col'>
        <View className='flex-2 p-4 flex-col h-full'>
          <View className='flex-2 mb-4 flex-col'>
            <Title text='Informações pessoais' />
            <Topic icon='user' name='Nome' content='Murilo' />
            <Topic icon='phone' name='Telefone' content='(21) 99999-9999' />
            <Topic icon='envelope' name='E-mail' content='email@email.com' />
          </View>
          <ActionButton
            text='Editar perfil'
            icon='pen'
            backgroundColor='cyan-700'
            textColor='gray-100'
            onPress={() => navigation.navigate('editProfile')}
          />

          <View className='flex-2 flex-col'>
            <Title text='Geral' />
            <View className='flex-2 flex-row justify-between'>
              <Text className='text-lg'>Tema</Text>
              <Entypo name='switch' size={32} />
            </View>
            <View className='flex-2 flex-row justify-between'>
              <Text className='text-lg'>Biometria</Text>
              <Entypo name='switch' size={32} />
            </View>
          </View>

          <View className='flex-2 flex-col'>
            <Title text='Meus anúncios' />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className='flex-2 p-2 gap-2'
            >
              <MyItemCard name='Murilo' office='Teste' officeType='Teste' />
              <MyItemCard name='Murilo' office='Teste' officeType='Teste' />
              <MyItemCard name='Murilo' office='Teste' officeType='Teste' />
              <MyItemCard name='Murilo' office='Teste' officeType='Teste' />
              <MyItemCard name='Murilo' office='Teste' officeType='Teste' />
            </ScrollView>
          </View>

          <ActionButton
            text='Sair da conta'
            icon='sign-out-alt'
            backgroundColor='red-500'
            textColor='gray-100'
          />
        </View>
      </ScrollView>
    </View>
  )
}
