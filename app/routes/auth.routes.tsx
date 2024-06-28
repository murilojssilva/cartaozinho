import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { StyledText, StyledView } from '../styled'
import { useNavigation } from 'expo-router'
import { Login } from '../screens/Login'
import { SignUp } from '../screens/SignUp'

const { Navigator, Screen } = createNativeStackNavigator()

export default function AuthRoutes() {
  const navigation = useNavigation()
  return (
    <Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Screen
        name='Login'
        component={Login}
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Screen
        name='SignUp'
        component={SignUp}
        options={{
          title: '',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerRight: () => (
            <StyledView className='flex-2 flex-row items-center'>
              <Ionicons name='log-in-outline' size={22} />
              <StyledText className='text-xl text-gray-700 font-semibold'>
                {' '}
                Cadastro
              </StyledText>
            </StyledView>
          ),
          headerLeft: () => (
            <FontAwesome5
              name='chevron-left'
              size={26}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Navigator>
  )
}
