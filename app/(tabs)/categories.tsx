import { ScrollView, View } from 'react-native'
import { CardAd } from '@/components/CardAd'
import { TabHeader } from '@/components/TabHeader'

export default function Categories() {
  return (
    <View className='flex-1 bg-white'>
      <TabHeader text='Categorias' icon='list' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='flex-2 px-4'
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <View className='flex-2 flex-row flex-wrap justify-between gap-2'>
          <CardAd text='Administração' icon='briefcase' />
          <CardAd text='Alimentação' icon='utensils' />
          <CardAd text='Beleza e bem-estar' icon='spa' />
          <CardAd text='Educação' icon='book' />
          <CardAd text='Entretenimento' icon='film' />
          <CardAd text='Limpeza' icon='broom' />
          <CardAd text='Manutenção' icon='tools' />
          <CardAd text='Pet' icon='paw' />
          <CardAd text='Saúde' icon='heartbeat' />
          <CardAd text='Serviço' icon='hands-helping' />
          <CardAd text='Tecnologia' icon='laptop' />
          <CardAd text='Transporte' icon='car' />
        </View>
      </ScrollView>
    </View>
  )
}
