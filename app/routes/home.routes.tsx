import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { Details } from '../screens/Details'
import { NewAd } from '../screens/NewAd'

const { Navigator, Screen } = createNativeStackNavigator()

export default function HomeNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={Home} />
      <Screen name='Details' component={Details} />
      <Screen name='NewAd' component={NewAd} />
    </Navigator>
  )
}
