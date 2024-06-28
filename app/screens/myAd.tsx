import { Topic } from '@/components/Topic'
import mapa from '@/assets/images/mapa.jpg'
import { useNavigation } from 'expo-router'
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
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../styled'

export function MyAd() {
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
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [isLoadingRemove, setIsLoadingRemove] = useState(false)
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
          <StyledView className='flex-2 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Categorias
            </StyledText>

            <StyledScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-2 flex-row gap-2'
            >
              {category.map((cat, index) => (
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
              <SocialButton
                text='Telefone'
                backgroundColor='gray-300'
                textColor='black'
                icon='phone'
                onPress={() => navigation.navigate('details')}
              />

              <SocialButton
                text='WhatsApp'
                backgroundColor='gray-300'
                textColor='black'
                icon='whatsapp'
                onPress={() => navigation.navigate('details')}
              />

              <SocialButton
                text='E-mail'
                backgroundColor='gray-300'
                textColor='black'
                icon='envelope'
                onPress={() => navigation.navigate('details')}
              />
            </StyledView>
          </StyledView>
        )}

        {isLoading ? (
          <SkeletonCategoryCard heightSize={28} />
        ) : (
          <StyledView className='flex-2 bg-gray-200 p-4 rounded-xl mb-4'>
            <StyledText className='font-bold text-xl mb-4'>
              Atendimento
            </StyledText>

            <StyledScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-2 flex-row gap-2'
            >
              {service.map((serv, index) => (
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
          <StyledView className='flex-2 bg-gray-200 p-4 rounded-xl mb-4'>
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
              <StyledImage source={mapa} className='flex-2 w-full h-64' />
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
              onPress={() => navigation.navigate('EditAd')}
            />
          )}
        </StyledView>
      )}
    </StyledView>
  )
}
