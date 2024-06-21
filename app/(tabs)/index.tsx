import { ScrollView, View } from 'react-native'
import { CardItem } from '../../components/CardItem'

import { useNavigation } from 'expo-router'
import { FilterButton } from '@/components/FilterButton'
import { FilterMenu } from '@/components/FilterMenu'
import { OrderButton } from '@/components/OrderButton'
import { OrderMenu } from '@/components/OrderMenu'
import { Title } from '@/components/Title'
import { CardAd } from '@/components/CardAd'
import { TabHeader } from '@/components/TabHeader'
import { useState } from 'react'
import useFilterMenu from '@/hooks/useFilterMenu'
import useOrderMenu from '@/hooks/useOrderMenu'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { filterMenu, setFilterMenu } = useFilterMenu()
  const { orderMenu, setOrderMenu } = useOrderMenu()

  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [orderMenuVisible, setOrderMenuVisible] = useState(false)

  function fetchFilterMenu() {
    setFilterMenuVisible(true)
    setOrderMenuVisible(false)
  }
  function fetchOrderMenu() {
    setOrderMenuVisible(true)
    setFilterMenuVisible(false)
  }

  return (
    <View className='flex-1 bg-white'>
      <TabHeader text='Cartãozinho' icon='home' />

      <ScrollView className='flex-2 mb-2 p-4'>
        <Title text='Anúncios' />
        <View className='flex-2 flex-row justify-around'>
          <CardAd
            onPress={() => navigation.navigate('new')}
            text={`Novo\nanúncio`}
            icon='plus'
          />

          <CardAd
            onPress={() => navigation.navigate('favorites')}
            text={`Meus\nfavoritos`}
            icon='bookmark'
          />

          <CardAd
            onPress={() => navigation.navigate('profile')}
            text={`Meus\nanúncios`}
            icon='user'
          />
        </View>
        <Title text='Outros anúncios' />

        <View className='flex-2 flex-row justify-between'>
          <FilterButton onPress={fetchFilterMenu} />
          <OrderButton onPress={fetchOrderMenu} />
        </View>

        <CardItem
          name='Joana Silva'
          office='Cabeleireira'
          officeType='Prestador de serviço'
          category={['Beleza', 'Saúde', 'Bem-estar', 'Cabelo', 'Unha']}
          onPress={() => navigation.navigate('details')}
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
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo Silva'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
        <CardItem
          name='Murilo'
          office='Desenvolvedor'
          officeType='Prestador de serviço'
          category={['Informática']}
          onPress={() => navigation.navigate('details')}
        />
      </ScrollView>

      <FilterMenu
        filterMenu={filterMenu}
        setFilterMenu={setFilterMenu}
        visible={filterMenuVisible}
        onClose={() => setFilterMenuVisible(false)}
      />

      <OrderMenu
        orderMenu={orderMenu}
        setOrderMenu={setOrderMenu}
        visible={orderMenuVisible}
        onClose={() => setOrderMenuVisible(false)}
      />
    </View>
  )
}
