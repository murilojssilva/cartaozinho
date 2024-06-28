import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Details } from '../screens/Details'
import { Favorites } from '../screens/Favorites'

const { Navigator, Screen } = createNativeStackNavigator()

export default function FavoritesNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Favorites' component={Favorites} />
      <Screen name='FavoritesDetails' component={Details} />
    </Navigator>
  )
}
