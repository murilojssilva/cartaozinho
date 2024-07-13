import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { useUser } from '../context/UserContext'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
  const { signed } = useUser()

  return (
    <Navigator
      initialRouteName={signed ? 'Auth' : 'App'}
      screenOptions={{ headerShown: false }}
    >
      <Screen name='Auth' component={AuthRoutes} />
      <Screen name='App' component={AppRoutes} />
    </Navigator>
  )
}
