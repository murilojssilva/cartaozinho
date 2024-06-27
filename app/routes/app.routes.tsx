import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import ProfileNavigator from './profile.routes'
import HomeNavigator from './home.routes'
import CategoriesNavigator from './categories.routes'
import FavoritesNavigator from './favorites.routes'

const { Navigator, Screen } = createBottomTabNavigator()

export default function AppRoutes() {
  const colorScheme = useColorScheme()

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
      initialRouteName='HomeRoute'
    >
      <Screen
        name='HomeRoute'
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name='CategoriesRoute'
        component={CategoriesNavigator}
        options={{
          title: 'Categorias',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'list' : 'list-outline'}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name='FavoritesRoute'
        component={FavoritesNavigator}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'bookmark' : 'bookmark-outline'}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name='ProfileRoute'
        component={ProfileNavigator}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Navigator>
  )
}
