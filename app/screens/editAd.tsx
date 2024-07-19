import React, { useEffect, useCallback, useState } from 'react'

import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonInputText } from '@/components/Skeletons/SkeletonInputText'
import { SkeletonTag } from '@/components/Skeletons/SkeletonTag'
import { Tag } from '@/components/Tag'

import useGetAddress from '@/hooks/useGetAddress'
import { defaultCategories } from '../constants'
import { useAds } from '@/hooks/useAds'
import {
  StyledKeyboardAvoidingView,
  StyledScrollView,
  StyledText,
  StyledTextInputMask,
  StyledView,
} from '../styled'
import { useFocusEffect } from 'expo-router'
import { Platform } from 'react-native'
import { usersGetAll } from '../storage/user/usersGetAll'
import { IUserProps } from '../interfaces/IUserProps'

export function EditAd() {
  const {
    isLoadingAllAds,
    editedAd,
    handleGetEditedAd,
    id,
    setEditedAd,
    handleSaveAd,
    handleCategorySelected,
    handleServiceTypesSelected,
    handleOfficeTypesSelected,
    selectedCategories,
    selectedOfficeTypes,
    selectedServiceTypes,
  } = useAds()

  const { newAddress, handleCepChange, setNewAddress } = useGetAddress()

  const [user, setUser] = useState<IUserProps>({} as IUserProps)

  useFocusEffect(
    useCallback(() => {
      async function fetchUser() {
        const users = await usersGetAll()
        setUser(
          users.find((user) => user.id === editedAd.user_id) as IUserProps
        )
      }

      handleGetEditedAd(id as string)
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        ...editedAd.address,
      }))

      fetchUser()
    }, [id, editedAd.address])
  )

  useEffect(() => {
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      ...editedAd.address,
    }))
  }, [editedAd.address])

  const handleInputChange = useCallback(
    (field, value) => {
      setEditedAd((prevAd) => ({
        ...prevAd,
        [field]: value,
      }))
    },
    [setEditedAd]
  )

  const handleContactInputChange = useCallback(
    (field, value) => {
      setEditedAd((prevAd) => ({
        ...prevAd,
        contact: {
          ...prevAd.contact,
          [field]: value,
        },
      }))
    },
    [setEditedAd]
  )

  const handleAddressInputChange = useCallback(
    (field, value) => {
      setEditedAd((prevAd) => ({
        ...prevAd,
        address: {
          ...prevAd.address,
          [field]: value,
        },
      }))
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        [field]: value,
      }))
    },
    [setEditedAd, setNewAddress]
  )

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
                onChangeText={(text) => handleInputChange('name', text)}
                text='Nome'
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                value={editedAd.office}
                onChangeText={(text) => handleInputChange('office', text)}
                text='Nome'
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                value={`@${user?.nickname}`}
                editable={false}
                text='Usuário'
              />
            )}
            {isLoadingAllAds ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                value={editedAd.description}
                onChangeText={(text) => handleInputChange('description', text)}
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
          <StyledText className='font-bold text-xl my-4'>
            Localização
          </StyledText>
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <StyledTextInputMask
              type={'zip-code'}
              value={newAddress?.cep}
              onChangeText={(text) => {
                handleCepChange(text)
                handleAddressInputChange('cep', text)
              }}
              placeholder='CEP'
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              text='Rua'
              value={newAddress?.street}
              onChangeText={(text) =>
                handleAddressInputChange('street', text ?? '')
              }
              editable={false}
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              text='Número'
              keyboardType='numeric'
              value={newAddress?.number}
              onChangeText={(text) => handleAddressInputChange('number', text)}
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              text='Complemento'
              value={newAddress?.complement}
              onChangeText={(text) =>
                handleAddressInputChange('complement', text)
              }
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              text='Bairro'
              value={newAddress?.neighborhood}
              onChangeText={(text) =>
                handleAddressInputChange('neighborhood', text! ?? '')
              }
              style={{ overflow: 'hidden' }}
            />
          )}

          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              text='Cidade'
              value={newAddress?.city}
              onChangeText={(text) => {
                handleAddressInputChange('city', text! ?? '')
              }}
              editable={false}
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              text='Estado'
              value={newAddress?.state ?? ''}
              onChangeText={(text) =>
                handleAddressInputChange('state', text ?? '')
              }
              editable={false}
            />
          )}

          <StyledText className='font-bold text-xl my-4'>
            Informações de contato
          </StyledText>

          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <StyledTextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              placeholder='Telefone'
              value={editedAd.contact?.phone}
              onChangeText={(text) => handleContactInputChange('phone', text)}
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
          )}

          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <StyledTextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              placeholder='WhatsApp'
              value={editedAd.contact?.whatsapp}
              onChangeText={(text) =>
                handleContactInputChange('whatsapp', text)
              }
              className='bg-gray-200 p-4 justify-start rounded-xl flex-1 font-bold text-gray-900'
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              text='E-mail'
              value={editedAd.contact?.email}
              onChangeText={(text) => handleContactInputChange('email', text)}
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <StyledView className='flex-2 flex-row items-center bg-gray-200 rounded-xl'>
              <StyledView className='border-r-2 border-gray-500 px-3 py-5'>
                <StyledText className='text-sx text-gray-400 font-bold'>
                  instagram.com
                </StyledText>
              </StyledView>
              <InputText
                text='Instagram'
                value={editedAd.contact?.instagram}
                onChangeText={(text) =>
                  handleContactInputChange('instagram', text)
                }
              />
            </StyledView>
          )}
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
            text='Salvar'
            onPress={handleSaveAd}
            icon='save'
          />
        )}
      </StyledView>
    </StyledKeyboardAvoidingView>
  )
}
