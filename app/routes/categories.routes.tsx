import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Details } from '../screens/Details'
import { NewAd } from '../screens/NewAd'
import { Categories } from '../screens/Categories'
import { Category } from '../screens/Category'

const { Navigator, Screen } = createNativeStackNavigator()

export default function CategoriesNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Categories' component={Categories} />
      <Screen name='Category' component={Category} />
      <Screen name='CategoryDetails' component={Details} />
      <Screen name='NewAd' component={NewAd} />
      <Screen name='Details' component={Details} />
    </Navigator>
  )
}
