import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonInputText } from '@/components/Skeletons/SkeletonInputText'
import { SkeletonTag } from '@/components/Skeletons/SkeletonTag'
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
const StyledText = styled(Text)
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)
const StyledScrollView = styled(ScrollView)

export default function EditAd() {
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
      <Header title='Editar anúncio' icon='pen' />
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className='p-4'
      >
        <StyledView className='flex-col gap-2'>
          <StyledText className='font-bold text-xl my-4'>
            Informações do anúncio
          </StyledText>
          <StyledView className='flex-2 flex-col gap-2'>
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Nome' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Cargo' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='Descrição'
                numberOfLines={10}
                multiline={true}
                textAlignVertical='top'
              />
            )}
          </StyledView>
          <StyledText className='font-bold text-xl my-4'>
            Atendimento
          </StyledText>
          {isLoading ? (
            <StyledView className='flex-2 flex-row'>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </StyledView>
          ) : (
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
          )}

          <StyledText className='font-bold text-xl my-4'>Categoria</StyledText>
          {isLoading ? (
            <StyledView className='flex-2 flex-row'>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </StyledView>
          ) : (
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
          )}
          <StyledText className='font-bold text-xl my-4'>Contato</StyledText>
          <StyledView className='gap-2'>
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Telefone' keyboardType='numeric' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='WhatsApp' keyboardType='numeric' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='E-mail' />
            )}
          </StyledView>
          <StyledText className='font-bold text-xl my-4'>
            Localização
          </StyledText>
          <StyledView className='gap-2 mb-4'>
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='CEP' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Rua' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Número' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Bairro' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Cidade' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Estado' />
            )}
          </StyledView>
        </StyledView>
      </StyledScrollView>
      <StyledView className='p-4'>
        {isLoading ? (
          <SkeletonActionButton />
        ) : (
          <ActionButton
            iconColor='white'
            backgroundColor='cyan-700'
            textColor='white'
            text='Editar anúncio'
            icon='id-card'
            onPress={() => navigation.navigate('Profile')}
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
