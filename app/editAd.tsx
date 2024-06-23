import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { Tag } from '@/components/Tag'
import { useNavigation } from 'expo-router'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native'

export default function EditAd() {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white'
    >
      <Header title='Editar anúncio' icon='pen' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className='p-4'
      >
        <View className='flex-col gap-2'>
          <Text className='font-bold text-xl my-4'>Informações do anúncio</Text>
          <View className='gap-2'>
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
          <View className='flex-row gap-2'>
            <Tag text='À domicílio' />
            <Tag text='No estabelecimento' />
            <Tag text='Remoto' />
          </View>

          <Text className='font-bold text-xl my-4'>Categoria</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-row'
          >
            {categories.map((categorie, index) => (
              <Tag key={index} text={categorie} />
            ))}
          </ScrollView>
          <Text className='font-bold text-xl my-4'>Contato</Text>
          <View className='gap-2'>
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
          <View className='gap-2 mb-4'>
            <InputText text='CEP' />
            <InputText text='Rua' />
            <InputText text='Número' />
            <InputText text='Bairro' />
            <InputText text='Cidade' />
            <InputText text='Estado' />
          </View>
        </View>
      </ScrollView>
      <View className='p-4'>
        <ActionButton
          backgroundColor='cyan-700'
          textColor='white'
          text='Editar anúncio'
          icon='id-card'
        />
      </View>
    </KeyboardAvoidingView>
  )
}
