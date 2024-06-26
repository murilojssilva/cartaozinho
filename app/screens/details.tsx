import { Topic } from '@/components/Topic'
import mapa from '@/assets/images/mapa.jpg'
import { useNavigation } from 'expo-router'
import { SocialButton } from '@/components/SocialButton'
import { Header } from '@/components/Header'
import { FontAwesome5 } from '@expo/vector-icons'
import { ProfileCard } from '@/components/ProfileCard'
import { useState } from 'react'
import { SkeletonProfileIcon } from '@/components/Skeletons/SkeletonProfileIcon'
import { SkeletonProfileCard } from '@/components/Skeletons/SkeletonProfileCard'
import { SkeletonCategoryCard } from '@/components/Skeletons/SkeletonCategoryCard'
import { ActionButton } from '@/components/ActionButton'
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'
import { Linking } from 'react-native'

export function Details() {
  const category: string[] = [
    'Informática',
    'Desenvolvimento',
    'Website',
    'Aplicativos',
    'Mobile',
  ]
  const service: string[] = ['À domicílio', 'No estabelecimento', 'Remoto']

  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

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
            <ProfileCard icon='user' title='Nome' text={`Murilo\nSilva`} />
          )}
          {isLoading ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='suitcase'
              title='Cargo'
              text={`Desenvolvedor\nFront-end`}
            />
          )}

          {isLoading ? (
            <SkeletonProfileCard />
          ) : (
            <ProfileCard
              icon='id-card'
              title='Tipo'
              text={`Prestador\nde serviço`}
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad,
              itaque, cumque eius, obcaecati quia aliquid ipsa ratione expedita
              perspiciatis veniam atque quisquam! Recusandae eaque expedita
              soluta tempora hic vitae dolore.
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
              {category.map((cat: string, index: number) => (
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
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>Contato</StyledText>

            <StyledView className='flex-1 justify-center flex-row gap-2'>
              <SocialButton
                text='Telefone'
                backgroundColor='gray-300'
                textColor='white'
                icon='phone'
                onPress={() => Linking.openURL('tel:+5521992687311')}
              />

              <SocialButton
                text='WhatsApp'
                backgroundColor='gray-300'
                textColor='white'
                icon='whatsapp'
                onPress={() => Linking.openURL('https://wa.me/+5521992687311')}
              />

              <SocialButton
                text='E-mail'
                backgroundColor='gray-300'
                textColor='white'
                icon='envelope'
                onPress={() => Linking.openURL('mailto:email@email.com')}
              />
            </StyledView>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-1 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Atendimento
            </StyledText>

            <StyledScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-2 flex-row gap-2'
            >
              {service.map((serv: string, index: number) => (
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

            <Topic icon='map-pin' name='CEP' content='25655-100' />
            <Topic icon='map' name='Rua' content='Murilo' />
            <Topic icon='square' name='Número' content='200' />
            <Topic icon='list' name='Complemento' content='Portão Branco' />
            <Topic
              icon='city'
              name='Cidade - Estado'
              content='Rio de Janeiro - RJ'
            />

            <StyledView className='flex-2 p-4'>
              <StyledImage source={mapa} className='flex-1 w-full h-64' />
            </StyledView>
          </StyledView>
        )}
      </StyledView>
      <StyledView className='p-4'>
        <ActionButton
          onPress={() => setIsFavorite(!isFavorite)}
          icon={isFavorite ? 'bookmark-outline' : 'bookmark'}
          text={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
          textColor={isFavorite ? 'cyan-700' : 'white'}
          iconColor={isFavorite ? '#0e7490' : 'white'}
          backgroundColor={isFavorite ? 'white' : 'cyan-700' || '#0e7490'}
        />
      </StyledView>
    </StyledScrollView>
  )
}
