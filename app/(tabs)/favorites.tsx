import { CardItem } from '@/components/CardItem'
import { FilterButton } from '@/components/FilterButton'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderButton } from '@/components/OrderButton'
import { OrderMenu } from '@/components/OrderMenu'
import { TabHeader } from '@/components/TabHeader'
import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, Text, View } from 'react-native'

export default function Favorites() {
  const { setFilterMenu, filterMenu } = useFilterMenu()
  const { setOrderMenu, orderMenu } = useOrderMenu()

  return (
    <View className='flex-1 bg-white'>
      <TabHeader text='Favoritos' icon='bookmark' />

      <ScrollView className='flex-2 mb-2 p-4'>
        <View className='flex-2 flex-row justify-between'>
          <FilterButton onPress={() => setFilterMenu(false)} />
          <OrderButton />
        </View>
        <CardItem
          name='Joana Silva'
          office='Cabeleireira'
          officeType='Prestador de serviço'
          category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={[
            'Informática',
            'Desenvolvimento',
            'Website',
            'Aplicativos',
            'Mobile',
          ]}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
        />
      </ScrollView>
      <FilterMenu filterMenu={filterMenu} setFilterMenu={setFilterMenu} />
      <OrderMenu orderMenu={orderMenu} setOrderMenu={setOrderMenu} />
    </View>
  )
}
