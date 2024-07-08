import { CardAd } from '@/components/CardAd'
import { TabHeader } from '@/components/TabHeader'
import { useNavigation } from 'expo-router'
import { StyledScrollView, StyledView } from '../styled'
import { useAds } from '@/hooks/useAds'
import { SkeletonCardAd } from '@/components/Skeletons/SkeletonCardAd'

export function Categories() {
  const navigation = useNavigation()
  const { isLoadingAllAds } = useAds()
  return (
    <StyledView className='flex-1 bg-white'>
      <TabHeader text='Categorias' icon='list' />
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        className='flex-2 px-4'
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <StyledView className='flex-2 flex-row flex-wrap justify-between gap-2'>
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
          {isLoadingAllAds ? (
            <SkeletonCardAd />
          ) : (
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
          )}
        </StyledView>
      </StyledScrollView>
    </StyledView>
  )
}
