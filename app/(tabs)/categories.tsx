import { ScrollView, View } from 'react-native'
import { CardAd } from '@/components/CardAd'
import { TabHeader } from '@/components/TabHeader'
import { useNavigation } from 'expo-router'

export default function Categories() {
  const navigation = useNavigation()
  return (
    <View className='flex-1 bg-white'>
      <TabHeader text='Categorias' icon='list' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='flex-2 px-4'
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <View className='flex-2 flex-row flex-wrap justify-between gap-2'>
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Administração',
                categoryIcon: 'briefcase',
              })
            }
            text='Administração'
            icon='briefcase'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Alimentação',
                categoryIcon: 'utensils',
              })
            }
            text='Alimentação'
            icon='utensils'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Beleza',
                categoryIcon: 'spa',
              })
            }
            text='Beleza'
            icon='spa'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Educação',
                categoryIcon: 'book',
              })
            }
            text='Educação'
            icon='book'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Entretenimento',
                categoryIcon: 'film',
              })
            }
            text='Entretenimento'
            icon='film'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Limpeza',
                categoryIcon: 'broom',
              })
            }
            text='Limpeza'
            icon='broom'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Manutenção',
                categoryIcon: 'tools',
              })
            }
            text='Manutenção'
            icon='tools'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Pet',
                categoryIcon: 'paw',
              })
            }
            text='Pet'
            icon='paw'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Saúde',
                categoryIcon: 'heartbeat',
              })
            }
            text='Saúde'
            icon='heartbeat'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Serviço',
                categoryIcon: 'hands-helping',
              })
            }
            text='Serviço'
            icon='hands-helping'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Tecnologia',
                categoryIcon: 'laptop',
              })
            }
            text='Tecnologia'
            icon='laptop'
          />
          <CardAd
            onPress={() =>
              navigation.navigate('category', {
                category: 'Transporte',
                categoryIcon: 'car',
              })
            }
            text='Transporte'
            icon='car'
          />
        </View>
      </ScrollView>
    </View>
  )
}
