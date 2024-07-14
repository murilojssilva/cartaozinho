import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { Details } from '../screens/Details'
import { NewAd } from '../screens/NewAd'
import { EditAd } from '../screens/EditAd'
import { UserProfile } from '../screens/UserProfile'

const { Navigator, Screen } = createNativeStackNavigator()

export default function HomeNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={Home} />
      <Screen name='Details' component={Details} />
      <Screen name='NewAd' component={NewAd} />
      <Screen name='EditAd' component={EditAd} />
      <Screen name='UserProfile' component={UserProfile} />
    </Navigator>
  )
}
