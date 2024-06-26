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

import { styled } from 'nativewind'

const StyledView = styled(View)
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)
const StyledScrollView = styled(ScrollView)
const StyledText = styled(Text)

export default function NewAd() {
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
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white'
    >
      <Header title='Novo anúncio' icon='plus' />
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className='p-4'
      >
        <StyledView className='flex-col gap-2'>
          <StyledText className='font-bold text-xl my-4'>
            Informações do anúncio
          </StyledText>
          <StyledView className='gap-2'>
            <InputText text='Nome' />
            <InputText text='Cargo' />
            <InputText
              text='Descrição'
              numberOfLines={10}
              multiline={true}
              textAlignVertical='top'
            />
          </StyledView>
          <StyledText className='font-bold text-xl my-4'>
            Atendimento
          </StyledText>
          <StyledView className='flex-row gap-2'>
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
          </StyledView>

          <StyledText className='font-bold text-xl my-4'>Categoria</StyledText>
          <StyledScrollView
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
          </StyledScrollView>
          <StyledText className='font-bold text-xl my-4'>Contato</StyledText>
          <StyledView className='gap-2'>
            <InputText text='Telefone' keyboardType='numeric' />
            <InputText text='WhatsApp' keyboardType='numeric' />
            <InputText text='E-mail' />
          </StyledView>
          <StyledText className='font-bold text-xl my-4'>
            Localização
          </StyledText>
          <StyledView className='gap-2 mb-4'>
            <InputText text='CEP' />
            <InputText text='Rua' />
            <InputText text='Número' />
            <InputText text='Bairro' />
            <InputText text='Cidade' />
            <InputText text='Estado' />
          </StyledView>
        </StyledView>
      </StyledScrollView>
      <StyledView className='p-4'>
        {isLoading ? (
          <SpinnerButton />
        ) : (
          <ActionButton
            iconColor='white'
            backgroundColor='cyan-700'
            textColor='white'
            onPress={() => navigation.navigate('Home')}
            text='Anunciar'
            icon='id-card'
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
