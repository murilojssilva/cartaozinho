import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SpinnerButton } from '@/components/SpinnerButton'
import { Tag } from '@/components/Tag'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import uuid from 'react-native-uuid'
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledView,
  StyledTextInputMask,
} from '../styled'
import useGetAddress from '@/hooks/useGetAddress'
import { IAdProps } from '../interfaces/IAdProps'
import {
  defaultCategories,
  defaultOfficeTypes,
  defaultServiceTypes,
} from '../constants'
import { useUser } from '../context/UserContext'
import { useAds } from '@/hooks/useAds'

export function NewAd() {
  const { user } = useUser()

  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { newAddress, setNewAddress, handleCepChange } = useGetAddress()

  const {
    ad,
    setAd,
    handleInputChange,
    handleAddressChange,
    handleContactChange,
    isLoadingAd,
    handleNewAd,
  } = useAds()

  useEffect(() => {
    setAd((ad: IAdProps) => ({
      ...ad,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
      id: uuid.v4(),
      user_id: user?.id as string,
      address: newAddress,
      officeTypes: selectedOfficeTypes,
      categories: selectedCategories,
      serviceTypes: selectedServices,
    }))
  }, [newAddress, selectedOfficeTypes, selectedCategories, selectedServices])

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
              text='ID do usuário'
              editable={false}
              defaultValue={user?.nickname as string}
            />

            <InputText
              text='Função'
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

          <StyledText className='font-bold text-xl my-4'>
            Informações de Contato
          </StyledText>
          <StyledView className='gap-2'>
            <StyledTextInputMask
              placeholder='(00) 0000-0000'
              type={'cel-phone'}
              keyboardType='phone-pad'
              onChangeText={(text) => handleContactChange('phone', text)}
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
            <StyledTextInputMask
              placeholder='(00) 00000-0000'
              type={'cel-phone'}
              keyboardType='numeric'
              onChangeText={(text) => handleContactChange('whatsapp', text)}
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
            <StyledView className='flex-2 flex-row items-center bg-gray-200 rounded-xl'>
              <StyledView className='border-r-2 border-gray-500 px-3 py-5'>
                <StyledText className='text-sx text-gray-400 font-bold'>
                  instagram.com
                </StyledText>
              </StyledView>
              <InputText
                text='@usuario'
                autoCapitalize='none'
                onChangeText={(text) =>
                  handleContactChange(
                    'instagram',
                    text.replace(/\s/g, '').toLowerCase()
                  )
                }
              />
            </StyledView>
            <InputText
              text='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={(text) =>
                handleContactChange(
                  'email',
                  text.replace(/\s/g, '').toLowerCase()
                )
              }
            />
          </StyledView>

          <StyledText className='font-bold text-xl my-4'>Endereço</StyledText>
          <StyledView className='gap-2 mb-4'>
            <StyledTextInputMask
              type={'zip-code'}
              value={newAddress.cep}
              onChangeText={(text) => handleCepChange(text)}
              placeholder='CEP'
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
            <InputText text='Rua' value={newAddress.street} editable={false} />
            <InputText
              text='Número'
              keyboardType='numeric'
              value={newAddress.number}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, number: text })
              }
            />
            <InputText
              text='Complemento'
              value={newAddress.complement}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, complement: text })
              }
            />
            <InputText
              text='Bairro'
              value={newAddress.neighborhood}
              editable={false}
              onChangeText={(text) => handleAddressChange('neighborhood', text)}
            />
            <InputText
              text='Cidade'
              onChangeText={(text) => handleAddressChange('city', text)}
              value={newAddress.city}
              editable={false}
            />
            <InputText
              text='Estado'
              onChangeText={(text) => handleAddressChange('state', text)}
              value={newAddress.state}
              editable={false}
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
      <StyledView className='p-4'>
        {isLoadingAd ? (
          <SpinnerButton />
        ) : (
          <ActionButton
            iconColor='white'
            backgroundColor='cyan-700'
            textColor='white'
            onPress={handleNewAd}
            text='Anunciar'
            icon='id-card'
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
