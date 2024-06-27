import { createStackNavigator } from '@react-navigation/stack'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
  return (
    <Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
      <Screen name='Auth' component={AuthRoutes} />
      <Screen name='App' component={AppRoutes} />
    </Navigator>
  )
}
