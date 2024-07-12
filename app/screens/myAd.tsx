import { Topic } from '@/components/Topic'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SocialButton } from '@/components/SocialButton'
import { FontAwesome5 } from '@expo/vector-icons'
import { ProfileCard } from '@/components/ProfileCard'
import { ActionButton } from '@/components/ActionButton'
import { useState } from 'react'
import { SkeletonProfileIcon } from '@/components/Skeletons/SkeletonProfileIcon'
import { SkeletonCategoryCard } from '@/components/Skeletons/SkeletonCategoryCard'
import { SkeletonProfileCard } from '@/components/Skeletons/SkeletonProfileCard'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { Header } from '@/components/Header'
import { SpinnerButton } from '@/components/SpinnerButton'
import { StyledScrollView, StyledText, StyledView } from '../styled'
import { Alert, Linking } from 'react-native'
import { MapScreen } from '@/components/MapScreen'
import { useAds } from '@/hooks/useAds'

export function MyAd() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [isLoadingRemove, setIsLoadingRemove] = useState(false)

  const { handleRemoveAd } = useAds()

  const {
    name,
    email,
    id,
    user_id,
    office,
    officeTypes,
    categories,
    description,
    serviceTypes,
    phone,
    whatsapp,
    instagram,
    cep,
    street,
    number,
    neighborhood,
    city,
    state,
    complement,
  } = useLocalSearchParams()

  return (
    <StyledView className='flex-1 flex-col bg-white'>
      <Header title='Meu anúncio' icon='newspaper' />
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        className='flex-2 p-4'
      >
        {isLoading ? (
          <SkeletonProfileIcon />
        ) : (
          <StyledView className='justify-center bg-gray-200 p-4 self-center items-center mb-4 w-40 h-40 rounded-full border-4 border-gray-300'>
            <FontAwesome5 name='user' size={50} color='#D1D5DB' />
          </StyledView>
        )}

        <StyledView className='flex-2 flex-row justify-between items-center mb-4'>
          {isLoading ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard icon='user' title='Nome' text={name as string} />
          )}
          {isLoading ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='suitcase'
              title='Cargo'
              text={office as string}
            />
          )}
        </StyledView>

        {isLoading ? (
          <SkeletonCategoryCard heightSize={40} />
        ) : (
          <StyledView className='bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Descrição
            </StyledText>
            <StyledText className='text-sm text-gray-700 '>
              {description}
            </StyledText>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Local de atendimento
            </StyledText>

            <StyledScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-2 flex-row gap-2'
            >
              {serviceTypes.map((serv: string, index: number) => (
                <StyledView
                  key={index}
                  className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'
                >
                  <StyledText className='text-gray-100 text-xs'>
                    {serv}
                  </StyledText>
                </StyledView>
              ))}
            </StyledScrollView>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-2 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Tipo de atendimento
            </StyledText>

            <StyledScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-2 flex-row gap-2'
            >
              {officeTypes.map((officeType, index) => (
                <StyledView
                  key={index}
                  className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'
                >
                  <StyledText className='text-gray-100 text-xs'>
                    {officeType}
                  </StyledText>
                </StyledView>
              ))}
            </StyledScrollView>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-2 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Categorias
            </StyledText>

            <StyledScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-2 flex-row gap-2'
            >
              {categories.map((cat, index) => (
                <StyledView
                  key={index}
                  className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'
                >
                  <StyledText className='text-gray-100 text-xs'>
                    {cat}
                  </StyledText>
                </StyledView>
              ))}
            </StyledScrollView>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-2 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>Contato</StyledText>

            <StyledView className='flex-2 justify-center flex-row gap-2'>
              {phone && (
                <SocialButton
                  text='Telefone'
                  backgroundColor='gray-300'
                  textColor='white'
                  icon='phone'
                  onPress={() => Linking.openURL(`tel:+55${phone}`)}
                />
              )}

              {whatsapp && (
                <SocialButton
                  text='WhatsApp'
                  backgroundColor='gray-300'
                  textColor='white'
                  icon='whatsapp'
                  onPress={() =>
                    Linking.openURL(`https://wa.me/+55${whatsapp}`)
                  }
                />
              )}

              {instagram && (
                <SocialButton
                  text='Instagram'
                  backgroundColor='gray-300'
                  textColor='black'
                  icon='instagram'
                  onPress={() =>
                    Linking.openURL(`https://instagram.com/${instagram}`)
                  }
                />
              )}

              {email && (
                <SocialButton
                  text='E-mail'
                  backgroundColor='gray-300'
                  textColor='white'
                  icon='envelope'
                  onPress={() => Linking.openURL(`mailto:${email}`)}
                />
              )}
            </StyledView>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={60} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Localização
            </StyledText>

            <Topic icon='map-pin' name='CEP' content={cep as string} />
            <Topic icon='map' name='Rua' content={street as string} />
            <Topic icon='square' name='Número' content={number as string} />
            <Topic
              icon='list'
              name='Complemento'
              content={complement as string}
            />
            <Topic icon='city' name='Bairro' content={neighborhood as string} />
            <Topic icon='city' name='Cidade' content={`${city} - ${state}`} />

            <StyledView className='flex-2 p-4'>
              <MapScreen cep={cep as string} number={number as string} />
            </StyledView>
          </StyledView>
        )}
      </StyledScrollView>
      {isLoading ? (
        <StyledView className='flex-2 flex-row p-4'>
          <SkeletonActionButton />
          <StyledView className='my-2' />
          <SkeletonActionButton />
        </StyledView>
      ) : (
        <StyledView className='flex-2 flex-row justify-around p-4 gap-2'>
          {isLoadingRemove ? (
            <SpinnerButton />
          ) : (
            <ActionButton
              text='Apagar anúncio'
              icon='trash'
              iconColor='red'
              backgroundColor='transparent'
              textColor='red-500'
              onPress={() =>
                Alert.alert(
                  'Remover',
                  'Deseja remover o anúncio?',
                  [
                    {
                      text: 'Não',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Sim',
                      onPress: () => handleRemoveAd(id as string),
                    },
                  ],
                  { cancelable: false }
                )
              }
            />
          )}
          {isLoadingEdit ? (
            <SpinnerButton />
          ) : (
            <ActionButton
              text='Editar anúncio'
              icon='pencil'
              backgroundColor='cyan-700'
              textColor='white'
              iconColor='white'
              onPress={() =>
                navigation.navigate('EditAd', {
                  id: id,
                  user_id: user_id,
                  name: name,
                  office: office,
                  categories: categories,
                  description: description,
                  phone: phone,
                  whatsapp: whatsapp,
                  instagram: instagram,
                  email: email,
                  officeTypes: officeTypes,
                  serviceTypes: serviceTypes,
                  cep: cep,
                  number: number,
                  street: street,
                  complement: complement,
                  city: city,
                  state: state,
                  neighborhood: neighborhood,
                })
              }
            />
          )}
        </StyledView>
      )}
    </StyledView>
  )
}
