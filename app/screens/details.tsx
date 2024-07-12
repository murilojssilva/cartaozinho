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
import { StyledScrollView, StyledText, StyledView } from '../styled'
import { Linking } from 'react-native'
import { MapScreen } from '@/components/MapScreen'
import { useFavorites } from '@/hooks/useFavorites'
import { useUser } from '../context/UserContext'

export function Details() {
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

  const { user } = useUser()

  const { toggleFavorite, isFavorited } = useFavorites()

  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(isFavorited(id as string))
  }, [id, isFavorited])

  function handleFavorite(id: string) {
    setIsLoading(true)
    try {
      setIsFavorite(!isFavorite)
      toggleFavorite(id)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <StyledScrollView className='flex-1 flex-col bg-white'>
      <Header icon='list' title='Detalhes' />
      <StyledView className='flex-1 p-4'>
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
            <ProfileCard
              icon='user'
              title='Nome'
              text={name || 'Não disponível'}
            />
          )}
          {isLoading ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='id-card'
              title='ID do usuário'
              text={user_id || 'Não disponível'}
            />
          )}
          {isLoading ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='suitcase'
              title='Cargo'
              text={office || 'Não disponível'}
            />
          )}
        </StyledView>

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Tipo de Atendimento
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
          <SkeletonCategoryCard heightSize={40} />
        ) : (
          <StyledView className='bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Descrição
            </StyledText>
            <StyledText className='text-sm text-gray-700 '>
              {description || 'Não disponível'}
            </StyledText>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Categorias
            </StyledText>

            <StyledScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-2 flex-row gap-2'
            >
              {categories.map((category: string, index: number) => (
                <StyledView
                  key={index}
                  className='flex-2 flex-row py-2 px-4 bg-gray-600 rounded-full'
                >
                  <StyledText className='text-gray-100 text-xs'>
                    {category}
                  </StyledText>
                </StyledView>
              ))}
            </StyledScrollView>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>Contato</StyledText>

            <StyledView className='flex-1 justify-center flex-row gap-2'>
              <SocialButton
                text='Telefone'
                backgroundColor='gray-300'
                textColor='white'
                icon='phone'
                onPress={() => phone && Linking.openURL(`tel:+55${phone}`)}
              />

              <SocialButton
                text='WhatsApp'
                backgroundColor='gray-300'
                textColor='white'
                icon='whatsapp'
                onPress={() =>
                  whatsapp && Linking.openURL(`https://wa.me/+55${whatsapp}`)
                }
              />

              <SocialButton
                text='Instagram'
                backgroundColor='gray-300'
                textColor='white'
                icon='instagram'
                onPress={() =>
                  instagram &&
                  Linking.openURL(`https://instagram.com/${instagram}`)
                }
              />

              <SocialButton
                text='E-mail'
                backgroundColor='gray-300'
                textColor='white'
                icon='envelope'
                onPress={() => email && Linking.openURL(`mailto:${email}`)}
              />
            </StyledView>
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
          <SkeletonCategoryCard heightSize={60} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Localização
            </StyledText>

            <Topic
              icon='map-pin'
              name='CEP'
              content={cep || 'Não disponível'}
            />
            <Topic icon='map' name='Rua' content={street || 'Não disponível'} />
            <Topic
              icon='square'
              name='Número'
              content={number || 'Não disponível'}
            />
            <Topic
              icon='list'
              name='Complemento'
              content={complement || 'Não disponível'}
            />
            <Topic
              icon='city'
              name='Bairro'
              content={neighborhood || 'Não disponível'}
            />
            <Topic
              icon='city'
              name='Cidade'
              content={`${city} - ${state}` || 'Não disponível'}
            />

            <StyledView className='flex-2 p-4'>
              <MapScreen cep={cep as string} number={number as string} />
            </StyledView>
          </StyledView>
        )}
      </StyledView>
      <StyledView className='p-4'>
        {user_id === user.id ? (
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
