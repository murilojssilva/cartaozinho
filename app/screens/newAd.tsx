import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import { Tag } from '@/components/Tag'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Platform } from 'react-native'
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'
import { TextInputMask } from 'react-native-masked-text'
import useGetAddress from '@/hooks/useGetAddress'
import { adCreate } from '../storage/ad/adCreate'
import { IAdProps } from '../interfaces/IAdProps'

export function NewAd() {
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
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [ad, setAd] = useState<IAdProps>({} as IAdProps)

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((s) => s !== service)
      } else {
        return [...prevSelectedServices, service]
      }
    })
  }

  const handleOfficeTypeToggle = (officeType: string) => {
    setSelectedOfficeTypes((prevSelectedOfficeTypes) => {
      if (prevSelectedOfficeTypes.includes(officeType)) {
        return prevSelectedOfficeTypes.filter((s) => s !== officeType)
      } else {
        return [...prevSelectedOfficeTypes, officeType]
      }
    })
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category)
      } else {
        return [...prevSelectedCategories, category]
      }
    })
  }

  const isServiceSelected = (service: string) => {
    return selectedServices.includes(service)
  }

  const isOfficeType = (officeType: string) => {
    return selectedOfficeTypes.includes(officeType)
  }

  const isCategorySelected = (category: string) => {
    return selectedCategories.includes(category)
  }

  async function handleNewAd() {
    try {
      await adCreate(ad)
      navigation.navigate('Home')
    } catch (error) {
      throw error
    }
  }

  const { address, setAddress, handleCepChange } = useGetAddress()

  const handleInputChange = (field: keyof IAdProps, value: string) => {
    setAd({ ...ad, [field]: value })
  }

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
            <InputText
              text='Nome'
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <InputText
              text='Cargo'
              onChangeText={(text) => handleInputChange('position', text)}
            />
            <InputText
              text='Descrição'
              numberOfLines={10}
              multiline={true}
              textAlignVertical='top'
              onChangeText={(text) => handleInputChange('description', text)}
            />
          </StyledView>
          <StyledText className='font-bold text-xl my-4'>
            Tipo de atendimento
          </StyledText>
          <StyledView className='flex-row gap-2'>
            <Tag
              text='Prestador de serviço'
              onPress={() => handleOfficeTypeToggle('Prestador de serviço')}
              backgroundColor={
                isOfficeType('Prestador de serviço') ? 'cyan-700' : 'gray-600'
              }
            />
            <Tag
              text='Estabelecimento'
              onPress={() => handleOfficeTypeToggle('Estabelecimento')}
              backgroundColor={
                isOfficeType('Estabelecimento') ? 'cyan-700' : 'gray-600'
              }
            />
          </StyledView>

          <StyledText className='font-bold text-xl my-4'>
            Local de atendimento
          </StyledText>

          <StyledView className='flex-row gap-2'>
            <Tag
              text='À domicílio'
              onPress={() => handleServiceToggle('À domicílio')}
              backgroundColor={
                isServiceSelected('À domicílio') ? 'cyan-700' : 'gray-600'
              }
            />
            <Tag
              text='No estabelecimento'
              onPress={() => handleServiceToggle('No estabelecimento')}
              backgroundColor={
                isServiceSelected('No estabelecimento')
                  ? 'cyan-700'
                  : 'gray-600'
              }
            />
            <Tag
              text='Remoto'
              onPress={() => handleServiceToggle('Remoto')}
              backgroundColor={
                isServiceSelected('Remoto') ? 'cyan-700' : 'gray-600'
              }
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
                onPress={() => handleCategoryToggle(categorie)}
                backgroundColor={
                  isCategorySelected(categorie) ? 'cyan-700' : 'gray-600'
                }
              />
            ))}
          </StyledScrollView>

          <StyledText className='font-bold text-xl my-4'>Contato</StyledText>
          <StyledView className='gap-2'>
            <InputText
              text='Telefone'
              keyboardType='numeric'
              onChangeText={(text) => handleInputChange('phone', text)}
            />
            <InputText
              text='WhatsApp'
              keyboardType='numeric'
              onChangeText={(text) => handleInputChange('whatsapp', text)}
            />
            <InputText
              text='E-mail'
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </StyledView>

          <StyledText className='font-bold text-xl my-4'>
            Localização
          </StyledText>
          <StyledView className='gap-2 mb-4'>
            <TextInputMask
              type={'zip-code'}
              value={address.cep}
              onChangeText={(text) => handleCepChange(text)}
              placeholder='CEP'
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
            <InputText text='Rua' value={address.street} editable={false} />
            <InputText
              text='Número'
              keyboardType='numeric'
              value={address.number}
              onChangeText={(text) => setAddress({ ...address, number: text })}
            />
            <InputText
              text='Complemento'
              value={address.complement}
              onChangeText={(text) =>
                setAddress({ ...address, complement: text })
              }
            />
            <InputText
              text='Bairro'
              value={address.neighborhood}
              editable={false}
              onChangeText={(text) => handleInputChange('neighborhood', text)}
            />
            <InputText
              text='Cidade'
              onChangeText={(text) => handleInputChange('city', text)}
              value={address.city}
              editable={false}
            />
            <InputText
              text='Estado'
              onChangeText={(text) => handleInputChange('state', text)}
              value={address.state}
              editable={false}
            />
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
            onPress={() => handleNewAd()}
            text='Anunciar'
            icon='id-card'
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
