import { Topic } from '@/components/Topic'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { SocialButton } from '@/components/SocialButton'
import { Header } from '@/components/Header'
import { FontAwesome5 } from '@expo/vector-icons'
import { ProfileCard } from '@/components/ProfileCard'
import { useEffect, useState } from 'react'
import { SkeletonProfileIcon } from '@/components/Skeletons/SkeletonProfileIcon'
import { SkeletonProfileCard } from '@/components/Skeletons/SkeletonProfileCard'
import { SkeletonCategoryCard } from '@/components/Skeletons/SkeletonCategoryCard'
import { ActionButton } from '@/components/ActionButton'
import {
  StyledFlatList,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'
import { Linking } from 'react-native'
import { MapScreen } from '@/components/MapScreen'
import { useFavorites } from '@/hooks/useFavorites'
import { useUser } from '../context/UserContext'
import { useAds } from '@/hooks/useAds'
import { useAuthForm } from '@/hooks/useAuthForm'
import { formatDate } from '../utils/formatDate'

export function Details() {
  const params = useLocalSearchParams()
  const { id, user_id } = params

  const { user } = useUser()

  const { userAd, handleGetUserAd } = useAuthForm({
    password: '',
    email: '',
  })

  const { toggleFavorite, isFavorited } = useFavorites()

  const { handleGetAd, ad, isLoadingAd, setIsLoadingAd } = useAds()

  const navigation = useNavigation()

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(isFavorited(id as string))
    handleGetAd(id as string)
    handleGetUserAd(user_id as string)
  }, [id, isFavorited])

  function handleFavorite(id: string) {
    setIsLoadingAd(true)
    try {
      setIsFavorite(!isFavorite)
      toggleFavorite(id)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingAd(false)
    }
  }

  return (
    <StyledScrollView className='flex-1 flex-col bg-white'>
      <Header icon='list' title='Detalhes' />
      <StyledView className='flex-1 p-4'>
        {isLoadingAd ? (
          <SkeletonProfileIcon />
        ) : (
          <StyledView className='justify-center bg-gray-200 p-4 self-center items-center mb-4 w-40 h-40 rounded-full border-4 border-gray-300'>
            <FontAwesome5 name='user' size={50} color='#D1D5DB' />
          </StyledView>
        )}
        <StyledView className='flex-2 flex-row justify-between items-center mb-4'>
          {isLoadingAd ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='user'
              title='Nome'
              text={(ad.name as string) || 'Não disponível'}
            />
          )}
          {isLoadingAd ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='id-card'
              title='Usuário'
              text={userAd.nickname || 'Não disponível'}
              onPress={() =>
                navigation.navigate('UserProfile', {
                  id: userAd.id,
                  nickname: userAd.nickname,
                  name: userAd.name,
                  lastName: userAd.lastName,
                  phone: userAd.phone,
                  email: userAd.email,
                })
              }
            />
          )}
          {isLoadingAd ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='suitcase'
              title='Cargo'
              text={(ad.office as string) || 'Não disponível'}
            />
          )}
        </StyledView>

        {isLoadingAd ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Tipo de Atendimento
            </StyledText>
            <StyledFlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={ad.officeTypes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }: { item: string }) => (
                <StyledView className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'>
                  <StyledText className='text-gray-100 text-xs'>
                    {item}
                  </StyledText>
                </StyledView>
              )}
            />
          </StyledView>
        )}

        {isLoadingAd ? (
          <SkeletonCategoryCard heightSize={40} />
        ) : (
          <StyledView className='bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Descrição
            </StyledText>
            <StyledText className='text-sm text-gray-700 '>
              {ad.description || 'Não disponível'}
            </StyledText>
          </StyledView>
        )}

        {isLoadingAd ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Categorias
            </StyledText>

            <StyledFlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={ad.categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }: { item: string }) => (
                <StyledView className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'>
                  <StyledText className='text-gray-100 text-xs'>
                    {item}
                  </StyledText>
                </StyledView>
              )}
            />
          </StyledView>
        )}

        {isLoadingAd &&
        (ad.contact?.phone ||
          ad.contact?.email ||
          ad.contact?.whatsapp ||
          ad.contact?.instagram) ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>Contato</StyledText>

            <StyledView className='flex-1 justify-center flex-row gap-2'>
              {ad.contact?.phone && (
                <SocialButton
                  text='Telefone'
                  backgroundColor='gray-300'
                  textColor='white'
                  icon='phone'
                  onPress={() =>
                    (ad.contact.phone as string) &&
                    Linking.openURL(`tel:+55${ad.contact.phone as string}`)
                  }
                />
              )}

              {ad.contact?.whatsapp && (
                <SocialButton
                  text='WhatsApp'
                  backgroundColor='gray-300'
                  textColor='white'
                  icon='whatsapp'
                  onPress={() =>
                    ad.contact.whatsapp &&
                    Linking.openURL(`https://wa.me/+55${ad.contact.whatsapp}`)
                  }
                />
              )}

              {ad.contact?.instagram && (
                <SocialButton
                  text='Instagram'
                  backgroundColor='gray-300'
                  textColor='white'
                  icon='instagram'
                  onPress={() =>
                    (ad.contact.instagram as string) &&
                    Linking.openURL(
                      `https://instagram.com/${ad.contact.instagram}`
                    )
                  }
                />
              )}

              {ad.contact?.email && (
                <SocialButton
                  text='E-mail'
                  backgroundColor='gray-300'
                  textColor='white'
                  icon='envelope'
                  onPress={() =>
                    ad.contact.email &&
                    Linking.openURL(`mailto:${ad.contact.email}`)
                  }
                />
              )}
            </StyledView>
          </StyledView>
        )}

        {isLoadingAd ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Local de atendimento
            </StyledText>

            <StyledFlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={ad.serviceTypes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }: { item: string }) => (
                <StyledView className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'>
                  <StyledText className='text-gray-100 text-xs'>
                    {item}
                  </StyledText>
                </StyledView>
              )}
            />
          </StyledView>
        )}

        {isLoadingAd ? (
          <SkeletonCategoryCard heightSize={60} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Localização
            </StyledText>

            <Topic
              icon='map-pin'
              name='CEP'
              content={ad.address?.cep || 'Não disponível'}
            />
            <Topic
              icon='map'
              name='Rua'
              content={ad.address?.street || 'Não disponível'}
            />
            <Topic
              icon='square'
              name='Número'
              content={ad.address?.number || 'Não disponível'}
            />
            <Topic
              icon='list'
              name='Complemento'
              content={ad.address?.complement || 'Não disponível'}
            />
            <Topic
              icon='city'
              name='Bairro'
              content={ad.address?.neighborhood || 'Não disponível'}
            />
            <Topic
              icon='city'
              name='Cidade'
              content={
                `${ad.address?.city} - ${ad.address?.state}` || 'Não disponível'
              }
            />

            <StyledView className='flex-2 p-4'>
              <MapScreen
                cep={ad.address?.cep as string}
                number={ad.address?.number as string}
              />
            </StyledView>
          </StyledView>
        )}

        {isLoadingAd ? (
          <SkeletonCategoryCard heightSize={40} />
        ) : (
          <StyledView className='bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Criado em
            </StyledText>
            <StyledText className='text-sm text-gray-700 '>
              {formatDate(ad.created_at) || 'Não disponível'}
            </StyledText>
          </StyledView>
        )}

        {isLoadingAd ? (
          <SkeletonCategoryCard heightSize={40} />
        ) : (
          <StyledView className='bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Editado em
            </StyledText>
            <StyledText className='text-sm text-gray-700 '>
              {formatDate(ad.updated_at) || 'Não disponível'}
            </StyledText>
          </StyledView>
        )}
      </StyledView>

      <StyledView className='p-4'>
        {ad.user_id === user?.id ? (
          <ActionButton
            text='Editar anúncio'
            icon='pencil'
            backgroundColor='cyan-700'
            textColor='white'
            iconColor='white'
            onPress={() =>
              navigation.navigate('EditAd', {
                name: ad.name,
                id: id,
                user_id: ad.user_id,
                office: ad.office,
                officeTypes: ad.officeTypes,
                categories: ad.categories,
                description: ad.description,
                serviceTypes: ad.serviceTypes,
                contact: ad.contact,
                address: ad.address,
                created_at: ad.created_at,
                updated_at: ad.updated_at,
              })
            }
          />
        ) : (
          <ActionButton
            onPress={() => handleFavorite(id as string)}
            icon={isFavorite ? 'bookmark-outline' : 'bookmark'}
            text={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
            textColor={isFavorite ? 'cyan-700' : 'white'}
            iconColor={isFavorite ? '#0e7490' : 'white'}
            backgroundColor={isFavorite ? 'white' : 'cyan-700' || '#0e7490'}
          />
        )}
      </StyledView>
    </StyledScrollView>
  )
}
