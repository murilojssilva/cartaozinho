import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import { Tag } from '@/components/Tag'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native'

export default function New() {
  const categories = [
    'Administração',
    'Alimentação',
    'Beleza',
    'Educação',
    'Entretenimento',
    'Limpeza',
    'Manutenção',
    'Pet',
    'Saúde',
    'Serviço',
    'Tecnologia',
    'Transporte',
  ]
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white'
    >
      <Header title='Novo anúncio' icon='plus' />
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
            <Tag
              text='À domicílio'
              onPress={() => setIsSelected(!isSelected)}
              backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
            />
            <Tag
              text='No estabelecimento'
              onPress={() => setIsSelected(!isSelected)}
              backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
            />
            <Tag
              text='Remoto'
              onPress={() => setIsSelected(!isSelected)}
              backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
            />
          </View>

          <Text className='font-bold text-xl my-4'>Categoria</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-row'
          >
            {categories.map((categorie, index) => (
              <Tag
                key={index}
                text={categorie}
                onPress={() => setIsSelected(!isSelected)}
                backgroundColor={isSelected ? 'cyan-700' : 'gray-600'}
              />
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
        {isLoading ? (
          <SpinnerButton />
        ) : (
          <ActionButton
            iconColor='white'
            backgroundColor='cyan-700'
            textColor='white'
            onPress={() => setIsLoading(!isLoading)}
            text='Anunciar'
            icon='id-card'
          />
        )}
      </View>
    </KeyboardAvoidingView>
  )
}
