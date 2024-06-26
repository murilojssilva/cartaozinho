import { CardAd } from '@/components/CardAd'
import { TabHeader } from '@/components/TabHeader'
import { useNavigation } from 'expo-router'
import { StyledScrollView, StyledView } from '../styled'

export function Categories() {
  const navigation = useNavigation()
  return (
    <StyledView className='flex-1 bg-white'>
      <TabHeader text='Categorias' icon='list' />
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        className='flex-2 px-4'
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <StyledView className='flex-2 flex-row flex-wrap justify-between gap-2'>
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Administração',
                categoryIcon: 'briefcase',
              })
            }
            text='Administração'
            icon='briefcase'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Alimentação',
                categoryIcon: 'utensils',
              })
            }
            text='Alimentação'
            icon='utensils'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Beleza',
                categoryIcon: 'spa',
              })
            }
            text='Beleza'
            icon='spa'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Educação',
                categoryIcon: 'book',
              })
            }
            text='Educação'
            icon='book'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Entretenimento',
                categoryIcon: 'film',
              })
            }
            text='Entretenimento'
            icon='film'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Limpeza',
                categoryIcon: 'broom',
              })
            }
            text='Limpeza'
            icon='broom'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Manutenção',
                categoryIcon: 'tools',
              })
            }
            text='Manutenção'
            icon='tools'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Pet',
                categoryIcon: 'paw',
              })
            }
            text='Pet'
            icon='paw'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Saúde',
                categoryIcon: 'heartbeat',
              })
            }
            text='Saúde'
            icon='heartbeat'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Serviço',
                categoryIcon: 'hands-helping',
              })
            }
            text='Serviço'
            icon='hands-helping'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Tecnologia',
                categoryIcon: 'laptop',
              })
            }
            text='Tecnologia'
            icon='laptop'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('Category', {
                category: 'Transporte',
                categoryIcon: 'car',
              })
            }
            text='Transporte'
            icon='car'
          />
        </StyledView>
      </StyledScrollView>
    </StyledView>
  )
}
