import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonInputText } from '@/components/Skeletons/SkeletonInputText'
import { SkeletonTag } from '@/components/Skeletons/SkeletonTag'
import { Tag } from '@/components/Tag'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import useGetAddress from '@/hooks/useGetAddress'
import {
  defaultCategories,
  defaultOfficeTypes,
  defaultServiceTypes,
} from '../constants'
import { useAds } from '@/hooks/useAds'
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'
import Toast from 'react-native-toast-message'
import { adEdit } from '../storage/ad/adEdit'
import { IAdProps } from '../interfaces/IAdProps'

export function EditAd() {
  const { isLoadingAllAds } = useAds()

  const {
    id,
    user_id,
    cep,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    name,
    office,
    description,
    phone,
    whatsapp,
    instagram,
    email,
    officeTypes: selectedOfficeTypesFromParams = defaultOfficeTypes,
    serviceTypes: selectedServiceTypesFromParams = defaultServiceTypes,
    categories: selectedCategoriesFromParams = defaultCategories,
  } = useLocalSearchParams()

  const navigation = useNavigation()
  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState(
    selectedOfficeTypesFromParams
  )
  const [selectedServiceTypes, setSelectedServiceTypes] = useState(
    selectedServiceTypesFromParams
  )
  const [selectedCategories, setSelectedCategories] = useState(
    selectedCategoriesFromParams
  )

  useEffect(() => {
    setAddress({
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
    })
  }, [])

  const { address, setAddress, handleCepChange } = useGetAddress()

  const [editedAd, setEditedAd] = useState<IAdProps>({
    id,
    user_id,
    name: name,
    office: office,
    description: description,
    phone: phone,
    whatsapp: whatsapp,
    instagram: instagram,
    email: email,
    complement: complement,
    officeTypes: selectedOfficeTypes,
    serviceTypes: selectedServiceTypes,
    categories: selectedCategories,
    cep: address.cep,
    neighborhood: address.neighborhood,
    street: address.street,
    city: address.city,
    state: address.state,
    number: address.number,
  } as IAdProps)

  const handleOfficeTypesSelected = (tag) => {
    setSelectedOfficeTypes((prevSelected) => {
      if (prevSelected.includes(tag)) {
        return prevSelected.filter((item) => item !== tag)
      } else {
        return [...prevSelected, tag]
      }
    })
  }

  const handleServiceTypesSelected = (serviceType) => {
    setSelectedServiceTypes((prevSelected) => {
      if (prevSelected.includes(serviceType)) {
        return prevSelected.filter((item) => item !== serviceType)
      } else {
        return [...prevSelected, serviceType]
      }
    })
  }

  const handleCategorySelected = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category)
      } else {
        return [...prevSelected, category]
      }
    })
  }

  const handleSave = async () => {
    try {
      const updatedAd = {
        id,
        name: name,
        office: office,
        description: description,
        phone: phone,
        whatsapp: whatsapp,
        instagram: instagram,
        email: email,
        complement: address.complement,
        officeTypes: selectedOfficeTypes,
        serviceTypes: selectedServiceTypes,
        categories: selectedCategories,
        cep: address.cep,
        neighborhood: address.neighborhood,
        street: address.street,
        city: address.city,
        state: address.state,
        number: address.number,
      }

      await adEdit(updatedAd)

      Toast.show({
        type: 'success',
        text1: 'Anúncio editado com sucesso',
        onShow: () => navigation.navigate('Profile'),
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Não foi possível editar o anúncio',
      })
    }
  }

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
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                value={editedAd.name}
                onChangeText={(text) =>
                  setEditedAd({ ...editedAd, name: text })
                }
                text='Nome'
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                value={editedAd.office}
                onChangeText={(text) =>
                  setEditedAd({ ...editedAd, office: text })
                }
                text='Nome'
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                value={editedAd.user_id}
                editable={false}
                text='ID do usuário'
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                value={editedAd.description}
                onChangeText={(text) =>
                  setEditedAd({ ...editedAd, description: text })
                }
                numberOfLines={10}
                multiline={true}
                textAlignVertical='top'
                text='Descrição'
              />
            )}
          </StyledView>

          <StyledText className='font-bold text-xl my-4'>
            Tipo de atendimento
          </StyledText>
          {isLoadingAllAds ? (
            <StyledView className='flex-2 flex-row'>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </StyledView>
          ) : (
            <StyledView className='flex-row gap-2'>
              <Tag
                text='Estabelecimento'
                onPress={() => handleOfficeTypesSelected('Estabelecimento')}
                backgroundColor={
                  selectedOfficeTypes.includes('Estabelecimento')
                    ? 'cyan-700'
                    : 'gray-600'
                }
              />
              <Tag
                text='Prestador de serviços'
                onPress={() =>
                  handleOfficeTypesSelected('Prestador de serviços')
                }
                backgroundColor={
                  selectedOfficeTypes.includes('Prestador de serviços')
                    ? 'cyan-700'
                    : 'gray-600'
                }
              />
            </StyledView>
          )}

          <StyledText className='font-bold text-xl my-4'>Categoria</StyledText>
          {isLoadingAllAds ? (
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
              {defaultCategories.map((category, index) => (
                <Tag
                  key={index}
                  text={category}
                  onPress={() => handleCategorySelected(category)}
                  backgroundColor={
                    selectedCategories.includes(category)
                      ? 'cyan-700'
                      : 'gray-600'
                  }
                />
              ))}
            </StyledScrollView>
          )}

          <StyledText className='font-bold text-xl my-4'>
            Local de atendimento
          </StyledText>
          {isLoadingAllAds ? (
            <StyledView className='flex-2 flex-row'>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </StyledView>
          ) : (
            <StyledScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className='flex-row gap-2'
            >
              <Tag
                text='À domicílio'
                onPress={() => handleServiceTypesSelected('À domicílio')}
                backgroundColor={
                  selectedServiceTypes.includes('À domicílio')
                    ? 'cyan-700'
                    : 'gray-600'
                }
              />
              <Tag
                text='No estabelecimento'
                onPress={() => handleServiceTypesSelected('No estabelecimento')}
                backgroundColor={
                  selectedServiceTypes.includes('No estabelecimento')
                    ? 'cyan-700'
                    : 'gray-600'
                }
              />
              <Tag
                text='Remoto'
                onPress={() => handleServiceTypesSelected('Remoto')}
                backgroundColor={
                  selectedServiceTypes.includes('Remoto')
                    ? 'cyan-700'
                    : 'gray-600'
                }
              />
            </StyledScrollView>
          )}
          <StyledText className='font-bold text-xl my-4'>Contato</StyledText>
          <StyledView className='gap-2'>
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='Telefone'
                keyboardType='numeric'
                onChangeText={(text) =>
                  setEditedAd({ ...editedAd, phone: text })
                }
                defaultValue={editedAd.phone as string}
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='WhatsApp'
                keyboardType='numeric'
                onChangeText={(text) =>
                  setEditedAd({ ...editedAd, whatsapp: text })
                }
                defaultValue={editedAd.whatsapp as string}
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='Instagram'
                autoCapitalize='none'
                onChangeText={(text) =>
                  setEditedAd({
                    ...editedAd,
                    instagram: text.replace(/\s/g, '').toLowerCase(),
                  })
                }
                defaultValue={editedAd.instagram as string}
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='E-mail'
                onChangeText={(text) =>
                  setEditedAd({ ...editedAd, email: text })
                }
                defaultValue={editedAd.email as string}
              />
            )}
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
            />
            <InputText text='Cidade' value={address.city} editable={false} />
            <InputText text='Estado' value={address.state} editable={false} />
          </StyledView>
        </StyledView>
      </StyledScrollView>
      <StyledView className='p-4'>
        {isLoadingAllAds ? (
          <SkeletonActionButton />
        ) : (
          <ActionButton
            iconColor='white'
            backgroundColor='cyan-700'
            textColor='white'
            text='Editar anúncio'
            icon='id-card'
            onPress={handleSave}
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
