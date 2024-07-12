import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/useColorScheme'
import Routes from './routes'
import { StatusBar } from 'react-native'
import DarkTheme from './themes/DarkTheme'
import DefaultTheme from './themes/DefaultTheme'
import Toast from 'react-native-toast-message'
import { UserProvider } from './context/UserContext'

export default function App() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <NavigationContainer independent>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <UserProvider>
          <StatusBar
            barStyle='light-content'
            backgroundColor='transparent'
            translucent
          />
          <Routes />
          <Toast position='top' topOffset={40} />
        </UserProvider>
      </ThemeProvider>
    </NavigationContainer>
  )
}
