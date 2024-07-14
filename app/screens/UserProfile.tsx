import { useLocalSearchParams, useNavigation } from 'expo-router'
import { StyledFlatList, StyledView } from '../styled'
import { Header } from '@/components/Header'
import { Topic } from '@/components/Topic'
import { Linking } from 'react-native'
import { Title } from '@/components/Title'
import { CardItem } from '@/components/CardItem'
import { IAdProps } from '../interfaces/IAdProps'
import { useAds } from '@/hooks/useAds'
import { EmptyUserList } from '@/components/EmptyUserList'

export function UserProfile() {
  const params = useLocalSearchParams()
  const { allAds } = useAds()
  const navigation = useNavigation()

  return (
    <StyledView className='flex-1 flex-col bg-white'>
      <Header icon='user' title={'Perfil'} />
      <StyledView className='flex-2 px-4 flex-col'>
        <StyledView className='flex-2 flex-col'>
          <Title text='Informações pessoais' />
          <Topic
            icon='user'
            name='Nome'
            content={`${params?.name} ${params?.lastName}` || 'Nome completo'}
          />
          <Topic
            icon='user'
            name='Usuário'
            content={(params?.nickname as string) || 'Nome de usuário'}
          />
          <Topic
            icon='envelope'
            name='E-mail'
            content={(params?.email as string) || 'E-mail'}
            onPress={() => Linking.openURL(`mailto:${params?.email}`)}
          />
          <Topic
            icon='phone'
            name='Telefone'
            content={(params?.phone as string) || 'Telefone'}
            onPress={() => Linking.openURL(`tel:${params?.phone}`)}
          />
        </StyledView>
      </StyledView>
      <StyledView className='flex-2 px-2 p-4'>
        <Title text='Anúncios' />
        <StyledFlatList
          showsVerticalScrollIndicator={false}
          data={allAds.filter((ad) => ad.user_id === params?.id)}
          renderItem={({ item }: { item: IAdProps }) => (
            <CardItem
              description={item.description}
              user_id={item.user_id}
              id={item.id as string}
              name={item.name}
              contact={item.contact}
              address={
                item.address as {
                  cep: string
                  street: string
                  number: string
                  neighborhood: string
                  city: string
                  state: string
                  complement: string
                }
              }
              office={item.office}
              officeTypes={item.officeTypes}
              serviceTypes={item.serviceTypes}
              categories={item.categories}
              created_at={item.created_at}
              updated_at={item.updated_at}
              onPress={() =>
                navigation.navigate('Details', {
                  name: item.name,
                  id: item.id,
                  user_id: item.user_id,
                  office: item.office,
                  officeTypes: item.officeTypes,
                  categories: item.categories,
                  description: item.description,
                  serviceTypes: item.serviceTypes,
                  contact: item.contact,
                  address: item.address,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                })
              }
            />
          )}
          ListEmptyComponent={<EmptyUserList />}
          ListFooterComponent={<StyledView style={{ height: 350 }} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </StyledView>
    </StyledView>
  )
}
