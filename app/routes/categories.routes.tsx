import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Categories } from '../screens/categories'
import Category from '../screens/category'
import Details from '../screens/details'

const { Navigator, Screen } = createNativeStackNavigator()

export default function CategoriesNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Categories' component={Categories} />
      <Screen name='Category' component={Category} />
      <Screen name='CategoryDetails' component={Details} />
    </Navigator>
  )
}
