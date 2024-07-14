import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonInputText } from '@/components/Skeletons/SkeletonInputText'
import { SkeletonTag } from '@/components/Skeletons/SkeletonTag'
import { Tag } from '@/components/Tag'

import { Platform } from 'react-native'
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

export function EditAd() {
  const {
    isLoadingAllAds,
    handleContactChange,
    editedAd,
    setEditedAd,
    handleSaveAd,
    handleCategorySelected,
    handleServiceTypesSelected,
    handleOfficeTypesSelected,
    selectedCategories,
    selectedOfficeTypes,
    selectedServiceTypes,
  } = useAds()

  const { newAddress, handleCepChange } = useGetAddress()

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
          <StyledText className='font-bold text-xl my-4'>Endereço</StyledText>
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <StyledTextInputMask
              value={newAddress?.cep}
              onChangeText={handleCepChange}
              type='zip-code'
              keyboardType='number-pad'
              placeholder='CEP'
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText value={newAddress?.street} editable={false} text='Rua' />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              value={newAddress?.neighborhood}
              editable={false}
              text='Bairro'
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              value={newAddress?.city}
              editable={false}
              text='Cidade'
            />
          )}
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
            <InputText
              value={newAddress?.state}
              editable={false}
              text='Estado'
            />
          )}
          <StyledText className='font-bold text-xl my-4'>
            Informações de contato
          </StyledText>
          {isLoadingAllAds ? (
            <SkeletonInputText inputSize={6} />
          ) : (
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
              <InputText
                text='Instagram'
                autoCapitalize='none'
                onChangeText={(text) =>
                  handleContactChange(
                    'instagram',
                    text.replace(/\s/g, '').toLowerCase()
                  )
                }
              />
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
          )}
        </StyledView>
        <StyledView className='flex-1 flex-col gap-2 mt-4'>
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
      </StyledScrollView>
    </StyledKeyboardAvoidingView>
  )
}
