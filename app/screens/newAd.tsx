import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import { Tag } from '@/components/Tag'
import { useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import uuid from 'react-native-uuid'
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
import {
  defaultCategories,
  defaultOfficeTypes,
  defaultServiceTypes,
} from '../constants'

export function NewAd() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [ad, setAd] = useState<IAdProps>({} as IAdProps)

  const { address, setAddress, handleCepChange } = useGetAddress()

  useEffect(() => {
    setAd((ad: IAdProps) => ({
      ...ad,
      id: uuid.v4(),
      city: address.city,
      state: address.state,
      street: address.street,
      neighborhood: address.neighborhood,
      complement: address.complement,
      number: address.number,
      cep: address.cep,
      officeTypes: selectedOfficeTypes,
      categories: selectedCategories,
      serviceTypes: selectedServices,
    }))
  }, [address, selectedOfficeTypes, selectedCategories, selectedServices])

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((s) => s !== service)
      } else {
        return [...prevSelectedServices, service]
      }
    })
  }

  const handleOfficeTypeToggle = (officeTypes: string) => {
    setSelectedOfficeTypes((prevSelectedOfficeTypes) => {
      if (prevSelectedOfficeTypes.includes(officeTypes)) {
        return prevSelectedOfficeTypes.filter((s) => s !== officeTypes)
      } else {
        return [...prevSelectedOfficeTypes, officeTypes]
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

  const isOfficeTypeSelected = (officeType: string) => {
    return selectedOfficeTypes.includes(officeType)
  }

  const isCategorySelected = (category: string) => {
    return selectedCategories.includes(category)
  }

  async function handleNewAd() {
    setIsLoading(true)
    try {
      await adCreate(ad)
      navigation.navigate('Home')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

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
              onChangeText={(text) => handleInputChange('office', text)}
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
          <StyledScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-row'
          >
            {defaultOfficeTypes.map((officeType, index) => (
              <Tag
                key={index}
                text={officeType}
                onPress={() => handleOfficeTypeToggle(officeType)}
                backgroundColor={
                  isOfficeTypeSelected(officeType) ? 'cyan-700' : 'gray-600'
                }
              />
            ))}
          </StyledScrollView>

          <StyledText className='font-bold text-xl my-4'>
            Local de atendimento
          </StyledText>

          <StyledScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-row'
          >
            {defaultServiceTypes.map((serviceType, index) => (
              <Tag
                key={index}
                text={serviceType}
                onPress={() => handleServiceToggle(serviceType)}
                backgroundColor={
                  isServiceSelected(serviceType) ? 'cyan-700' : 'gray-600'
                }
              />
            ))}
          </StyledScrollView>

          <StyledText className='font-bold text-xl my-4'>Categoria</StyledText>
          <StyledScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className='flex-row'
          >
            {defaultCategories.map((category, index) => (
              <Tag
                key={index}
                text={category}
                onPress={() => handleCategoryToggle(category)}
                backgroundColor={
                  isCategorySelected(category) ? 'cyan-700' : 'gray-600'
                }
              />
            ))}
          </StyledScrollView>

          <StyledText className='font-bold text-xl my-4'>Contato</StyledText>
          <StyledView className='gap-2'>
            <TextInputMask
              placeholder='(00) 0000-0000'
              type={'cel-phone'}
              keyboardType='phone-pad'
              onChangeText={(text) => handleInputChange('phone', text)}
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
            <TextInputMask
              placeholder='(00) 00000-0000'
              type={'cel-phone'}
              keyboardType='numeric'
              onChangeText={(text) => handleInputChange('whatsapp', text)}
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
            <InputText
              text='Instagram'
              autoCapitalize='none'
              onChangeText={(text) =>
                handleInputChange(
                  'instagram',
                  text.replace(/\s/g, '').toLowerCase()
                )
              }
            />
            <InputText
              text='E-mail'
              keyboardType='email-address'
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
